import express from 'express';
import cors from 'cors';
import multer from 'multer';
import handleFilesRoute from './routes/handle.files.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

// Routes
app.use(handleFilesRoute);