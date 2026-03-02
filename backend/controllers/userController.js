import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checking existing user
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Route to get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, userData: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Route to update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, email, oldPassword, password, image } = req.body;
        const userId = req.userId;

        const updateData = { name, email };

        if (!image && req.file) {
            // Local file upload
            updateData.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        } else if (image) {
            updateData.image = image;
        }

        if (password) {
            if (password.length < 8) {
                return res.json({ success: false, message: "New password must be at least 8 characters" });
            }
            if (!oldPassword) {
                return res.json({ success: false, message: "Please enter your old password" });
            }

            // Verify old password
            const currentUser = await userModel.findById(userId);
            const isMatch = await bcrypt.compare(oldPassword, currentUser.password);

            if (!isMatch) {
                return res.json({ success: false, message: "Incorrect old password" });
            }

            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

        res.json({ success: true, message: "Profile Updated", userData: user });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, registerUser, getProfile, updateProfile };
