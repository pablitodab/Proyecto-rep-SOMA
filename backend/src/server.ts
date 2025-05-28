import express, { Application } from 'express';
import { sequelize } from './database/connection';
import { setupAssociations } from './models/associations';

import User from './models/user';
import RUser from './routes/user';

import Objetivo from "./models/objetivo";
import RObjetivo from './routes/objetivo';

import Diario from './models/diario';
import RDiario from './routes/diario';

import Nutricion from './models/nutricion';
import RNutricion from './routes/nutricion';

import Rutina from './models/rutina';
import RRutina from './routes/rutina';

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
            console.log("Servidor corriendo en puerto: " + this.port);
        })
    }

    router() {
        this.app.use(RUser);
        this.app.use('/api/objetivos', RObjetivo);
	this.app.use('/api/diario', RDiario);
	this.app.use('/api/nutricion', RNutricion);
	this.app.use('/api/rutina', RRutina);
    }

    middlewares() {
        this.app.use(express.json());
    }

    async DBconnect(){
        try {
            setupAssociations();
            await User.sync({ alter: false });
            await sequelize.sync({ alter: false });
            console.log("Modelos sincronizados correctamente");
        } catch (error) {
            console.log("Error de conexión: ", error)
        }
    }
}

export default Server;
