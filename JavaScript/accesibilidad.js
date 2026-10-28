/* ===============================================
   ESTILOS LUPA REAL OPTICA
   =============================================== */
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-lupa');
    const lente = document.getElementById('lupa-lente');
    const zoomContent = document.getElementById('lupa-zoom-content');
    let activa = false;
    
    // Guardamos la última posición conocida del ratón
    let lastMouseX = 0;
    let lastMouseY = 0;

    const actualizarPosicion = (x_client, y_client) => {
        if (!activa) return;

        const zoom = 2; // El nivel de zoom
        const radioLente = 125; // La mitad del tamaño de tu lente (250 / 2)

        // 1. Posición absoluta en la página (incluyendo el scroll actual)
        const x_page = x_client + window.scrollX;
        const y_page = y_client + window.scrollY;

        // 2. Mover el círculo (la lente) - Posición fija en la pantalla
        lente.style.left = (x_client - radioLente) + 'px';
        lente.style.top = (y_client - radioLente) + 'px';

        // 3. Mover el contenido de dentro (el zoom)
        zoomContent.style.left = (-(x_page * zoom) + radioLente) + 'px';
        zoomContent.style.top = (-(y_page * zoom) + radioLente) + 'px';
    };

    btn.addEventListener('click', () => {
        activa = !activa;
        btn.classList.toggle('active');

        if (activa) {
            // AL ACTIVAR:
            // 1. Clonamos el contenido
            zoomContent.innerHTML = '';
            const clon = document.body.cloneNode(true);
            const btnClon = clon.querySelector('#btn-lupa');
            if (btnClon) btnClon.remove();
            clon.style.width = document.documentElement.offsetWidth + 'px';
            zoomContent.appendChild(clon);

            // 2. Mostramos la lente y cambiamos el botón
            lente.style.display = 'block';
            btn.innerHTML = '✕';
            
            // 3. Posicionamos inicialmente donde está el ratón YA
            actualizarPosicion(lastMouseX, lastMouseY);
        } else {
            // AL DESACTIVAR (Aquí está la corrección):
            // 1. Ocultamos la lente
            lente.style.display = 'none';
            btn.innerHTML = '🔍';
            
            // 2. ¡CORRECCIÓN! Mandamos la lente fuera de la pantalla de inmediato
            // para que no aparezca en la esquina o al lado del botón al reactivarla.
            lente.style.left = '-1000px';
            lente.style.top = '-1000px';

            // 3. Limpiamos el contenido clonado para liberar memoria
            zoomContent.innerHTML = '';
        }
    });

    // Registramos la posición del ratón constantemente
    document.addEventListener('mousemove', (e) => {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        if (activa) {
            actualizarPosicion(lastMouseX, lastMouseY);
        }
    });

    // Evento al usar la rueda (scroll)
    window.addEventListener('scroll', () => {
        if (activa) {
            actualizarPosicion(lastMouseX, lastMouseY);
        }
    }, { passive: true });
});

/* ===============================================
   CAMBIAR MODO NOCHE/DIA
   =============================================== */

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('contrast-toggle');
    const icon = btn.querySelector('.icon');
    const body = document.body;

    btn.addEventListener('click', () => {
        // Alternamos la clase de modo claro
        body.classList.toggle('light-mode');

        // Lógica de iconos:
        if (body.classList.contains('light-mode')) {
            // Si está en modo claro, mostramos la LUNA para volver a lo oscuro
            icon.textContent = '🌙'; 
            console.log("Cambiado a: Modo Claro (Página Blanca)");
        } else {
            // Si está en modo oscuro (por defecto), mostramos el SOL para aclarar
            icon.textContent = '☀️';
            console.log("Cambiado a: Modo Oscuro (Original)");
        }
    });
});

/* ===============================================
   MODO LECTURA
   =============================================== */

const ReadingMode = {
    config: {
        wordThreshold: 400, // Palabras mínimas para auto-activación
        selector: 'article, .main-content, #content, main' // Posibles contenedores
    },

    init() {
        this.body = document.body;
        this.content = document.querySelector(this.config.selector);
        
        if (!this.content) return;

        this.createButton();
        this.checkPersistence();
        this.autoDetect();
    },

    autoDetect() {
        const textLength = this.content.innerText.split(/\s+/).length;
        // Si es un artículo largo y nunca ha cerrado el modo lectura
        if (textLength > this.config.wordThreshold && !localStorage.getItem('rm-dismissed')) {
            console.log("Lectura larga detectada. Optimizando...");
            // Opcional: Podrías activarlo solo o mostrar un aviso
        }
    },

    toggle() {
        const isActive = this.body.classList.toggle('reading-mode-active');
        localStorage.setItem('reading-mode', isActive ? 'enabled' : 'disabled');
        
        // Ajuste de scroll para no perder el hilo
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Actualizar icono del botón
        const btn = document.getElementById('rm-btn');
        btn.innerHTML = isActive ? '✕ Cerrar' : '📖 Modo Lectura';
    },

    checkPersistence() {
        if (localStorage.getItem('reading-mode') === 'enabled') {
            this.body.classList.add('reading-mode-active');
        }
    },

    createButton() {
        const btn = document.createElement('button');
        btn.id = 'rm-btn';
        btn.innerHTML = this.body.classList.contains('reading-mode-active') ? '✕ Cerrar' : '📖 Modo Lectura';
        btn.style = `
            position: fixed; bottom: 25px; right: 25px; z-index: 9999;
            padding: 14px 24px; background: #2c3e50; color: white;
            border: none; border-radius: 12px; cursor: pointer;
            font-weight: bold; font-family: sans-serif;
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        `;
        btn.onclick = () => this.toggle();
        this.body.appendChild(btn);
    }
};

// Iniciar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => ReadingMode.init());