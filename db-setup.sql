\c postgres

DROP DATABASE "Calisthenics";
CREATE DATABASE "Calisthenics";

\c Calisthenics

CREATE TABLE Athletes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
);

CREATE TABLE Workouts (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP NOT NULL
);

CREATE TABLE Exercises (
  name VARCHAR(100) PRIMARY KEY,
  category VARCHAR(100) CHECK (category IN ('legs', 'push', 'pull','core')),
  level SMALLINT CHECK (level >= 1 AND level <= 10),
  unit VARCHAR(10) CHECK (unit IN ('seconds', 'reps'))
);

CREATE TABLE AthleteWorkouts (
  workout INT PRIMARY KEY REFERENCES Workouts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  athlete INT REFERENCES Athletes(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE WorkoutExercises (
  exercise VARCHAR(100) PRIMARY KEY REFERENCES Exercises(name) ON DELETE CASCADE ON UPDATE CASCADE,
  workout INT REFERENCES Workouts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  set SMALLINT NOT NULL,
  reps SMALLINT NOT NULL
);

INSERT INTO Athletes (name, email)
  VALUES 
    ('John Doe', 'john@doe.com'),
    ('Jane', 'jane@doe.com');
INSERT INTO Exercises (name, category, level, unit)
  VALUES
    ('Squats', 'legs', 1, 'reps'),
    ('Push-ups', 'push', 1, 'reps'),
    ('Incline pull-ups', 'push', 1, 'reps'),
    ('Bent leg raises', 'core', 1, 'reps');
INSERT INTO Workouts (date)
  VALUES (NOW());
INSERT INTO AthleteWorkouts (workout, athlete)
  VALUES (1, 1);