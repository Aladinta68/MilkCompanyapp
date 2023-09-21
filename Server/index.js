const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mainRoutes = require('./routes')
const ApiError = require('./utils/apiError')
const globalErrorhandling = require('./middlewares/errormiddleware')
dotenv.config({ path: 'config.env' })

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(cookieParser());
app.use('/', mainRoutes);

app.all("*", (req, res, next) => {
    next(new ApiError(`Cant find this route : ${req.originalUrl}`, 400))
});

app.use(globalErrorhandling);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT} `)
});