// ===============================
// CONSUMO DE API
// ===============================

document.addEventListener("DOMContentLoaded", async () => {

    try {//filtracion de errores

        const API = await axios.get(
            "https://dummyjson.com/products/category/groceries"
        );
        console.log(API.data);

        let info_productos = API.data.products

        let imagen_producto = info_productos[0].images
        document.getElementById("img1").src = imagen_producto



    } catch(error){

        console.error("Error al consumir API:", error);

    }


    // Iniciar carrusel de ofertas
    crearCarrusel(".ofertas", ".siguiente", ".preveio", 630);

});


// ===============================
// SLIDER DE IMAGENES
// ===============================

const slides = document.querySelectorAll(".slide");

let index = 0;


function mostrarSlide(i){

    slides.forEach(slide => {

        slide.classList.remove("active");

    });


    slides[i].classList.add("active");

}



document.querySelector(".next").onclick = () => {


    index++;


    if(index >= slides.length){

        index = 0;

    }


    mostrarSlide(index);


};



document.querySelector(".prev").onclick = () => {


    index--;


    if(index < 0){

        index = slides.length - 1;

    }


    mostrarSlide(index);


};



setInterval(() => {


    index++;


    if(index >= slides.length){

        index = 0;

    }


    mostrarSlide(index);


},3000);




// ===============================
// CARRUSEL DE PRODUCTOS
// ===============================


function crearCarrusel(selectorContenedor, selectorBtnSiguiente, selectorBtnAnterior, distancia){

    const contenedor = document.querySelector(selectorContenedor);
    const btnSiguiente = document.querySelector(selectorBtnSiguiente);
    const btnAnterior = document.querySelector(selectorBtnAnterior);

    if(!contenedor || !btnSiguiente || !btnAnterior){//verificar si hay diferentes botones (|| = O)
        console.error("No se encontró un elemento del carrusel");
        return;
    }

    btnSiguiente.addEventListener("click",()=>{

        contenedor.scrollBy({
            left: distancia,
            behavior:"smooth"
        });

    });

    btnAnterior.addEventListener("click",()=>{

        contenedor.scrollBy({
            left:-distancia,
            behavior:"smooth"//desplazamiento suave
        });
    });

    // Movimiento automático

    setInterval(()=>{

        if(
            contenedor.scrollLeft + contenedor.clientWidth 
            >= contenedor.scrollWidth
        ){
            contenedor.scrollTo({
                left:0,
                behavior:"smooth"
            });

        }else{

            contenedor.scrollBy({
                left:distancia,
                behavior:"smooth"
            });
        }

    },5000);

}
