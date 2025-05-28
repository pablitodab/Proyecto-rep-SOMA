import express, { Application } from 'express';
import { sequelize } from './database/connection';
import RUser from './routes/user'
import { User } from './models/user';

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
        this.app.use(RUser)
    }

    middlewares() {
        this.app.use(express.json());
    }

    async DBconnect(){
        try {
            // await sequelize.authenticate();
            await User.sync();
            console.log("The table for the user model was just (re)created!");
            console.log("Conexión establecida");
        } catch (error) {
            console.log("Error de conexión: ", error)
        }
    }
}

export default Server;
