import "reflect-metadata"
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import userRoute from "./routes/user/registerUser";
import { AppDataSource } from './config/data_source';
import { errorHandler } from "./errors/db_global_error_handler";
import { errorHandler as mainErrorHandler } from "./middlewares/custom_error_middleware";

const app  = express();

const PORT = 5000;


// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Routes
app.use('/api/v1/', userRoute)



app.get('/', (req: Request, res:Response) => {
    res.send('Hello world');
})


//connet db
AppDataSource.initialize()
    .then(() => {
        // Todo
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Fixed DB Connection before application can start")
        console.log(error);
    });


// Error Handlers
app.use(mainErrorHandler)
app.use(errorHandler)
