import { CoursePart } from "../types";

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  const totalExercises = courseParts.reduce((carry:number, part:CoursePart) => carry + part.exerciseCount, 0);
  return <p><b>Number of exercises: {totalExercises}</b></p>;
};

export default Total;