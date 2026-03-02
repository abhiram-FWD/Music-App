
import mongoose from "mongoose";
import 'dotenv/config';
import songModel from './models/songModel.js';

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await songModel.countDocuments();
        console.log(`Total songs in DB: ${count}`);
        const songs = await songModel.find({}, 'name');
        console.log("Song Names:", songs.map(s => s.name));
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
checkDB();
