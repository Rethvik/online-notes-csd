const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoutes");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server Connected"));
