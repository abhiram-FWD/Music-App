import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './routes/songRoute.js';
import albumRouter from './routes/albumRoute.js';
import userRouter from './routes/userRoute.js';
import { connectDB } from './config/db.js';


// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Initializing Routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/user", userRouter);
app.use('/images', express.static('uploads'));
app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log(`Server started on ${port}`));
