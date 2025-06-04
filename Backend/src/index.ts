import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectionDb from "./config/DbConnection";
import morgan from "morgan";
import adminRouter from "./routes/admin.route";
config();

const app = express();
const port = process.env.PORT || 3000;
connectionDb();

app.use(express.json({limit:'100mb'}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"))

app.use(cors({
  origin: ['http://localhost:4200']
}))
app.use('/admin',adminRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
