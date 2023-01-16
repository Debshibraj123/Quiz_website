require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true);
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}))




const url="mongodb+srv://Shibraj1212:shibrajDeb@cluster0.9i1zegv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url) // if error it will throw async error

mongoose.connection.on("connected",()=>{
  console.log("Connected to mongo");  
});
mongoose.connection.on("error",()=>{
  console.log("Not connected to mongo");
})


app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);



const port = process.env.PORT || 8080;

app.listen(port, console.log(`Listening on port ${port}...`));
