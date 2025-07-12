import express from 'express';
import cors from 'cors';
import multer from 'multer';
import handleFilesRoute from './routes/handle.files.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
export const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

// Health check endpoint
// app.use((req, res, next) => {
//   res.status(200).send({ message: "Server is running" });
// })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.post('/uploadAudioFile', upload.single('audioFile'), handleFilesRoute);

// Routes
app.use(handleFilesRoute);