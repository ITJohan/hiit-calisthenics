# Calisthenics PWA

Calisthenics circuit workout

## ER-diagram

```mermaid
    erDiagram

    Exercise {
        int id
        string name
        string description
        string video_url
        string target_muscle_group
    }

    Progression {
        int id
        string name
    }

    ProgressionExercise {
        int progression_id
        int exercise_id
        int order
        int max_reps
    }

    Workout {
        int id
        string name
    }

    WorkoutProgression {
        int workout_id
        int progression_id
        int order
    }

    User {
        int id
        string username
    }

    UserWorkoutLog {
        int id
        int user_id
        int workout_id
        date date
    }

    UserExerciseLog {
        int id
        int user_workout_log_id
        int exercise_id
        int reps
    }

    Exercise ||--o{ ProgressionExercise : "can be in"
    Progression ||--o{ ProgressionExercise : "can have"
    Progression ||--o{ WorkoutProgression : "can be in"
    Workout ||--o{ WorkoutProgression : "can have"
    User ||--o{ UserWorkoutLog : "can have"
    Workout ||--o{ UserWorkoutLog : "can have"
    UserWorkoutLog ||--o{ UserExerciseLog : "can have"
    Exercise ||--o{ UserExerciseLog : "can have"
```
