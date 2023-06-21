
import { CoursePart } from '../types'

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
          <p>Submit to: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p><b>{part.name} {part.exerciseCount}</b></p>
          <p>{part.description}</p>
          <p>Requred skills: {part.requirements}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;