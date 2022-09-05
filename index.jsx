import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const root = ReactDOM.createRoot(document.getElementById("app"));

const MOVIES = [
    {
        title: "Plan 9 from outer space",
        year: 1957,
        synopsis: "A complete mess, but Bela Lugosi is in it"
    },
    {
        title: "Dune",
        year: 2021,
        synopsis: "The spice must flow."
    }
];



function FrontPage(){
    return <div>
            <h1> Lecture 2 - Livecoded Movies </h1>
            <ul>
                <li><Link to="/movies"> List Movies </Link></li>
                <li><Link to="/movies/new"> New Movie </Link> </li>
            </ul>
        </div>

}

function ListMovies({movies}){
    return(
        <div>
            <h1> Listing all Movies </h1>
            {
                movies.map( m =>
                    <>
                        <h2> {m.title} - {m.year}</h2>
                        <div>
                            {m.synopsis}
                        </div>
                    </>
                )
            }
        </div>
    )
}

function AddMovie({onAddMovie}){
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [synopsis, setSynopsis] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        onAddMovie({title, year, synopsis});
        console.log(MOVIES);
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1> New movie details </h1>
            <div>
                <label> Title: <input value={title} onChange={e => setTitle(e.target.value)}/> </label>
            </div>
            <div>
                <label> Year: <input value={year} onChange={e => setYear(e.target.value)}/> </label>
            </div>
            <div>
                <label> Synopsis: <input value={synopsis} onChange={e => setSynopsis(e.target.value)}/> </label>
            </div>
            <button>Submit</button>
        </form>
    );
}

function Application(){
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}></Route>
            <Route path="/movies" element={<ListMovies movies={MOVIES}/>}></Route>
            <Route path="/movies/new" element={<AddMovie onAddMovie={m => MOVIES.push(m)}/>}></Route>
        </Routes>
    </BrowserRouter>
}

root.render(
    <Application/>
);
