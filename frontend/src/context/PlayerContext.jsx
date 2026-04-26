import { createContext, useEffect, useState, useRef } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = "https://music-app-95a7.onrender.com";

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);

    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    // Feature States
    const [loop, setLoop] = useState(false);
    const [volume, setVolume] = useState(1); // range 0 - 1
    const [speed, setSpeed] = useState(1); // playbackRate

    const [likedSongs, setLikedSongs] = useState({}); // { songId: true }
    const [userData, setUserData] = useState(null);

    const [token, setToken] = useState("");


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }

        // Load likes
        const storedLikes = localStorage.getItem("likedSongs");
        if (storedLikes) {
            setLikedSongs(JSON.parse(storedLikes));
        }
    }, []);

    // Audio Effects
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = loop;
            audioRef.current.volume = volume;
            audioRef.current.playbackRate = speed;
        }
    }, [loop, volume, speed]);

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        const song = songsData.find((item) => item.id === id);
        if (song) {
            await setTrack(song);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const previous = async () => {
        songsData.map(async (item, index) => {
            if (track.id === item.id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const next = async () => {
        songsData.map(async (item, index) => {
            if (track.id === item.id && index < songsData.length - 1) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const toggleLike = (id) => {
        setLikedSongs(prev => {
            const newLikes = { ...prev };
            if (newLikes[id]) {
                delete newLikes[id];
            } else {
                newLikes[id] = true;
            }
            localStorage.setItem("likedSongs", JSON.stringify(newLikes));
            return newLikes;
        });
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            if (response.data.success) {
                const mappedSongs = response.data.songs.map((song) => ({
                    ...song,
                    id: song._id,
                    artist_name: song.desc,
                    cover: song.image,
                    releasedate: "2024"
                }));
                setSongsData(mappedSongs);
                setTrack(mappedSongs[0]); // Set initial track
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setAlbumsData(response.data.albums);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserData = async () => {
        try {
            const response = await axios.get(`${url}/api/user/profile`, { headers: { token } });
            if (response.data.success) {
                setUserData(response.data.userData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, [])

    useEffect(() => {
        if (token) {
            getUserData();
        }
    }, [token])

    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }
    }, [audioRef, track]) // Re-run when track changes

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
        songsData,
        albumsData,
        url,
        token, setToken,
        loop, setLoop,
        volume, setVolume,
        speed, setSpeed,
        likedSongs, toggleLike,
        userData, setUserData,
        getUserData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;
