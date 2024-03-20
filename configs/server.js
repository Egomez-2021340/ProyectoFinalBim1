import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {dbConnection} from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
class Server{
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.userPath= '/ProjectBimestral/v1/user';
        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }
    routes(){
        this.app.use(this.userPath,userRoutes);
    }
    listen (){
        this.app.listen(this.PORT,()=>{
            console.log('Server running on PORT: ',this.PORT)
        })
    }
}

export default Server;