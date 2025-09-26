import express from "express";
import cors from "cors";

const app = express();
// app.use(cors());
app.use(cors({
    origin: '*',
}));
app.use(express.json());


app.get('/test', (req, res) => {
    res.json("this is the live server.")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
