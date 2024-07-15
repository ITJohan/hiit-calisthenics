\c postgres

DROP DATABASE "Calisthenics";
CREATE DATABASE "Calisthenics";

\c Calisthenics

CREATE TABLE Athletes (
  athlete_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL
);
CREATE TABLE Workouts (
  workout_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL
);
CREATE TABLE Sets {
  set_id SERIAL PRIMARY KEY,
  set_number INT,
  cooldown INT,
}
CREATE TABLE Exercises (
  exercise_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category CHAR(4) CHECK (category IN ('legs', 'push', 'pull','core')),
  level INT CHECK (level >= 1 AND level <= 10),
);
CREATE TABLE WorkoutLogs (
  workout_log_id SERIAL PRIMARY KEY,
  workout_date TIMESTAMP NOT NULL
  workout INT REFERENCES Workouts(workout_id) ON DELETE CASCADE ON UPDATE CASCADE,
  athlete INT REFERENCES Athletes(athlete_id) ON DELETE CASCADE ON UPDATE CASCADE,
);
CREATE TABLE SetLogs (
  set_log_id SERIAL PRIMARY KEY,
  workout_log INT REFERENCES WorkoutLogs(workout_log_id) ON DELETE CASCADE ON UPDATE CASCADE,
  set int REFERENCES Set(set_id) ON DELETE CASCADE ON UPDATE CASCADE
)
CREATE TABLE ExerciseLogs (
  exercise_log_id SERIAL PRIMARY KEY,
  reps INT NOT NULL CHECK (reps >= 0)
);

-- INSERT INTO Athletes (name, email)
--   VALUES 
--     ('John Doe', 'john@doe.com'),
--     ('Jane', 'jane@doe.com');
-- INSERT INTO Exercises (name, category, level, unit)
--   VALUES
--     ('Squats', 'legs', 1, 'reps'),
--     ('Push-ups', 'push', 1, 'reps'),
--     ('Incline pull-ups', 'push', 1, 'reps'),
--     ('Bent leg raises', 'core', 1, 'reps');
-- INSERT INTO Workouts (date)
--   VALUES (NOW());
-- INSERT INTO AthleteWorkouts (workout, athlete)
--   VALUES (1, 1);