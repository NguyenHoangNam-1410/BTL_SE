import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import printerRoutes from './routes/printer.routes.js'; 
import printJobRoutes from './routes/printjob.routes.js';
import semesterRoutes from './routes/semesters.routes.js';
import userRoutes from './routes/users.routes.js';
import transactionRoutes from './routes/transactions.routes.js';
import fileRoutes from './routes/files.routes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', printerRoutes);
app.use('/api', userRoutes);
app.use('/api', transactionRoutes);
app.use('/api', fileRoutes);
app.use('/api', semesterRoutes);
app.use('/api',printJobRoutes)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();