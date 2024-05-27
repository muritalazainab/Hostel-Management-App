require('dotenv').config()
const express = require("express")
const app = express()
const cors  =require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/DBconnect')
const errorHandler = require('./middleware/errorMiddleware')
const adminRoute = require("./routes/adminRoute")

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    next()
})

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
        optionsSuccessStatus: 200,
        methods: "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
    })
) // To limit our url access to some certain url only

app.get('/', (req, res) => {
    res.send('Hello Boss!')
});

app.use("/admin", adminRoute)


connectDB()

app.use(errorHandler)
mongoose.connection.once("open", () => {
    console.log("Database Connected")

    app.listen(PORT, () => console.log(`Server is 🏃‍♂️💨 on ${PORT}`))
})