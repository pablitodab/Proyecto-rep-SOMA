import express, { Application } from 'express';
import { sequelize } from './database/connection';
import RUser from './routes/user';
import { User } from './models/user';
import { Routine } from './models/routine';
import { WorkoutSession } from './models/workout_session';
import { WorkoutExercise } from './models/workout_exercise';
import { setupAssociations } from './models/associations';
import RRoutine from './routes/routine';

class Server {
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.router();
        this.DBconnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Te estás corriendo por el puerto: " + this.port);
        })
    }

    router() {
    this.app.use(RUser);
    this.app.use(RRoutine);
    
    }

    middlewares() {
        this.app.use(express.json());
    }

    async DBconnect(){
        try {
            // Configurar asociaciones
            setupAssociations();
            
            // Sincronizar modelos con la base de datos
            await User.sync({ alter: false });
            await Routine.sync({ alter: false });
            await WorkoutSession.sync({ alter: false });
            await WorkoutExercise.sync({ alter: false });
            
            console.log("Todos los modelos se han sincronizado correctamente");
            console.log("Conexión establecida");
        } catch (error) {
            console.log("Error de conexión: ", error)
        }
    }
}

export default Server;
