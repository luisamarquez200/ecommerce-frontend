<script>
    import { onMount } from 'svelte';
    import { fetchProducts } from '../api.js';
    let products = [];

    onMount(async () => {
        products = await fetchProducts();
    });
</script>

<style>
    .product {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        margin: 10px;
        text-align: center;
    }
</style>

<h1 class="text-center text-3xl">Bienvenido a nuestra Tienda en Línea</h1>
<h2 class="text-2xl">Productos</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each products as product}
        <div class="product">
            <h3 class="text-xl">{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <button class="bg-blue-500 text-white py-2 px-4 rounded">Agregar al Carrito</button>
        </div>
    {/each}
</div>
