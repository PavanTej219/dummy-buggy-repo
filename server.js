const express = require("express");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "dummy-buggy-repo is running" });
});

app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`dummy-buggy-repo listening on http://localhost:${PORT}`);
});
