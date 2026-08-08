document.addEventListener("DOMContentLoaded", async () => {

    const parametros = new URLSearchParams(window.location.search);

    const id = parametros.get("id");

    try {

        const respuesta = await axios.get(
            `https://dummyjson.com/products/${id}`
        );

        const producto = respuesta.data;

        mostrarProducto(producto);

    } catch (error) {

        console.error("Error al obtener el producto:", error);

    }

});

function mostrarProducto(producto) {

    const contenedor = document.getElementById("detalleProducto");

    contenedor.innerHTML = `
        <img 
            src="${producto.images[0]}" 
            alt="${producto.title}"
        >


        <h1>${producto.title}</h1>

        <p>${producto.description}</p>

        <p>Precio: $${producto.price}</p>

        <p>Categoría: ${producto.category}</p>

        <p>Stock: ${producto.stock}</p>

        <p>Rating: ⭐ ${producto.rating}</p>

        <p>Marca: ${producto.brand ?? "Sin marca"}</p>

        <button>Comprar</button>
    `;
}