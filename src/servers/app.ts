import http from 'http';
import connectDB from '../models/db/connect';
import startExpressApp from './startExpressApp';

const startServer = async () =>{
    const app = await startExpressApp();

    await connectDB(process.env.DATABASE_URL as string);

    const server = http.createServer(app);

    const PORT = process.env.PORT || 3500;

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default startServer;  