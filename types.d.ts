type Exercise = {
  id: string;
  name: string;
  type: 'rep' | 'sec';
  equipment: ('band' | 'none' | 'parallel-bars' | 'rings' | 'box' | 'towel' | 'pull-up-bar' | 'weights' | 'wheel' | 'nordic-strap')[];
}

type Progression = {
  id: string;
  name: string;
  exercises: {
    id: string;
    reps: number[];
    rest: number;
  }
}

type Workout = {
  id: string;
  name: string;
  progressions: string[];
}
