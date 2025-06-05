import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectionDb from "./config/DbConnection";
import adminRouter from "./routes/admin.route";
import cookieParser from "cookie-parser";
config();

const app = express();
const port = process.env.PORT || 2000;
connectionDb();

app.use(express.json({limit:'100mb'}));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:4200'],
  credentials:true
}))
app.use('/admin',adminRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
