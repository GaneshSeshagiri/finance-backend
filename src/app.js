const express = require('express')
const cors = require('cors')
require('dotenv').config();
const errorMiddleware = require('./middleware/error.middleware')
const authRoutes = require('./modules/auth/auth.routes')
const userRoutes = require('./modules/users/users.routes')
const recordsRoutes = require('./modules/records/records.routes')
const dashboardRoutes = require('./modules/dashboard/dashboard.routes')

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/dashboard', dashboardRoutes);


//errormiddleware
app.use(errorMiddleware);


const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server running on : ${port}`)
})