const movies = document.getElementById("movies");
const table = document.getElementById("table");
const btnSeeAll = document.getElementById("btnSeeAll");
btnOptions = document.getElementById("btnOptions");
const btnAdd = document.getElementById("btnAdd");
const btnFind = document.getElementById("btnFind");
const btnModify = document.getElementById("btnModify");
const btnDelete = document.getElementById("btnDelete");
const title = document.getElementById("title");
const year = document.getElementById("year");
const director = document.getElementById("director");
const see = document.getElementById("see");
const codigoId = document.getElementById("id").value;

//CREATE: method POST

async function createFilms() {
    try {
        const response = await fetch("http://localhost:3000/films", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: `${title.value}`,
                year: `${year.value}`,
                director: `${director.value}`,
            }),
        });
        const data = await response.json();
        console.log(data);
        alert("Pelicula añadida con exito");
    } catch (error) {
        console.log("Error: ", error);
    }
}

//READ: method GET

async function getAllFilms() {
    try {
        const response = await fetch("http://localhost:3000/films", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

async function getOneFilm(codigoId) {
    try {
        const codigoId = document.getElementById("id").value;
        const response = await fetch(
            `http://localhost:3000/films/${codigoId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
       
        movies.innerHTML = `
            <tr>
                <td>${data.id}</td>
                <td>${data.title}</td>      
                <td>${data.year}</td>
                <td>${data.director}</td>      
            </tr>
        `; 
        document.getElementById("id").value = "";
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

//UPDATE: method PUT

async function updateFilms() {
    try {
        const codigoId = document.getElementById("id").value;
        const oneFilm = await getOneFilm(codigoId);
        const updatedFilm = {
            title: title.value || oneFilm.title,
            year: year.value || oneFilm.year,
            director: director.value || oneFilm.director,
        };

        const response = await fetch(
            `http://localhost:3000/films/${codigoId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFilm),
            }
        );
        const data = await response.json();
        alert("Pelicula actualizada con exito");
    } catch (error) {
        console.log("Error: ", error);
    }
}

//DELETE: method DELETE

async function deleteFilm() {

    try {
        const codigoId = document.getElementById("id").value;
        const oneFilm = await getOneFilm(codigoId);
        const response = await fetch(
            `http://localhost:3000/films/${codigoId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        alert("Pelicula eliminada con exito");
    } catch (error) {
        console.log("Error: ", error);
    }
}

//PRINT

async function printFilms() {
    const data = await getAllFilms();

    movies.innerHTML = data
        .map(({ id, title, year, director }) => {
            return `
    <tr>
      <td>${id}</td>
      <td>${title}</td>      
      <td>${year}</td>
      <td>${director}</td>      
    </tr>`;
        })
        .join("");
}

btnSeeAll.addEventListener("click", () => {
    printFilms(); 
    if (table.style.display === "none") {        
        table.style.display = "block"; 
    } else {
        table.style.display = "none"; 
    }
});

btnOptions.addEventListener("click", () => {
    if (options.style.display === "none") {        
        options.style.display = "block"; 
    } else {
        options.style.display = "none"; 
    }
});

btnAdd.addEventListener("click", createFilms); 

btnFind.addEventListener("click", getOneFilm);

btnModify.addEventListener("click", updateFilms);

btnDelete.addEventListener("click",  deleteFilm);