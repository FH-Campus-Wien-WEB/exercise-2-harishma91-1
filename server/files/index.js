window.onload = function () {
    const xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        const bodyElement = document.querySelector("body");
        
        if (xhr.status == 200) {
            const movies = JSON.parse(xhr.responseText);
            
            // clear the body 
            bodyElement.innerHTML = ""; 

            // loop through the movies exactly once
            movies.forEach(movie => {
                const article = document.createElement("article");
                
                article.id = movie.imdbID;

                // edit button
                const button = document.createElement("button");
                button.textContent = "Edit";
                button.onclick = function () {
                    location.href = "edit.html?imdbID=" + movie.imdbID;
                };
                article.appendChild(button);

                // poster
                const img = document.createElement("img");
                img.src = movie.Poster; 
                article.appendChild(img);

                // title
                const title = document.createElement("h1");
                title.textContent = movie.Title;
                article.appendChild(title);

                // Genres
                const genreContainer = document.createElement("div");
                const genres = movie.Genres|| [];
                genres.forEach(g => {
                    const span = document.createElement("span");
                    span.textContent = g;
                    span.classList.add("genre");
                    genreContainer.appendChild(span);
                });
                article.appendChild(genreContainer);

                // plot
                const plot = document.createElement("p");
                plot.textContent = movie.Plot;
                article.appendChild(plot);

                const createSection = (label, items) => {
                    if (!items || items.length === 0) return; // skip if no items
                    const h3 = document.createElement("h3");
                    h3.textContent = label;
                    article.appendChild(h3);
                    
                    const ul = document.createElement("ul");
                    items.forEach(item => {
                        const li = document.createElement("li");
                        li.textContent = item;
                        ul.appendChild(li);
                    });
                    article.appendChild(ul);
                };

                createSection("Director", movie.Directors);
                createSection("Writers", movie.Writers);
                createSection("Actors", movie.Actors);

                bodyElement.appendChild(article); 
            });

        } else {
            bodyElement.append(
                "Daten konnten nicht geladen werden, Status " +
                xhr.status + " - " + xhr.statusText
            );
        }
    };

    xhr.open("GET", "/movies");
    xhr.send();
};