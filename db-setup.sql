DROP DATABASE "Calisthenics";
CREATE DATABASE "Calisthenics";

\c Calisthenics

CREATE TABLE Athletes (
  id SERIAL,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Workouts (
  id SERIAL,
  date TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Exercises (
  name VARCHAR(100),
  category VARCHAR(100),
  level SMALLINT UNIQUE CHECK (level >= 1 AND level <= 10),
  unit VARCHAR(10),
  PRIMARY KEY (name),
  CHECK (category IN ('leg', 'push', 'pull','core')),
  CHECK (unit IN ('second', 'rep'))
);

CREATE TABLE AthleteWorkouts (
  workout INT,
  athlete INT,
  PRIMARY KEY (workout),
  FOREIGN KEY (workout) REFERENCES Workouts(id),
  FOREIGN KEY (athlete) REFERENCES Athletes(id)
);

CREATE TABLE WorkoutExercises (
  exercise VARCHAR(100),
  workout INT,
  set SMALLINT NOT NULL,
  reps SMALLINT NOT NULL,
  PRIMARY KEY (exercise),
  FOREIGN KEY (exercise) REFERENCES Exercises(name),
  FOREIGN KEY (workout) REFERENCES Workouts(id)
);

INSERT INTO Athletes (name, email) VALUES ('Johan', 'johanlindkvist89@gmail.com');
