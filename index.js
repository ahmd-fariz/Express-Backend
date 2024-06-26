import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ProduKRoute from "./routes/ProdukRoute.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProduKRoute);


app.listen(5000, () => console.log("Server up and runn..."));
