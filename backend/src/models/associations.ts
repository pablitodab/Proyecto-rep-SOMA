import { User } from './user';
import { Routine } from './routine';
import { WorkoutSession } from './workout_session';
import { WorkoutExercise } from './workout_exercise';

export function setupAssociations() {
    // Relaciones User - Routine (Un usuario tiene muchas rutinas)
    User.hasMany(Routine, { 
        foreignKey: 'user_id',
        as: 'routines'
    });
    Routine.belongsTo(User, { 
        foreignKey: 'user_id',
        as: 'user'
    });

    // Relaciones User - WorkoutSession (Un usuario tiene muchas sesiones)
    User.hasMany(WorkoutSession, {
        foreignKey: 'user_id',
        as: 'workout_sessions'
    });
    WorkoutSession.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
    });

    // Relaciones WorkoutSession - WorkoutExercise (Una sesión tiene muchos ejercicios)
    WorkoutSession.hasMany(WorkoutExercise, {
        foreignKey: 'session_id',
        as: 'exercises'
    });
    WorkoutExercise.belongsTo(WorkoutSession, {
        foreignKey: 'session_id',
        as: 'session'
    });
}
