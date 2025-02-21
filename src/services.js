const movies = document.getElementById("movies");
const table = document.getElementById("table");
const btnSeeAll = document.getElementById("btnSeeAll");
const btnOptions = document.getElementById("btnOptions");
const btnAdd = document.getElementById("btnAdd");
const btnFind = document.getElementById("btnFind");
const btnModify = document.getElementById("btnModify");
const btnDelete = document.getElementById("btnDelete");
const title = document.getElementById("title");
const year = document.getElementById("year");
const director = document.getElementById("director");
const see = document.getElementById("see");
const options = document.getElementById("options");


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

async function getOneFilm(id) {
    try {
       
        const response = await fetch(
            `http://localhost:3000/films/${id}`,
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
                <td id="codigoId" >${data.id}</td>
                <td>${data.title}</td>      
                <td>${data.year}</td>
                <td>${data.director}</td>   
                <td></td>                 
                <td></td>     
            </tr>
        `; 

        title.value = data.title;
        year.value = data.year;
        director.value = data.director;
        codigoId.value = data.id; 

        options.style.display = "block";
        
        return data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

//UPDATE: method PUT

async function updateFilms(codigoId) {
    try {
        // Obtén el id desde el input (asegúrate de que el input exista y tenga el id correcto)
        const filmId = document.getElementById("codigoId").value;
        if (!filmId) {
            alert("No se ha seleccionado ninguna película");
            return;
        }

        // Construye el objeto actualizado
        const updatedFilm = {
            title: title.value,
            year: year.value,
            director: director.value,
        };

        // Realiza la petición PUT usando el ID obtenido
        const response = await fetch(`http://localhost:3000/films/${filmId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedFilm),
        });

        if (response.ok) {
            alert("Pelicula actualizada con éxito");
        } else {
            const errorData = await response.json();
            console.log("Error en update:", errorData);
            alert("Error al actualizar la película");
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}



//DELETE: method DELETE

async function deleteFilm(oneFilm) {

    try {
        
        // const oneFilm = document.getElementById("codigoId").value;
        const response = await fetch(
            `http://localhost:3000/films/${oneFilm}`,
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
            <td id ="id">${id}</td>
            <td>${title}</td>
            <td>${year}</td>
            <td>${director}</td>
            <td><button onclick="getOneFilm('${id}')"><i class="bi bi-gear"></i></button></td>
            <td><button onclick="deleteFilm('${id}')"><i class="bi bi-trash"></i></button></td>
          </tr>`;
      })
      .join(""); 
    }


    function addFilm() {
        options.style.display = "block";
    }

    
    btnSeeAll.addEventListener("click", () => {
    printFilms(); 
    options.style.display = "none";
    if (table.style.display === "none") {        
        table.style.display = "block"; 
    } else {
        table.style.display = "none"; 
    }
});

btnAdd.addEventListener("click", createFilms); 
btnModify.addEventListener("click", updateFilms);



