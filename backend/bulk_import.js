
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import songModel from './models/songModel.js';
import 'dotenv/config';

// Configuration
const SOURCE_DIR = './songs_to_import';
const DEST_DIR = './uploads';
const API_URL = "http://localhost:4000"; // Assuming default port

const importSongs = async () => {
    console.log("🚀 Starting Bulk Import...");

    // 1. Connect to DB
    await connectDB();

    // 2. Ensure directories exist
    if (!fs.existsSync(SOURCE_DIR)) {
        console.log(`❌ Source directory '${SOURCE_DIR}' not found. Creating it...`);
        fs.mkdirSync(SOURCE_DIR);
        console.log(`⚠️ Please put your MP3 files in '${SOURCE_DIR}' and run this script again.`);
        process.exit(0);
    }
    if (!fs.existsSync(DEST_DIR)) {
        fs.mkdirSync(DEST_DIR);
    }

    // 3. Read Files
    const files = fs.readdirSync(SOURCE_DIR);
    const audioFiles = files.filter(file => file.toLowerCase().endsWith('.mp3') || file.toLowerCase().endsWith('.wav'));

    if (audioFiles.length === 0) {
        console.log(`⚠️ No MP3/WAV files found in '${SOURCE_DIR}'.`);
        process.exit(0);
    }

    console.log(`Found ${audioFiles.length} files to import.`);

    let successCount = 0;

    // 4. Process each file
    for (const file of audioFiles) {
        try {
            const sourcePath = path.join(SOURCE_DIR, file);
            // Sanitize filename for URL (remove spaces, special chars if needed, but simple is better for now)
            // We'll keep original filename for disk, but maybe replace spaces with %20 for URL? 
            // Better to keep simple.
            const destFilename = `${Date.now()}_${file}`;
            const destPath = path.join(DEST_DIR, destFilename);

            // Move File
            fs.renameSync(sourcePath, destPath);

            // Create Metadata
            const name = path.parse(file).name; // Filename without extension
            const stats = fs.statSync(destPath); // Maybe use size?

            // Construct Song Object
            const songData = {
                name: name,
                desc: "Imported Song",
                album: "Imported Music", // Group them together
                image: "https://picsum.photos/200/200", // Generic placeholder
                file: `${API_URL}/images/${destFilename}`,
                duration: "3:30" // Placeholder
            };

            const song = new songModel(songData);
            await song.save();

            console.log(`✅ Imported: ${name}`);
            successCount++;

        } catch (error) {
            console.error(`❌ Failed to import ${file}:`, error.message);
        }
    }

    console.log(`✨ Import Finished! Successfully added ${successCount} songs.`);
    process.exit(0);
};

importSongs();
