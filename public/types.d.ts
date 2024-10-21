type Exercise = {
  id: string;
  name: string;
  url: string;
  type: "rep" | "sec";
  equipment: (
    | "band"
    | "none"
    | "parallel-bars"
    | "rings"
    | "box"
    | "towel"
    | "pull-up-bar"
    | "weights"
    | "wheel"
    | "nordic-strap"
  )[];
};

type ProgressionSet = {
  exerciseId: string;
  min: number;
  max: number;
  rest: number;
};

type Progression = {
  id: string;
  category: Category;
  noOfSets: number;
  progressionSets: ProgressionSet[];
};

type Workout = {
  id: string;
  name: string;
  progressions: string[];
};

type Category =
  | "shoulder-warmup"
  | "spine-warmup"
  | "wrist-warmup"
  | "core-warmup"
  | "back-warmup"
  | "hold-warmup"
  | "squat-warmup"
  | "hinge-warmup"
  | "pull-up"
  | "squat"
  | "dip"
  | "hinge"
  | "row"
  | "push-up"
  | "anti-extension"
  | "anti-rotation"
  | "extension";

interface IRRSet {
  name: string;
  url: string;
  reps: string[];
  id: string;
}
