export interface BmiResult {
  weight: number;
  height: number;
  bmi: string;
}

export const calculateBmi = (height: number, weight: number): BmiResult => {
  const bmi = weight / ((height / 100) ** 2);
  let message: string;

  if (bmi < 16) {
    message = 'Underweight (Severe thinness)';
  } else if (bmi >= 16 && bmi < 17) {
    message = 'Underweight (Moderate thinness';
  } else if (bmi >= 17 && bmi < 18.5) {
    message = 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi < 25) {
    message = 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    message = 'Overweight (Pre-obese)';
  } else if (bmi >= 30 && bmi < 35) {
    message = 'Obese (Class I)';
  } else if (bmi >= 35 && bmi < 40) {
    message = 'Obese (Class II)';
  } else {
    message = 'Obese (Class III)';
  }

  const result: BmiResult = {
    weight,
    height,
    bmi: message
  };

  return result;
};

const parseBmiArguments = (args: string[]): { height: number; weight: number } => {
  if (args.length !== 4) throw new Error('Wrong amount of arguments');

  const height = Number(args[2]);
  if (isNaN(height)) throw new Error('Invalid height value');

  const weight = Number(args[3]);
  if (isNaN(weight)) throw new Error('Invalid weight value');

  return { height, weight };
};

try {
  // Check if running in command line mode
  if(process.argv.length > 2) {
    const { height, weight } = parseBmiArguments(process.argv);
    const bmiResult: BmiResult = calculateBmi(height, weight);
    console.log(bmiResult.bmi);
  }
} catch (error: unknown) {
  let errorMessage = 'Error happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}