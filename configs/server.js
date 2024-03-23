import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import {dbConnection} from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import loginRoutes from '../src/auth/auth.routes.js';
import productRoutes from '../src/products/product.routes.js';
import categoryRoutes from '../src/categories/category.routes.js';
class Server{
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT;
        this.userPath= '/ProjectBimestral/v1/user';
        this.loginPath='/ProjectBimestral/v1/login';
        this.productPath = '/ProjectBimestral/v1/product';
        this.categoryPath = '/ProjectBimestral/v1/category';
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
        this.app.use(this.loginPath,loginRoutes);
        this.app.use(this.productPath,productRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
    }
    listen (){
        this.app.listen(this.PORT,()=>{
            console.log('Server running on PORT: ',this.PORT)
        })
    }
}

export default Server;