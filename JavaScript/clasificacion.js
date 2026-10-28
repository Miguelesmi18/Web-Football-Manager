var tablaBody = document.getElementById("tabla");
var mejorContainer = document.getElementById("mejorejg");

// ---------- CLASIFICACIÓN ----------

function crearEquipoStats(nombre, escudo) {
    return { nombre: nombre, escudo: escudo, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 };
}

fetch("../json/FM_partits_fem.json")
    .then(function (response) { return response.json(); })
    .then(function (partidos) {

        var equipos = {};

        for (var i = 0; i < partidos.length; i++) {
            var partido = partidos[i];
            var local = partido.equip_local;
            var visitante = partido.equip_visitant;

            if (!equipos[local.nom]) equipos[local.nom] = crearEquipoStats(local.nom, local.escut);
            if (!equipos[visitante.nom]) equipos[visitante.nom] = crearEquipoStats(visitante.nom, visitante.escut);

            var goles = partido.resultat.split("-");
            var golesLocal = parseInt(goles[0], 10);
            var golesVisitante = parseInt(goles[1], 10);

            var eqLocal = equipos[local.nom];
            var eqVisitante = equipos[visitante.nom];

            eqLocal.pj++;
            eqVisitante.pj++;
            eqLocal.gf += golesLocal;
            eqLocal.gc += golesVisitante;
            eqVisitante.gf += golesVisitante;
            eqVisitante.gc += golesLocal;

            if (golesLocal > golesVisitante) {
                eqLocal.pg++; eqLocal.pts += 3; eqVisitante.pp++;
            } else if (golesLocal < golesVisitante) {
                eqVisitante.pg++; eqVisitante.pts += 3; eqLocal.pp++;
            } else {
                eqLocal.pe++; eqVisitante.pe++; eqLocal.pts += 1; eqVisitante.pts += 1;
            }
        }

        var listaEquipos = Object.values(equipos);

        listaEquipos.sort(function (a, b) {
            if (b.pts !== a.pts) return b.pts - a.pts;
            return (b.gf - b.gc) - (a.gf - a.gc);
        });

        for (var j = 0; j < listaEquipos.length; j++) {
            var equipo = listaEquipos[j];

            var fila = document.createElement("tr");

            var tdPos = document.createElement("td");
            tdPos.classList.add("pos");
            tdPos.textContent = j + 1;

            var tdEquipo = document.createElement("td");
            tdEquipo.classList.add("equipo");
            var imgEscudo = document.createElement("img");
            imgEscudo.classList.add("escudo");
            imgEscudo.src = equipo.escudo;
            var spanNombre = document.createElement("span");
            spanNombre.textContent = equipo.nombre;
            tdEquipo.appendChild(imgEscudo);
            tdEquipo.appendChild(spanNombre);

            var tdPJ = document.createElement("td");
            tdPJ.textContent = equipo.pj;

            var tdPG = document.createElement("td");
            tdPG.textContent = equipo.pg;

            var tdPE = document.createElement("td");
            tdPE.textContent = equipo.pe;

            var tdPP = document.createElement("td");
            tdPP.textContent = equipo.pp;

            var tdGF = document.createElement("td");
            tdGF.textContent = equipo.gf;

            var tdGC = document.createElement("td");
            tdGC.textContent = equipo.gc;

            var tdPTS = document.createElement("td");
            tdPTS.textContent = equipo.pts;

            fila.appendChild(tdPos);
            fila.appendChild(tdEquipo);
            fila.appendChild(tdPJ);
            fila.appendChild(tdPG);
            fila.appendChild(tdPE);
            fila.appendChild(tdPP);
            fila.appendChild(tdGF);
            fila.appendChild(tdGC);
            fila.appendChild(tdPTS);

            tablaBody.appendChild(fila);
        }
    })
    .catch(function (error) {
        console.error("Error cargando clasificación:", error);
    });


// ---------- MEJORES JUGADORAS ----------

fetch("../json/jugadores.json")
    .then(function (response) { return response.json(); })
    .then(function (equipos) {

        var todasJugadoras = [];

        for (var i = 0; i < equipos.length; i++) {
            var equipo = equipos[i];

            for (var j = 0; j < equipo.jugadors.length; j++) {
                var jugadora = equipo.jugadors[j];

                todasJugadoras.push({
                    foto: jugadora.foto,
                    nombre: jugadora.nomPersona,
                    posicion: jugadora.posicio,
                    calidad: jugadora.qualitat,
                    equipoNom: equipo.equip
                });
            }
        }

        todasJugadoras.sort(function (a, b) {
            return b.calidad - a.calidad;
        });

        var top = todasJugadoras.slice(0, 6);

        for (var k = 0; k < top.length; k++) {
            var j = top[k];

            var divJugadora = document.createElement("div");
            divJugadora.classList.add("jugadora");

            var imgFoto = document.createElement("img");
            imgFoto.classList.add("foto-jugadora");
            imgFoto.src = j.foto;

            var nombre = document.createElement("h3");
            nombre.textContent = j.nombre;

            var posicionEquipo = document.createElement("p");
            posicionEquipo.textContent = j.posicion + " · " + j.equipoNom;

            var calidad = document.createElement("p");
            calidad.textContent = "Calidad: " + j.calidad;

            divJugadora.appendChild(imgFoto);
            divJugadora.appendChild(nombre);
            divJugadora.appendChild(posicionEquipo);
            divJugadora.appendChild(calidad);

            mejorContainer.appendChild(divJugadora);
        }
    })
    .catch(function (error) {
        console.error("Error cargando jugadoras:", error);
    });