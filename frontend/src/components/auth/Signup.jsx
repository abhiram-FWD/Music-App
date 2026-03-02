import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../css/auth/Signup.css";
import axios from "axios";
import { PlayerContext } from "../../context/PlayerContext";
import { toast } from "react-toastify";

const Signup = ({ closeAuth, openLogin }) => {
    const { url } = useContext(PlayerContext);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/register`, data);

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                toast.success("Account created successfully!");
                closeAuth();
                window.location.reload();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Error creating account");
        }
    };

    return (
        <div className="signup-wrapper w-full max-w-sm mx-auto p-2">
            <style>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                input:-webkit-autofill:active{
                    -webkit-box-shadow: 0 0 0 30px #2a2a2a inset !important;
                    -webkit-text-fill-color: white !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-gray-400 text-sm">Join us and start listening</p>
            </div>

            <form onSubmit={onSignup} className="flex flex-col gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 ml-1">Full Name</label>
                    <input
                        name="name"
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        // placeholder="Your Name"
                        className="w-full h-12 px-4 pl-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-sm autofill:bg-white/5"
                        style={{ paddingLeft: '16px' }}
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 ml-1">Email Address</label>
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        // placeholder="Email Address"
                        className="w-full h-12 px-4 pl-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-sm autofill:bg-white/5"
                        style={{ paddingLeft: '16px' }}
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 ml-1">Password</label>
                    <div className="relative">
                        <input
                            name="password"
                            onChange={onChangeHandler}
                            value={data.password}
                            type={showPassword ? "text" : "password"}
                            // placeholder="Create Password"
                            className="w-full h-12 px-4 pl-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all text-sm pr-12"
                            style={{ paddingLeft: '16px' }}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="w-full h-12 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold tracking-wide shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 uppercase text-sm">
                    Sign Up
                </button>
                <p className="text-center mt-4 text-sm text-gray-300">
                    Already have an account? <span className="text-purple-400 cursor-pointer hover:text-pink-400 ml-1 underline underline-offset-4" onClick={openLogin}>Login</span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
