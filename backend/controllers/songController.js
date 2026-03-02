import songModel from '../models/songModel.js';

const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        let audioUrl, imageUrl, duration;

        if (req.files && req.files.audio && req.files.image) {
            const audioFile = req.files.audio[0];
            const imageFile = req.files.image[0];

            // Local file paths
            audioUrl = `${req.protocol}://${req.get('host')}/images/${audioFile.filename}`;
            imageUrl = `${req.protocol}://${req.get('host')}/images/${imageFile.filename}`;

            // Duration cannot be calculated easily without external lib, referencing body or default
            duration = req.body.duration || "3:30";
        } else if (req.body.file && req.body.image && req.body.duration) {
            // Direct URL case (Seeding)
            audioUrl = req.body.file;
            imageUrl = req.body.image;
            duration = req.body.duration;
        } else {
            return res.json({ success: false, message: "Missing files or URLs" });
        }

        const songData = {
            name,
            desc,
            album,
            image: imageUrl,
            file: audioUrl,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: "Song Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        res.json({ success: false });
    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song Removed" });
    } catch (error) {
        res.json({ success: false });
    }
}

export { addSong, listSong, removeSong };
