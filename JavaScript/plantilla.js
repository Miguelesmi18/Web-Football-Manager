document.addEventListener("DOMContentLoaded", function() {

    const escudoMap = {
        'FC Barcelona':'../Imagenes/logoF/logo_fcb.png',
        'Real Madrid CF':'../Imagenes/logoF/logo_madrid.png',
        'Atlético de Madrid':'../Imagenes/logoF/logo_atmadrid.png',
        'Sevilla FC':'../Imagenes/logoF/logo_sevilla.png',
        'Real Sociedad':'../Imagenes/logoF/logo_sociedad.png',
        'Real Betis':'../Imagenes/logoF/logo_betis.png',
        'RCD Espanyol':'../Imagenes/logoF/logo_espanyol.png',
        'Valencia CF':'../Imagenes/logoF/logo_valencia.png',
        'SD Eibar':'../Imagenes/logoF/logo_eibar.png',
        'Granada CF':'../Imagenes/logoF/logo_granada.png',
        'Levante UD':'../Imagenes/logoF/logo_levante.png',
        'Athletic Club':'../Imagenes/logoF/logo_athleticclub.png',
        'Deportivo Abanca':'../Imagenes/logoF/logo_deportivo.png'
    };

    fetch("../JSON/jugadores.json")
    .then(function(response) {
        if(!response.ok) {
            console.error("No se puede acceder al archivo JSON")
        }
        return response.json();
    })
    .then(function(jugadores) {
        
        let root = document.getElementById("plantilla-root");

        for(let i=0; i<jugadores.length; i++) {
            let equipoDiv = document.createElement("div");
            equipoDiv.classList.add("equipo-fondo");

            let escudoDiv = document.createElement("div");
            escudoDiv.classList.add("escudo");

            let equipoImagen = document.createElement("img");
            equipoImagen.src =  escudoMap[jugadores[i].equip];
            equipoImagen.alt = "Imagen de: " + jugadores[i].equip;

            let nombreEquipo = document.createElement("p");
            nombreEquipo.textContent = jugadores[i].equip;

            let entrenadorDiv = document.createElement("div");
            entrenadorDiv.classList.add("entrenador");

            let entrenadorImagen = document.createElement("img");
            entrenadorImagen.src =  jugadores[i].entrenador.foto;
            entrenadorImagen.alt = "Imagen de: " + jugadores[i].entrenador.nomPersona;

            let nombreEntrenador = document.createElement("p");
            nombreEntrenador.textContent = jugadores[i].entrenador.nomPersona;

            let jugadorasDiv = document.createElement("div");
            jugadorasDiv.classList.add("jugadoras");

            equipoDiv.appendChild(escudoDiv);
            equipoDiv.appendChild(entrenadorDiv);
            equipoDiv.appendChild(jugadorasDiv);

            escudoDiv.appendChild(equipoImagen);
            escudoDiv.appendChild(nombreEquipo);

            entrenadorDiv.appendChild(entrenadorImagen);
            entrenadorDiv.appendChild(nombreEntrenador);

            for(let j = 0; j < jugadores[i].jugadors.length; j++) {
                let jugadoraDiv = document.createElement("div");
                jugadoraDiv.classList.add("jugadores");

                let jugadoraImagen = document.createElement("img");
                jugadoraImagen.src = jugadores[i].jugadors[j].foto;
                jugadoraImagen.alt = jugadores[i].jugadors[j].nomPersona;

                let infoDiv = document.createElement("div");
                infoDiv.classList.add("info");

                let nombreJugadora = document.createElement("p");
                nombreJugadora.textContent = jugadores[i].jugadors[j].dorsal + " --- " + jugadores[i].jugadors[j].nomPersona;
                nombreJugadora.classList.add("nombre");

                let infoJugadora = document.createElement("p");
                infoJugadora.textContent = jugadores[i].jugadors[j].posicio + " - " + jugadores[i].jugadors[j].qualitat;

                jugadoraDiv.appendChild(jugadoraImagen);
                jugadoraDiv.appendChild(infoDiv);

                infoDiv.appendChild(nombreJugadora);
                infoDiv.appendChild(infoJugadora);

                jugadorasDiv.appendChild(jugadoraDiv);
            }
            
            root.appendChild(equipoDiv);
        }
    })
    .catch(function(error) {
        console.error("Error al cargar el JSON:", error);
    })
})