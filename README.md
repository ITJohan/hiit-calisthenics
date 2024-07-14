# Calisthenics PWA

Calisthenics circuit workout

## ER-diagram

```mermaid
erDiagram
  User {
    integer user_id PK
    string email UK
    string name
    string password
  }
  Workout {
    integer workout_id PK
    date created_at
  }
  Set {
    integer set_id PK
    integer set_number
    integer cooldown
    integer level UK
  }
  Exercise {
    integer exercise_id PK
    string name
    string category
  }
  WorkoutLog {
    integer workout_log_id PK
    date workout_date
  }
  SetLog {
    integer set_log_id PK
  }
  ExerciseLog {
    integer exercise_log_id PK
    integer reps
  }

  User ||--o{ Workout : "creates"
  Workout ||--|{ Set : "contains"
  Set }o--|{ Exercise : "contains"
  User ||--o{ WorkoutLog : "logs"
  Workout ||--o{ WorkoutLog : "is part of"
  WorkoutLog ||--|{ SetLog : "contains"
  Set ||--o{ SetLog : "is part of"
  SetLog ||--|{ ExerciseLog : "contains"
  Exercise ||--o{ ExerciseLog : "is part of"
```
