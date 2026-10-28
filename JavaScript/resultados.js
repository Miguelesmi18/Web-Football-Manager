async function CargarPartits() {

    const respuesta = await fetch('../JSON/FM_partits_fem.json');
    const partidos = await respuesta.json();

    const contenidor = document.getElementById("lista-partidos");
    contenidor.innerHTML = "";

    partidos.forEach(partido => {

        const data = new Date(partido.data);

        const dataFormatada =
            data.toLocaleDateString() + " " +
            data.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

        const html = `
            <div class="partido">

                <div class="equip">
                    <img src="${partido.equip_local.escut || '../Imagenes/logo_equip/default.png'}">
                    <span>${partido.equip_local.nom}</span>
                </div>

                <div>
                    <div class="resultado">${partido.resultat}</div>
                    <div class="data">${dataFormatada}</div>
                </div>

                <div class="equip" style="justify-content:flex-end">
                    <span>${partido.equip_visitant.nom}</span>
                    <img src="${partido.equip_visitant.escut || '../Imagenes/logo_equip/default.png'}">
                </div>

            </div>
        `;

        contenidor.innerHTML += html;
    });
}

CargarPartits();