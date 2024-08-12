CREATE DATABASE "Calisthenics";

\c Calisthenics

CREATE TABLE Athletes (
  athlete_id SERIAL PRIMARY KEY,
  athlete_email VARCHAR(50) NOT NULL UNIQUE,
  athlete_name VARCHAR(50) NOT NULL,
  athlete_password VARCHAR(50) NOT NULL
);
CREATE TABLE Workouts (
  workout_id SERIAL PRIMARY KEY,
  workout_name VARCHAR(100) NOT NULL,
  athlete_id INT REFERENCES Athletes(athlete_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE Exercises (
  exercise_id SERIAL PRIMARY KEY,
  exercise_name VARCHAR(100) NOT NULL UNIQUE,
  exercise_category CHAR(4) CHECK (exercise_category IN ('legs', 'push', 'pull','core')),
  exercise_level INT CHECK (exercise_level >= 1 AND exercise_level <= 10)
);
CREATE TABLE Logs (
  log_id SERIAL PRIMARY KEY,
  log_date TIMESTAMP NOT NULL DEFAULT current_timestamp,
  athlete_id INT REFERENCES Athletes(athlete_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE LogExercises (
  log_reps INT NOT NULL CHECK (log_reps >= 0),
  exercise_id INT REFERENCES Exercises(exercise_id) ON DELETE CASCADE ON UPDATE CASCADE,
  log_id INT REFERENCES Logs(log_id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (exercise_id, log_id)
);
CREATE TABLE WorkoutExercises (
  set_order INT NOT NULL CHECK (exercise_order >= 0),
  exercise_order INT NOT NULL CHECK (exercise_order >= 0),
  workout_id INT REFERENCES Workouts(workout_id),
  exercise_id INT REFERENCES Exercises(exercise_id),
  PRIMARY KEY (workout_id, exercise_id, set_order, exercise_order)
);

INSERT INTO Athletes (athlete_name, athlete_email, athlete_password)
  VALUES 
    ('John Doe', 'john@doe.com', 'hashedpassword'),
    ('Jane', 'jane@doe.com', 'hashedpassword');
INSERT INTO Exercises (exercise_name, exercise_category, exercise_level)
  VALUES
    ('Squats', 'legs', 1),
    ('Push-ups', 'push', 1),
    ('Incline pull-ups', 'push', 1),
    ('Bent leg raises', 'core', 1);
INSERT INTO Workouts (workout_name)
  VALUES ('Monday');
