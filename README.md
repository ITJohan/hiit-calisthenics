# Calisthenics PWA

Calisthenics circuit workout

## ER-diagram

```mermaid
erDiagram
  Athlete {
    int athlete_id PK
    string athlete_email UK
    string athlete_name
    string athlete_password
  }
  Workout {
    int workout_id PK
    string workout_name UK
  }
  Athlete ||--o{ Workout : "creates"

  Exercise {
    int exercise_id PK
    string exercise_name UK
    string exercise_category
    int exercise_level
  }
  WorkoutExercise {
    int set_order PK
    int exercise_order
  }
  Workout }|--o{ WorkoutExercise : "part of"
  Exercise }|--o{ WorkoutExercise : "part of"

  Log {
    int log_id PK
    timedate log_date
  }
  LogExercise {
    int log_reps
  }
  Athlete ||--o{ Log : "notes"
  Workout ||--o{ Log : "noted in"
  Exercise }|--o{ LogExercise : "part of"
  Log }|--o{ LogExercise : "part of"
```
