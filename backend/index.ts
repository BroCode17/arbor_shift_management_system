import express, {Request, Response} from 'express';

const app  = express();

const PORT = 5050;

app.get('/', (req: Request, res:Response) => {
    res.send('Hello world');
})
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})