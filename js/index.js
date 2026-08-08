// ===============================
// CONSUMO DE API
// ===============================

let info_productos = [];
let productos_mostrados;
let contenedorCard;

document.addEventListener("DOMContentLoaded", async () => {

    // Elementos del DOM
    productos_mostrados = document.getElementById("productosMostrados");
    contenedorCard = document.getElementById("ofertas");

    const buscador = document.getElementById("buscador");
    const btn_buscar = document.getElementById("btn_buscar");

    btn_buscar.addEventListener("click", buscarProducto);
    
    try {

        const API = await axios.get(
            "https://dummyjson.com/products/category/groceries"
        );

        console.log(API.data);

        // Guardamos los productos
        info_productos = API.data.products;

        // Iniciamos la aplicación
        iniciarAplicacion();

        // Mostrar primera imagen del slider
         

    } catch (error) {

        console.error("Error al consumir API:", error);

    }

    // Iniciar carrusel de ofertas
    crearCarrusel(
        ".ofertas",
        ".siguiente",
        ".preveio",
        630
    );

    // Iniciar slider de imágenes
    iniciarSlider();
});


// ===============================
// INICIAR APLICACIÓN
// ===============================

function iniciarAplicacion() {

    console.log(info_productos);

    // Mostrar las tarjetas
    mostrarCards(info_productos);
}


// ===============================
// SLIDER DE IMÁGENES
// ===============================

function iniciarSlider() {

    const slides = document.querySelectorAll(".slide");

    let index = 0;

    function mostrarSlide(i) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        if (slides.length > 0) {
            slides[i].classList.add("active");
        }
    }


    // Botón siguiente
    const btnNext = document.querySelector(".next");

    if (btnNext) {

        btnNext.onclick = () => {

            index++;

            if (index >= slides.length) {
                index = 0;
            }

            mostrarSlide(index);
        };
    }


    // Botón anterior
    const btnPrev = document.querySelector(".prev");

    if (btnPrev) {

        btnPrev.onclick = () => {

            index--;

            if (index < 0) {
                index = slides.length - 1;
            }

            mostrarSlide(index);
        };
    }


    // Movimiento automático
    if (slides.length > 0) {

        mostrarSlide(index);

        setInterval(() => {

            index++;

            if (index >= slides.length) {
                index = 0;
            }

            mostrarSlide(index);

        }, 3000);
    }
}


// ===============================
// CARRUSEL DE PRODUCTOS
// ===============================

function crearCarrusel(
    selectorContenedor,
    selectorBtnSiguiente,
    selectorBtnAnterior,
    distancia
) {

    const contenedor = document.querySelector(selectorContenedor);
    const btnSiguiente = document.querySelector(selectorBtnSiguiente);
    const btnAnterior = document.querySelector(selectorBtnAnterior);

    if (!contenedor || !btnSiguiente || !btnAnterior) {

        console.error("No se encontró un elemento del carrusel");

        return;
    }


    // Botón siguiente
    btnSiguiente.addEventListener("click", () => {

        contenedor.scrollBy({
            left: distancia,
            behavior: "smooth"
        });

    });


    // Botón anterior
    btnAnterior.addEventListener("click", () => {

        contenedor.scrollBy({
            left: -distancia,
            behavior: "smooth"
        });

    });


    // Movimiento automático
    setInterval(() => {

        if (
            contenedor.scrollLeft + contenedor.clientWidth
            >= contenedor.scrollWidth
        ) {

            contenedor.scrollTo({
                left: 0,
                behavior: "smooth"
            });

        } else {

            contenedor.scrollBy({
                left: distancia,
                behavior: "smooth"
            });

        }

    }, 5000);
}


// ===============================
// CREAR CARDS
// ===============================

function crearCards(producto) {

    const card = document.createElement("div");

    card.className = "oferta";


    // IMAGEN
    const imagen_producto = document.createElement("img");

    imagen_producto.src = producto.images[0];
    imagen_producto.alt = producto.title;


    // NOMBRE
    const nombre_producto = document.createElement("h3");

    nombre_producto.textContent = producto.title;


    // DESCRIPCIÓN
    const descripcion = document.createElement("p");

    descripcion.textContent = producto.description;


    // PRECIO
    const precio_producto = document.createElement("p");

    precio_producto.textContent = `$${producto.price}`;


    // BOTÓN
    const boton_compra = document.createElement("button");

    boton_compra.className = "detalles";
    boton_compra.textContent = "Ver Más";


    // EVENTO DEL BOTÓN
    boton_compra.addEventListener("click", () => {

        window.location.href = `producto.html?id=${producto.id}`;

    });


    // AGREGAR ELEMENTOS A LA CARD
    card.appendChild(imagen_producto);
    card.appendChild(nombre_producto);
    card.appendChild(descripcion);
    card.appendChild(precio_producto);
    card.appendChild(boton_compra);


    // AGREGAR CARD AL CONTENEDOR
    contenedorCard.appendChild(card);
}


// ===============================
// MOSTRAR CARDS
// ===============================

function mostrarCards(listaDatos) {

    // Vaciar el contenedor
    while (contenedorCard.firstChild) {

        contenedorCard.removeChild(
            contenedorCard.firstChild
        );

    }


    // Mostrar cantidad de productos
    productos_mostrados.textContent = listaDatos.length;


    // Crear una card por cada producto
    listaDatos.forEach(function(producto) {

        crearCards(producto);

    });
}

function buscarProducto() {

    const buscador = document.getElementById("buscador");

    const texto = buscador.value.trim().toLowerCase();


    if (texto === "") {

        Swal.fire({
            icon: "warning",
            title: "Escribe un producto",
            text: "Debes escribir algo para realizar la búsqueda."
        });

        return;
    }


    const productoEncontrado = info_productos.find(producto => {

        return producto.title
            .toLowerCase()
            .includes(texto);

    });


    if (productoEncontrado) {

        window.location.href =
            `producto.html?id=${productoEncontrado.id}`;

    } else {

        Swal.fire({
            icon: "error",
            title: "Producto no encontrado",
            text: `No encontramos ningún producto relacionado con "${texto}".`
        });

    }
}