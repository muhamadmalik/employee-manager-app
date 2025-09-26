import express from "express";
import cors from "cors";
import accessRoutes from "./routes/accessRoutes.js";


const app = express();
// app.use(cors());
app.use(cors({
    origin: '*',
}));
app.use(express.json());


app.get('/api/test', (req, res) => {
    res.json("this is the live server.")
})

app.use("/api/access", accessRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
