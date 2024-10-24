require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes'); 
const { errorHandler } = require('./utils/errorHandler');

const app = express();


connectDB();


app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes); 


app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
