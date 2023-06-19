export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = ( target: number, exerciseHours: number[]): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hours => hours > 0).length;
  const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job!';
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = 'not bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

const parseExerciseArguments = (args: string[]): { target: number; exerciseHours: number[] } => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Invalid target value');

  const exerciseHours = args.slice(3).map(arg => {
    const hours = Number(arg);
    if (isNaN(hours)) throw new Error('Invalid exercise hours');
    return hours;
  });

  return { target, exerciseHours };
};

try {
  // Check if running in command line mode
  if (process.argv.length > 2) {
    const { target, exerciseHours } = parseExerciseArguments(process.argv);
    const result: Result = calculateExercises(target, exerciseHours);
    console.log(result);
  }
} catch (error: unknown) {
  let errorMessage = 'Error happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}