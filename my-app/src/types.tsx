interface CoursePartBase {
  name: string;
  exerciseCount: number;
  kind: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: Array<string>;
  kind: "special";
}
export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;