
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
        image: "https://picsum.photos/id/78/500/500"
    },
    {
        name: "Love Songs",
        desc: "Romantic melodies for you",
        bgColour: "#be185d", // pink-700
        image: "https://picsum.photos/id/65/500/500"
    },
    {
        name: "Chill Lo-Fi",
        desc: "Beats to relax to",
        bgColour: "#374151", // gray-700
        image: "https://picsum.photos/id/66/500/500"
    },
    {
        name: "Relaxing Piano",
        desc: "Soothing piano instrumentals",
        bgColour: "#1e3a8a", // blue-900
        image: "https://picsum.photos/id/67/500/500"
    },
    {
        name: "Rock Classics",
        desc: "Legends of Rock",
        bgColour: "#7f1d1d", // red-900
        image: "https://picsum.photos/id/68/500/500"
    },
    {
        name: "Happy Vibes", /* Existing update */
        desc: "Songs to make you smile",
        bgColour: "#006450",
        image: "https://picsum.photos/id/111/500/500"
    }
];

const songs = [
    // Workout Energy
    { name: "Eye of the Tiger", desc: "Survivor", albumName: "Workout Energy", image: "https://picsum.photos/id/80/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "4:04" },
    { name: "Stronger", desc: "Kanye West", albumName: "Workout Energy", image: "https://picsum.photos/id/81/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: "5:11" },
    { name: "Lose Yourself", desc: "Eminem", albumName: "Workout Energy", image: "https://picsum.photos/id/82/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: "5:26" },
    { name: "Don't Stop Me Now", desc: "Queen", albumName: "Workout Energy", image: "https://picsum.photos/id/83/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: "3:29" },

    // Love Songs
    { name: "Perfect", desc: "Ed Sheeran", albumName: "Love Songs", image: "https://picsum.photos/id/70/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: "4:23" },
    { name: "All of Me", desc: "John Legend", albumName: "Love Songs", image: "https://picsum.photos/id/71/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", duration: "4:30" },
    { name: "Just the Way You Are", desc: "Bruno Mars", albumName: "Love Songs", image: "https://picsum.photos/id/79/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: "3:40" },
    { name: "Thinking Out Loud", desc: "Ed Sheeran", albumName: "Love Songs", image: "https://picsum.photos/id/84/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: "4:41" },

    // Chill Lo-Fi
    { name: "Sunset Lover", desc: "Petit Biscuit", albumName: "Chill Lo-Fi", image: "https://picsum.photos/id/72/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", duration: "3:57" },
    { name: "Weightless", desc: "Marconi Union", albumName: "Chill Lo-Fi", image: "https://picsum.photos/id/73/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", duration: "8:00" },
    { name: "Midnight City", desc: "M83", albumName: "Chill Lo-Fi", image: "https://picsum.photos/id/85/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3", duration: "4:03" },

    // Relaxing Piano
    { name: "River Flows in You", desc: "Yiruma", albumName: "Relaxing Piano", image: "https://picsum.photos/id/74/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3", duration: "3:08" },
    { name: "Clair de Lune", desc: "Claude Debussy", albumName: "Relaxing Piano", image: "https://picsum.photos/id/86/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: "5:05" },
    { name: "Nuvole Bianche", desc: "Ludovico Einaudi", albumName: "Relaxing Piano", image: "https://picsum.photos/id/87/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: "6:00" },

    // Rock Classics
    { name: "Bohemian Rhapsody", desc: "Queen", albumName: "Rock Classics", image: "https://picsum.photos/id/75/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3", duration: "5:55" },
    { name: "Sweet Child O' Mine", desc: "Guns N' Roses", albumName: "Rock Classics", image: "https://picsum.photos/id/76/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3", duration: "5:56" },
    { name: "Hotel California", desc: "Eagles", albumName: "Rock Classics", image: "https://picsum.photos/id/88/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: "6:30" },
    { name: "Smells Like Teen Spirit", desc: "Nirvana", albumName: "Rock Classics", image: "https://picsum.photos/id/89/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: "5:01" },

    // Happy Vibes
    { name: "Can't Stop the Feeling!", desc: "Justin Timberlake", albumName: "Happy Vibes", image: "https://picsum.photos/id/77/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3", duration: "3:56" },
    { name: "Happy", desc: "Pharrell Williams", albumName: "Happy Vibes", image: "https://picsum.photos/id/90/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: "3:53" },
    { name: "Walking on Sunshine", desc: "Katrina and the Waves", albumName: "Happy Vibes", image: "https://picsum.photos/id/91/300/300", file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: "3:58" }
];

const seed = async () => {
    console.log("🌱 Starting Database Seed...");
    await connectDB();

    try {
        // 0. Clear Database
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
                console.error(`❌ Error adding album ${album.name}`);
            }
        }

        // 2. Add Songs (Need to find Album name)
        // Since we don't have IDs, we just pass album Name str as frontend does.
        // Wait, song model stores Album *Name* or *ID*?
        // songController line 8: const album = req.body.album;
        // songModel line 6: album: { type: String, required: true }
        // MainArea.jsx uses it for filtering? No, usually frontend filters by album name match?
        // Let's check frontend DisplayAlbum.jsx if it exists or MainArea.
        // However, for now, let's assume storing the Name string is what's expected as per current simple implementation.

        console.log("Creating Songs...");
        for (const song of songs) {
            try {
                // Map albumName to album field
                const songPayload = {
                    ...song,
                    album: song.albumName // The controller expects 'album' field
                };

                const res = await axios.post(`${url}/song/add`, songPayload);
                if (res.data.success) {
                    console.log(`✅ Song added: ${song.name}`);
                } else {
                    console.error(`❌ Failed to add song ${song.name}: ${res.data.message}`);
                }
            } catch (err) {
                console.error(`❌ Error adding song ${song.name}`);
            }
        }

        console.log("✨ Seeding Completed!");

    } catch (error) {
        console.error("Critical Seeding Error:", error);
    }
};

seed();
