import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCamera, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import "../../css/common/Modal.css";
import "../../css/pages/EditProfile.css";

const EditProfile = ({ onClose }) => {
    const { url, token, userData, getUserData } = useContext(PlayerContext);
    const [formData, setFormData] = useState({
        name: userData.name || "",
        email: userData.email || "",
        oldPassword: "",
        password: ""
    });
    const [image, setImage] = useState(null); // File object
    const [imagePreview, setImagePreview] = useState(""); // URL for preview
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                oldPassword: "",
                password: ""
            });
            setImagePreview(userData.image || "");
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            if (showPasswordFields && formData.password) { // Only append password if visible and not empty
                data.append("oldPassword", formData.oldPassword);
                data.append("password", formData.password);
            }
            if (image) {
                data.append("image", image);
            }

            const response = await axios.put(`${url}/api/user/profile`, data, { headers: { token } });
            if (response.data.success) {
                toast.success("Profile Updated");
                getUserData(); // Refresh context
                onClose();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message || "Error updating profile";
            toast.error(errorMessage);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content edit-profile-modal">
                <button className="modal-close-icon" onClick={onClose}>
                    <FaTimes size={18} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-1">Edit Profile</h2>
                <p className="text-gray-400 text-sm mb-6">Update your account Details</p>

                {/* Avatar Section */}
                <div className="edit-profile-avatar-container">
                    <div className="edit-profile-avatar">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <CiUser size={40} className="text-gray-400" />
                        )}
                    </div>
                    <label htmlFor="profile-image-input" className="edit-profile-camera-btn">
                        <FaCamera size={12} className="text-white" />
                    </label>
                    <input
                        type="file"
                        id="profile-image-input"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="edit-profile-input-group">
                        <label className="edit-profile-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="edit-profile-input"
                        />
                    </div>

                    <div className="edit-profile-input-group">
                        <label className="edit-profile-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="edit-profile-input"
                        />
                    </div>

                    {/* Password Sections */}
                    {!showPasswordFields ? (
                        <div className="mt-4">
                            <span
                                className="text-purple-400 text-sm font-medium cursor-pointer hover:text-pink-400 transition-colors"
                                onClick={() => setShowPasswordFields(true)}
                            >
                                Change Password
                            </span>
                        </div>
                    ) : (
                        <>
                            <div className="edit-profile-input-group mt-4">
                                <label className="edit-profile-label">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        name="oldPassword"
                                        placeholder="Enter current password"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        className="edit-profile-input pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showOldPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                    </button>
                                </div>
                            </div>

                            <div className="edit-profile-input-group mt-3">
                                <label className="edit-profile-label">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter new password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="edit-profile-input pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showNewPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-2 text-right sm:text-left">
                                <span
                                    className="text-purple-400 text-xs font-medium cursor-pointer hover:text-pink-400 transition-colors"
                                    onClick={() => {
                                        setShowPasswordFields(false);
                                        setFormData(prev => ({ ...prev, oldPassword: "", password: "" }));
                                    }}
                                >
                                    Cancel Password Change
                                </span>
                            </div>
                        </>
                    )}

                    <div className="edit-profile-actions">
                        <button type="button" onClick={onClose} className="edit-profile-btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" className="edit-profile-btn-save">
                            SAVE CHANGES
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
