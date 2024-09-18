type Exercise = {
	id: string;
	name: string;
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

type Set = {
	exerciseId: string;
	reps: number[];
	rest: number;
};

type Progression = {
	id: string;
	name: string;
	sets: Set[];
};

type Workout = {
	id: string;
	name: string;
	progressions: string[];
};
