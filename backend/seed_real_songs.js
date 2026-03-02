
import axios from 'axios';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import songModel from './models/songModel.js';
import albumModel from './models/albumModel.js';
import 'dotenv/config';

const url = "http://localhost:4000/api";

const albums = [
    {
        name: "Workout Energy",
        desc: "Power through your training",
        bgColour: "#b91c1c", // red-700
        image: "https://picsum.photos/id/78/500/500" // Reddish/Dynamic
    },
    {
        name: "Happy Vibes",
        desc: "Songs to make you smile",
        bgColour: "#006450", // green-700
        image: "https://picsum.photos/id/111/500/500" // Car/Oldschool happy
    },
    {
        name: "Chill Lo-Fi",
        desc: "Beats to relax to",
        bgColour: "#374151", // gray-700
        image: "https://picsum.photos/id/66/500/500" // Moody/Work
    },
    {
        name: "Relaxing Piano",
        desc: "Soothing piano instrumentals",
        bgColour: "#1e3a8a", // blue-900
        image: "https://picsum.photos/id/67/500/500" // Nature/Blue
    },
    {
        name: "Rock Classics",
        desc: "Legends of Rock",
        bgColour: "#7f1d1d", // red-900
        image: "https://picsum.photos/id/68/500/500" // Dark/Abstract
    }
];

// Using SoundHelix for real mp3s (stable free hosting)
// Mapping realistic metadata
const songs = [
    // Workout
    { name: "Eye of the Tiger", desc: "Survivor", albumName: "Workout Energy", image: "https://picsum.photos/id/146/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "4:04" },
    { name: "Stronger", desc: "Kanye West", albumName: "Workout Energy", image: "https://picsum.photos/id/158/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "5:11" },
    { name: "Lose Yourself", desc: "Eminem", albumName: "Workout Energy", image: "https://picsum.photos/id/177/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "5:26" },

    // Happy
    { name: "Don't Stop Me Now", desc: "Queen", albumName: "Happy Vibes", image: "https://picsum.photos/id/237/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: "3:29" },
    { name: "Can't Stop the Feeling!", desc: "Justin Timberlake", albumName: "Happy Vibes", image: "https://picsum.photos/id/250/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: "3:56" },
    { name: "Happy", desc: "Pharrell Williams", albumName: "Happy Vibes", image: "https://picsum.photos/id/257/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: "3:53" },
    { name: "Walking on Sunshine", desc: "Katrina and the Waves", albumName: "Happy Vibes", image: "https://picsum.photos/id/274/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: "3:58" },
    { name: "Just the Way You Are", desc: "Bruno Mars", albumName: "Happy Vibes", image: "https://picsum.photos/id/338/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: "3:40" },

    // Chill
    { name: "Sunset Lover", desc: "Petit Biscuit", albumName: "Chill Lo-Fi", image: "https://picsum.photos/id/349/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: "3:57" },
    { name: "Weightless", desc: "Marconi Union", albumName: "Chill Lo-Fi", image: "https://picsum.photos/id/364/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: "8:00" },
    { name: "Midnight City", desc: "M83", albumName: "Chill Lo-Fi", image: "https://picsum.photos/id/366/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: "4:03" },

    // Relaxing
    { name: "River Flows in You", desc: "Yiruma", albumName: "Relaxing Piano", image: "https://picsum.photos/id/403/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: "3:08" },
    { name: "Clair de Lune", desc: "Claude Debussy", albumName: "Relaxing Piano", image: "https://picsum.photos/id/433/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: "5:05" },
    { name: "Nuvole Bianche", desc: "Ludovico Einaudi", albumName: "Relaxing Piano", image: "https://picsum.photos/id/449/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: "6:00" },
    { name: "Perfect", desc: "Ed Sheeran", albumName: "Relaxing Piano", image: "https://picsum.photos/id/450/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: "4:23" },
    { name: "All of Me", desc: "John Legend", albumName: "Relaxing Piano", image: "https://picsum.photos/id/451/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", duration: "4:30" },
    { name: "Thinking Out Loud", desc: "Ed Sheeran", albumName: "Relaxing Piano", image: "https://picsum.photos/id/452/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "4:41" },

    // Rock
    { name: "Bohemian Rhapsody", desc: "Queen", albumName: "Rock Classics", image: "https://picsum.photos/id/453/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "5:55" },
    { name: "Sweet Child O' Mine", desc: "Guns N' Roses", albumName: "Rock Classics", image: "https://picsum.photos/id/454/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "5:56" },
    { name: "Hotel California", desc: "Eagles", albumName: "Rock Classics", image: "https://picsum.photos/id/455/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: "6:30" },
    { name: "Smells Like Teen Spirit", desc: "Nirvana", albumName: "Rock Classics", image: "https://picsum.photos/id/456/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: "5:01" }
];

const seed = async () => {
    console.log("🌱 Starting Real Song Database Seed...");
    await connectDB();

    try {
        // 0. Cleanup
        console.log("Cleaning old data...");
        await songModel.deleteMany({});
        await albumModel.deleteMany({});
        console.log("Old data cleared!");

        // 1. Add Albums
        console.log("Creating Albums...");
        for (const album of albums) {
            try {
                const res = await axios.post(`${url}/album/add`, album);
                if (res.data.success) {
                    console.log(`✅ Album added: ${album.name}`);
                } else {
                    console.error(`❌ Failed to add album ${album.name}: ${res.data.message}`);
                }
            } catch (err) {
                console.error(`❌ Error adding album ${album.name}: ${err.message}`);
            }
        }

        // 2. Add Songs
        console.log("Creating Songs...");
        // Wait a moment for albums to be processed (though they are awaited above, safe to proceed)
        
        for (const song of songs) {
            try {
                const songPayload = {
                    ...song,
                    album: song.albumName
                };

                const res = await axios.post(`${url}/song/add`, songPayload);
                if (res.data.success) {
                    console.log(`✅ Song added: ${song.name}`);
                } else {
                    console.error(`❌ Failed to add song ${song.name}: ${res.data.message}`);
                }
            } catch (err) {
                console.error(`❌ Error adding song ${song.name}: ${err.message}`);
            }
        }

        console.log("✨ Seeding Completed Successfully!");
        process.exit(0);

    } catch (error) {
        console.error("Critical Seeding Error:", error);
        process.exit(1);
    }
};

seed();
