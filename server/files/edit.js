//form will be filled when page loads
function setMovie(movie) {
    document.getElementById("Poster").src = movie.Poster || "";
    document.getElementById("imdbID").value = movie.imdbID;
    document.getElementById("Title").value = movie.Title || "";
    document.getElementById("Released").value = movie.Released || "";
    document.getElementById("Plot").value = movie.Plot || "";

    //turn arrays into strings so they fit in the input boxes
    document.getElementById("Genres").value = (movie.Genres || []).join(", ");
    document.getElementById("Directors").value = (movie.Directors || []).join(", ");
    document.getElementById("Actors").value = (movie.Actors || []).join(", ");
}

//grab data from form & save it
function putMovie() {
    const movie = {
        imdbID: document.getElementById("imdbID").value,
        Title: document.getElementById("Title").value,
        Released: document.getElementById("Released").value,
        Plot: document.getElementById("Plot").value,
        Poster: document.getElementById("Poster").src,

        //turn strings back into arrays for the server

        Genres: document.getElementById("Genres").value.split(",").map(s => s.trim()),
        Directors: document.getElementById("Directors").value.split(",").map(s => s.trim()),
        Actors: document.getElementById("Actors").value.split(",").map(s => s.trim())
    };

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "/movies/" + movie.imdbID);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 204) {
            location.href = "index.html";
        }
    };
    xhr.send(JSON.stringify(movie));
}

//load
window.onload = function() {
    const imdbID = new URLSearchParams(window.location.search).get("imdbID");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/movies/" + imdbID);
    xhr.onload = function () {
        if (xhr.status === 200) {
            setMovie(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
};