import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColour = req.body.bgColour;
        let imageUrl;

        if (req.file) {
            imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        } else if (req.body.image) {
            imageUrl = req.body.image;
        } else {
            return res.json({ success: false, message: "No image provided" });
        }

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUrl
        }

        const album = albumModel(albumData);
        await album.save();

        res.json({ success: true, message: "Album Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.json({ success: true, albums: allAlbums });
    } catch (error) {
        res.json({ success: false });
    }
}

const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Album Removed" });
    } catch (error) {
        res.json({ success: false });
    }
}

export { addAlbum, listAlbum, removeAlbum };
