import express from 'express';
import cors = require('cors');
const app = express();
import diaryRouter from './routes/diaries';
app.use(cors());
app.use(express.json());

const PORT = 3003;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});