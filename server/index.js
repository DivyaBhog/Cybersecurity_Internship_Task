const express = require("express");
const cors = require("cors");

const passwordRoutes = require("./routes/passwordRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/password", passwordRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
