import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Example test route
app.get('/', (_req, res) => {
  res.json({ message: 'Backend is running!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});