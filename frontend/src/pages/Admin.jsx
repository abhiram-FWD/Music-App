import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PlayerContext } from "../context/PlayerContext";
import "../css/pages/Admin.css";
import { FiMusic, FiDisc, FiUploadCloud } from "react-icons/fi";

const Admin = () => {
    const { url } = useContext(PlayerContext);
    const [activeTab, setActiveTab] = useState("add-song"); // 'add-song' | 'add-album'

    // Album State
    const [albumData, setAlbumData] = useState({
        name: "",
        desc: "",
        bgColour: "#121212",
        image: null
    });
    const [albumLoading, setAlbumLoading] = useState(false);

    // Song State
    const [songData, setSongData] = useState({
        name: "",
        desc: "",
        album: "none",
        image: null,
        audio: null
    });
    const [songLoading, setSongLoading] = useState(false);
    const [albumList, setAlbumList] = useState([]);

    // Fetch Albums for Dropdown
    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setAlbumList(response.data.albums);
            } else {
                toast.error("Failed to load albums");
            }
        } catch (error) {
            toast.error("Error connecting to server");
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    // --- Album Handlers ---
    const handleAlbumChange = (e) => {
        const { name, value } = e.target;
        setAlbumData(prev => ({ ...prev, [name]: value }));
    };

    const handleAlbumImage = (e) => {
        const file = e.target.files[0];
        setAlbumData(prev => ({ ...prev, image: file }));
    };

    const submitAlbum = async (e) => {
        e.preventDefault();
        setAlbumLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", albumData.name);
            formData.append("desc", albumData.desc);
            formData.append("bgColour", albumData.bgColour);
            formData.append("image", albumData.image);

            const response = await axios.post(`${url}/api/album/add`, formData);

            if (response.data.success) {
                toast.success("Album added successfully");
                setAlbumData({ name: "", desc: "", bgColour: "#121212", image: null });
                fetchAlbums(); // refresh list
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error("Error adding album");
            console.error(error);
        }
        setAlbumLoading(false);
    };

    // --- Song Handlers ---
    const handleSongChange = (e) => {
        const { name, value } = e.target;
        setSongData(prev => ({ ...prev, [name]: value }));
    };

    const handleSongFile = (e) => {
        const { name, files } = e.target;
        setSongData(prev => ({ ...prev, [name]: files[0] }));
    };

    const submitSong = async (e) => {
        e.preventDefault();
        setSongLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", songData.name);
            formData.append("desc", songData.desc);
            formData.append("album", songData.album);
            formData.append("image", songData.image);
            formData.append("audio", songData.audio);

            const response = await axios.post(`${url}/api/song/add`, formData);

            if (response.data.success) {
                toast.success("Song added successfully");
                setSongData({
                    name: "",
                    desc: "",
                    album: "none",
                    image: null,
                    audio: null
                });
            } else {
                toast.error(response.data.message || "Failed to add song");
            }
        } catch (error) {
            toast.error("Error uploading song");
            console.error(error);
        }
        setSongLoading(false);
    };

    return (
        <div className="admin-container">
            {/* Tabs */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setActiveTab("add-song")}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'add-song' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333]'}`}
                >
                    <div className="flex items-center gap-2">
                        <FiMusic /> Add Song
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("add-album")}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'add-album' ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30' : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#333]'}`}
                >
                    <div className="flex items-center gap-2">
                        <FiDisc /> Add Album
                    </div>
                </button>
            </div>

            {/* ADD SONG FORM */}
            {activeTab === "add-song" && (
                <div className="admin-section">
                    <h2 className="admin-title text-purple-400"><FiMusic /> Upload New Song</h2>
                    <form onSubmit={submitSong} className="admin-form">
                        <div className="flex gap-4">
                            <div className="admin-input-group flex-1">
                                <label className="admin-label">Image</label>
                                <input type="file" name="image" onChange={handleSongFile} accept="image/*" className="admin-file-input" required />
                            </div>
                            <div className="admin-input-group flex-1">
                                <label className="admin-label">Audio Data</label>
                                <input type="file" name="audio" onChange={handleSongFile} accept="audio/*" className="admin-file-input" required />
                            </div>
                        </div>

                        <div className="admin-input-group">
                            <label className="admin-label">Song Name</label>
                            <input type="text" name="name" value={songData.name} onChange={handleSongChange} className="admin-input" placeholder="e.g. Midnight City" required />
                        </div>

                        <div className="admin-input-group">
                            <label className="admin-label">Description</label>
                            <input type="text" name="desc" value={songData.desc} onChange={handleSongChange} className="admin-input" placeholder="e.g. Electropop vibes" required />
                        </div>

                        <div className="admin-input-group">
                            <label className="admin-label">Album</label>
                            <select name="album" value={songData.album} onChange={handleSongChange} className="admin-select">
                                <option value="none">Select Album</option>
                                {albumList.map((album) => (
                                    <option key={album._id} value={album.name}>{album.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" disabled={songLoading} className="admin-btn">
                            {songLoading ? "Uploading..." : "ADD SONG"}
                        </button>
                    </form>
                </div>
            )}

            {/* ADD ALBUM FORM */}
            {activeTab === "add-album" && (
                <div className="admin-section">
                    <h2 className="admin-title text-pink-400"><FiDisc /> Create New Album</h2>
                    <form onSubmit={submitAlbum} className="admin-form">
                        <div className="admin-input-group">
                            <label className="admin-label">Cover Image</label>
                            <input type="file" name="image" onChange={handleAlbumImage} accept="image/*" className="admin-file-input" required />
                        </div>

                        <div className="admin-input-group">
                            <label className="admin-label">Album Name</label>
                            <input type="text" name="name" value={albumData.name} onChange={handleAlbumChange} className="admin-input" placeholder="e.g. Top Hits 2024" required />
                        </div>

                        <div className="admin-input-group">
                            <label className="admin-label">Description</label>
                            <input type="text" name="desc" value={albumData.desc} onChange={handleAlbumChange} className="admin-input" placeholder="e.g. The best collection" required />
                        </div>

                        <div className="admin-input-group">
                            <label className="admin-label">Background Color</label>
                            <div className="color-picker-wrapper">
                                <input type="color" name="bgColour" value={albumData.bgColour} onChange={handleAlbumChange} className="h-10 w-20 cursor-pointer" />
                                <div className="color-preview" style={{ backgroundColor: albumData.bgColour }}></div>
                            </div>
                        </div>

                        <button type="submit" disabled={albumLoading} className="admin-btn">
                            {albumLoading ? "Creating..." : "ADD ALBUM"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Admin;
