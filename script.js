const piezas = [

    {
        id: "octubre",
        nombre: "Octubre 2025",
        codigo: "Alfredo2cm",
        imagen: "images/octubre.jpg",
        posicion: 4
    },

    {
        id: "noviembre",
        nombre: "Noviembre 2025",
        codigo: "MarioVuelveYa",
        imagen: "images/noviembre.jpg",
        posicion: 5
    },

    {
        id: "diciembre",
        nombre: "Diciembre 2025",
        codigo: "BimbaYlola<3",
        imagen: "images/diciembre.jpg",
        posicion: 7
    },

    {
        id: "enero",
        nombre: "Enero 2026",
        codigo: "Hermenegilda4",
        imagen: "images/enero.jpg",
        posicion: 10
    },

    {
        id: "febrero",
        nombre: "Febrero 2026",
        codigo: "TuTontaTeAmo",
        imagen: "images/febrero.jpg",
        posicion: 12
    },

    {
        id: "marzo",
        nombre: "Marzo 2026",
        codigo: "SomosJIJI",
        imagen: "images/marzo.jpg",
        posicion: 1
    },

    {
        id: "abril",
        nombre: "Abril 2026",
        codigo: "EA777",
        imagen: "images/abril.jpg",
        posicion: 2
    },

    {
        id: "mayo",
        nombre: "Mayo 2026",
        codigo: "Rodolfo1",
        imagen: "images/mayo.jpg",
        posicion: 9
    },

    {
        id: "junio",
        nombre: "Junio 2026",
        codigo: "100CosasQueAmoDeTi",
        imagen: "images/junio.jpg",
        posicion: 11
    },

    {
        id: "julio",
        nombre: "Julio 2026",
        codigo: "QuesitoPremium",
        imagen: "images/julio.jpg",
        posicion: 8
    },

    {
        id: "agosto",
        nombre: "Agosto 2026",
        codigo: "FerranTorresCabron",
        imagen: "images/agosto.jpg",
        posicion: 6
    },

    {
        id: "septiembre",
        nombre: "Septiembre 2026",
        codigo: "EresLaMejorNovia",
        imagen: "images/septiembre.jpg",
        posicion: 3
    }

];


// =========================================
// VARIABLES
// =========================================

let desbloqueadas = JSON.parse(
    localStorage.getItem("piezasDesbloqueadas")
) || [];

let colocadas = JSON.parse(
    localStorage.getItem("piezasColocadas")
) || [];

let piezaSeleccionada = null;


// =========================================
// ELEMENTOS HTML
// =========================================

const codigoInput =
    document.getElementById("codigoInput");

const botonDesbloquear =
    document.getElementById("desbloquear");

const mensaje =
    document.getElementById("mensaje");

const piezasDisponibles =
    document.getElementById("piezasDisponibles");

const puzzle =
    document.getElementById("puzzle");


// =========================================
// VISOR
// =========================================

const visor =
    document.getElementById("visor");

const imagenGrande =
    document.getElementById("imagenGrande");

const cerrarVisor =
    document.getElementById("cerrarVisor");


// =========================================
// VISOR - ABRIR
// =========================================

function abrirVisor(pieza) {

    imagenGrande.src =
        pieza.imagen;

    imagenGrande.alt =
        pieza.nombre;

    visor.classList.add(
        "activo"
    );

}


// =========================================
// VISOR - CERRAR
// =========================================

function cerrarVisorFuncion() {

    visor.classList.remove(
        "activo"
    );

    imagenGrande.src = "";

}


// Botón SALIR

cerrarVisor.addEventListener(
    "click",
    cerrarVisorFuncion
);


// Cerrar haciendo clic fuera

visor.addEventListener(
    "click",
    event => {

        if (
            event.target === visor
        ) {

            cerrarVisorFuncion();

        }

    }
);


// =========================================
// CREAR PUZZLE
// =========================================

function crearPuzzle() {

    puzzle.innerHTML = "";

    for (
        let posicion = 1;
        posicion <= 12;
        posicion++
    ) {

        const casilla =
            document.createElement(
                "div"
            );

        casilla.classList.add(
            "casilla"
        );

        casilla.dataset.posicion =
            posicion;


        const piezaColocada =
            colocadas.find(
                piezaId => {

                    const pieza =
                        piezas.find(
                            p =>
                                p.id ===
                                piezaId
                        );

                    return pieza &&
                           pieza.posicion ===
                           posicion;

                }
            );


        if (piezaColocada) {

            const pieza =
                piezas.find(
                    p =>
                        p.id ===
                        piezaColocada
                );


            const imagen =
                document.createElement(
                    "img"
                );

            imagen.src =
                pieza.imagen;

            imagen.alt =
                pieza.nombre;

            casilla.appendChild(
                imagen
            );

            casilla.classList.add(
                "casilla-correcta"
            );

        }


        casilla.addEventListener(
            "click",
            () =>
                intentarColocar(
                    posicion
                )
        );


        puzzle.appendChild(
            casilla
        );

    }

}


// =========================================
// MOSTRAR PIEZAS DESBLOQUEADAS
// =========================================

function mostrarPiezasDisponibles() {

    piezasDisponibles.innerHTML =
        "";


    desbloqueadas.forEach(
        piezaId => {

            if (
                colocadas.includes(
                    piezaId
                )
            ) {

                return;

            }


            const pieza =
                piezas.find(
                    p =>
                        p.id ===
                        piezaId
                );


            if (!pieza) {

                return;

            }


            const imagen =
                document.createElement(
                    "img"
                );


            imagen.src =
                pieza.imagen;

            imagen.alt =
                pieza.nombre;

            imagen.title =
                pieza.nombre;

            imagen.classList.add(
                "pieza-disponible"
            );


            if (
                piezaSeleccionada ===
                pieza.id
            ) {

                imagen.classList.add(
                    "pieza-seleccionada"
                );

            }


            // Click normal =
            // seleccionar pieza

            imagen.addEventListener(
                "click",
                () => {

                    piezaSeleccionada =
                        pieza.id;

                    mostrarPiezasDisponibles();

                }
            );


            // Doble click =
            // foto grande

            imagen.addEventListener(
                "dblclick",
                () => {

                    abrirVisor(
                        pieza
                    );

                }
            );


            piezasDisponibles.appendChild(
                imagen
            );

        }
    );

}


// =========================================
// DESBLOQUEAR CÓDIGO
// =========================================

function desbloquearPieza() {

    const codigo =
        codigoInput.value.trim();


    if (!codigo) {

        mostrarMensaje(
            "Introduce un código.",
            false
        );

        return;

    }


    const pieza =
        piezas.find(
            p =>
                p.codigo.toLowerCase() ===
                codigo.toLowerCase()
        );


    if (!pieza) {

        mostrarMensaje(
            "Ese código no es correcto.",
            false
        );

        return;

    }


    // =====================================
    // YA ESTABA DESBLOQUEADA
    // =====================================

    if (
        desbloqueadas.includes(
            pieza.id
        )
    ) {

        mostrarMensaje(
            "Esta pieza ya estaba desbloqueada ❤️",
            true
        );

        codigoInput.value =
            "";

        abrirVisor(
            pieza
        );

        return;

    }


    // =====================================
    // GUARDAR DESBLOQUEO
    // =====================================

    desbloqueadas.push(
        pieza.id
    );


    localStorage.setItem(
        "piezasDesbloqueadas",
        JSON.stringify(
            desbloqueadas
        )
    );


    // Seleccionar automáticamente

    piezaSeleccionada =
        pieza.id;


    codigoInput.value =
        "";


    mostrarMensaje(
        `${pieza.nombre} desbloqueado ❤️`,
        true
    );


    mostrarPiezasDisponibles();


    // Mostrar foto grande

    abrirVisor(
        pieza
    );

}


// =========================================
// INTENTAR COLOCAR PIEZA
// =========================================

function intentarColocar(
    posicion
) {

    if (!piezaSeleccionada) {

        mostrarMensaje(
            "Primero selecciona una pieza.",
            false
        );

        return;

    }


    const pieza =
        piezas.find(
            p =>
                p.id ===
                piezaSeleccionada
        );


    if (!pieza) {

        return;

    }


    // =====================================
    // POSICIÓN INCORRECTA
    // =====================================

    if (
        pieza.posicion !==
        posicion
    ) {

        mostrarMensaje(
            "Todavía no... prueba otra casilla.",
            false
        );

        return;

    }


    // =====================================
    // POSICIÓN CORRECTA
    // =====================================

    colocadas.push(
        pieza.id
    );


    localStorage.setItem(
        "piezasColocadas",
        JSON.stringify(
            colocadas
        )
    );


    piezaSeleccionada =
        null;


    mostrarMensaje(
        "¡Encaja! ❤️",
        true
    );


    mostrarPiezasDisponibles();

    crearPuzzle();

    comprobarFinal();

}


// =========================================
// MENSAJES
// =========================================

function mostrarMensaje(
    texto,
    correcto
) {

    mensaje.textContent =
        texto;

    mensaje.className =
        correcto
            ? "mensaje-ok"
            : "mensaje-error";

}


// =========================================
// REGALO FINAL
// =========================================

const regaloFinal =
    document.getElementById(
        "regaloFinal"
    );

const abrirRegaloFinal =
    document.getElementById(
        "abrirRegaloFinal"
    );

const modalFinal =
    document.getElementById(
        "modalFinal"
    );

const cerrarFinal =
    document.getElementById(
        "cerrarFinal"
    );


// =========================================
// MOSTRAR BOTÓN REGALO
// =========================================

function mostrarBotonRegalo() {

    regaloFinal.classList.add(
        "visible"
    );

}


// =========================================
// ABRIR REGALO FINAL
// =========================================

function abrirFinal() {

    modalFinal.classList.add(
        "activo"
    );

}


// =========================================
// CERRAR REGALO FINAL
// =========================================

function cerrarFinalFuncion() {

    modalFinal.classList.remove(
        "activo"
    );

}


// =========================================
// COMPROBAR FINAL
// =========================================

function comprobarFinal() {

    if (
        colocadas.length !== 12
    ) {

        return;

    }


    mostrarMensaje(
        "Lo has conseguido. ❤️",
        true
    );


    mostrarBotonRegalo();


    // Abrir automáticamente
    // la primera vez que termina

    setTimeout(
        abrirFinal,
        800
    );

}


// =========================================
// BOTÓN REGALO
// =========================================

abrirRegaloFinal.addEventListener(
    "click",
    abrirFinal
);


cerrarFinal.addEventListener(
    "click",
    cerrarFinalFuncion
);


// Cerrar haciendo clic fuera

modalFinal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalFinal
        ) {

            cerrarFinalFuncion();

        }

    }
);


// =========================================
// CARTA
// =========================================

const abrirCarta =
    document.getElementById(
        "abrirCarta"
    );

const modalCarta =
    document.getElementById(
        "modalCarta"
    );

const cerrarCarta =
    document.getElementById(
        "cerrarCarta"
    );


// =========================================
// ABRIR CARTA
// =========================================

function abrirCartaFuncion() {

    modalCarta.classList.add(
        "activo"
    );

}


// =========================================
// CERRAR CARTA
// =========================================

function cerrarCartaFuncion() {

    modalCarta.classList.remove(
        "activo"
    );

}


// Botón LEER MI CARTA

abrirCarta.addEventListener(
    "click",
    abrirCartaFuncion
);


// Botón X

cerrarCarta.addEventListener(
    "click",
    cerrarCartaFuncion
);


// Cerrar haciendo clic fuera

modalCarta.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalCarta
        ) {

            cerrarCartaFuncion();

        }

    }
);


// =========================================
// ESCAPE
// =========================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            visor.classList.contains(
                "activo"
            )
        ) {

            cerrarVisorFuncion();

        }


        if (
            modalCarta.classList.contains(
                "activo"
            )
        ) {

            cerrarCartaFuncion();

        }


        if (
            modalFinal.classList.contains(
                "activo"
            )
        ) {

            cerrarFinalFuncion();

        }

    }
);


// =========================================
// CARGAR ESTADO INICIAL
// =========================================

crearPuzzle();

mostrarPiezasDisponibles();


// Si ya terminó anteriormente,
// mantener visible el regalo final.

if (
    colocadas.length === 12
) {

    mostrarBotonRegalo();

}