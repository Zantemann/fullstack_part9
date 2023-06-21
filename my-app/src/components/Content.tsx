import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map((part:CoursePart) => (
        <Part key={part.name} part = {part}/>
      ))}
    </div>
  );
};

export default Content