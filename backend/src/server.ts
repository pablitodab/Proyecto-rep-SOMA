import express, { Application } from 'express';
import { sequelize } from './database/connection';
import { setupAssociations } from './models/associations';
import userRouter from './routes/user';
import diarioRouter from './routes/diario';
import nutricionRouter from './routes/nutricion';
import objetivoRouter from './routes/objetivo';
import rutinaRouter from './routes/rutina';
import cors from 'cors';
import morgan from 'morgan';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.config();
        this.DBconnect();
    }

    private config() {
        // Middlewares
	this.app.use(morgan('dev'));
        this.app.use(cors({
            origin: ['https://proyecto.pablitoda.com', 'http://localhost:4200'],
            credentials: true
        }));
        this.app.use(express.json());
        
        // Rutas
        this.app.use('/api/users', userRouter);
        this.app.use('/api/diario', diarioRouter);
        this.app.use('/api/nutricion', nutricionRouter);
        this.app.use('/api/objetivos', objetivoRouter);
        this.app.use('/api/rutina', rutinaRouter);
    }

    private async DBconnect() {
        try {
            await sequelize.authenticate();
            setupAssociations();
            console.log('✅ Conectado a la base de datos');
        } catch (error) {
            console.error('❌ Error de conexión a la base de datos:', error);
            process.exit(1);
        }
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor corriendo en puerto ${this.port}`);
        });
    }
}

export default Server;
