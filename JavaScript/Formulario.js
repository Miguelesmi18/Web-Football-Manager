
const tipo = document.getElementById("tipo");
const posiciones = document.getElementById("posiciones");

tipo.addEventListener("change", () => {
    if(tipo.value === "jugador"){
        posiciones.style.display = "block";
    } else {
        posiciones.style.display = "none";
    }
});

// Lista de equipos
const listaEquipos = ["FC Barcelona", "Real Madrid", "Atlético de Madrid", "Valencia CF", "Sevilla FC", "Real Betis", "Athletic Club", "Deportivo de La Coruña", "SD Eibar", "RCD Espanyol", "Granada CF", "Levante UD", "Real Sociedad"];
const selectEquipos = document.getElementById("equipos");

listaEquipos.forEach(equipo => {
    let opcion = document.createElement("option");
    opcion.textContent = equipo;
    opcion.value = equipo;
    selectEquipos.appendChild(opcion);
});