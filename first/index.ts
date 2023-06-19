import express from 'express';
const app = express();
app.use(express.json());
import { calculateBmi, BmiResult } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmiResult: BmiResult = calculateBmi(height, weight);
    res.json(bmiResult);
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { target, daily_exercises } = req.body;
    
    if (!target || !daily_exercises) {
      return res.status(400).json({ error: 'parameters missing' });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Array.isArray(daily_exercises) || !daily_exercises.every((value: any) => !isNaN(Number(value)))) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }

    const result: Result = calculateExercises(Number(target), daily_exercises as number[]);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});