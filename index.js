import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/auth.js";
import UserRouter from "./routes/users.js";
import PostRouter from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
// import { updateFriends } from "./routes/users.js";
// import { userFriend } from "./routes/users.js";
import User from "./models/User.js";
import Post from "./models/post.js";
import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
mongoose.set("strictQuery", true);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PATCH",
    allowedHeaders: "Content-Type",
    credentials: true,
  })
);
//upload.single("picture"),
/* ROUTES WITH FILES */
app.post("/auth/register",  register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.get("/", (req, res) => {
  res.send("welcome, server is online now");
});
app.use("/auth", router);
app.use("/users", UserRouter);
app.use("/posts", PostRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => console.log(`${error} did not connect`));

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
