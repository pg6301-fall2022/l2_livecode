import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();

const MOVIES = [
    {
        title: "Plan 9 from outer space - server",
        year: 1957,
        synopsis: "A complete mess, but Bela Lugosi is in it"
    },
    {
        title: "Dune - server",
        year: 2021,
        synopsis: "The spice must flow."
    }
];

app.use(bodyParser.json());

app.get("/api/movies", (req, res) => {
    res.json(MOVIES);
});

app.post("/api/movies", (req, res) =>{
    const {title, year, synopsis} = req.body;
    MOVIES.push({title, year, synopsis});
    res.sendStatus(200);
});

app.use(express.static(path.resolve("..", "client", "dist")));
app.use((req, res) => {
   res.sendFile(path.resolve("..", "client", "dist", "index.html"));
});

const server = app.listen(3000, () => {
    console.log("Listening on http://localhost:" + server.address().port);
})