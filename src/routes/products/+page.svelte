<script context="module">
    import { fetchProducts, fetchOrders } from '../../api';

    export async function load() {
        try {
            const products = await fetchProducts();
            const orders = await fetchOrders();
            return { props: { products, orders } };
        } catch (error) {
            console.error('Error loading products or orders:', error);
            return { props: { products: [], orders: [] } }; // Manejo de errores
        }
    }
</script>

<script>
    import { createProduct, updateProduct, deleteProduct } from '../../api';

    export let products = [];
    
    let name = '';
    let price = '';
    let quantity = '';
    let editingProductId = null;

    const handleSubmit = async () => {
        if (editingProductId) {
            // Actualizar producto existente
            try {
                await updateProduct(editingProductId, { name, price, quantity });
                products = await fetchProducts(); // Recargar productos
                resetForm();
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            // Crear nuevo producto
            try {
                await createProduct({ name, price, quantity });
                products = await fetchProducts(); // Recargar productos
                resetForm();
            } catch (error) {
                console.error('Error creating product:', error);
            }
        }
    };

    const handleEdit = (product) => {
        name = product.name;
        price = product.price;
        quantity = product.quantity;
        editingProductId = product.id;
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            products = products.filter(product => product.id !== id);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const resetForm = () => {
        name = '';
        price = '';
        quantity = '';
        editingProductId = null;
    };
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        max-width: 400px; /* Ajusta el tamaño del formulario */
        margin: auto; /* Centra el formulario */
        padding: 2rem; /* Espaciado interno */
        border: 1px solid #ccc; /* Borde */
        border-radius: 8px; /* Esquinas redondeadas */
        background-color: #f9f9f9; /* Color de fondo */
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra */
    }
     h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: #333;
        text-align: center;
    }
    input {
        margin-bottom: 1rem; /* Espacio entre los campos */
        padding: 0.5rem; /* Espaciado interno */
        border: 1px solid #ccc; /* Borde */
        border-radius: 4px; /* Esquinas redondeadas */
        font-size: 1rem; /* Tamaño de fuente */
    }
    button {
        padding: 0.5rem; /* Espaciado interno */
        background-color: #333; /* Color de fondo */
        color: white; /* Color del texto */
        border: none; /* Sin borde */
        border-radius: 4px; /* Esquinas redondeadas */
        cursor: pointer; /* Cursor de mano */
        font-size: 1rem; /* Tamaño de fuente */
    }
    button:hover {
        background-color: #555; /* Color de fondo al pasar el mouse */
    }
    h2 {
        text-align: center; /* Centrar título */
    }
    ul {
        list-style-type: none; /* Eliminar viñetas de la lista */
        padding: 0; /* Sin espaciado interno */
    }
    li {
        margin: 0.5rem 0; /* Espacio entre productos */
        display: flex;
        justify-content: space-between; /* Distribuir contenido */
        align-items: center; /* Centrar verticalmente */
    }
    @media (max-width: 600px) {
        form {
            width: 90%; /* Anchura máxima en dispositivos pequeños */
        }
    }
</style>

<h1>Gestión de Productos</h1>
<form on:submit|preventDefault={handleSubmit}>
    <input bind:value={name} placeholder="Nombre del producto" required />
    <input type="number" bind:value={price} placeholder="Precio del producto" required min="0" />
    <input type="number" bind:value={quantity} placeholder="Cantidad" required min="1" />
    <button type="submit">{editingProductId ? 'Actualizar Producto' : 'Crear Producto'}</button>
</form>

<h2>Lista de Productos</h2>
{#if products.length === 0}
    <p>No hay productos disponibles.</p>
{:else}
    <ul>
        {#each products as product}
            <li>
                {product.name} - ${product.price} - Cantidad: {product.quantity}
                <div>
                    <button on:click={() => handleEdit(product)}>Editar</button>
                    <button on:click={() => handleDelete(product.id)}>Eliminar</button>
                </div>
            </li>
        {/each}
    </ul>
{/if}
