<script>
    import { onMount } from 'svelte';
    import { fetchOrders, fetchProducts, createOrder, deleteOrder, updateOrder } from '../../api'; // Asegúrate de que la ruta sea correcta

    let orders = [];
    let products = [];
    let productId = '';
    let quantity = '';
    let editingOrder = null; // Estado para la orden que se está editando
    let errorMessage = ''; // Mensaje de error para mostrar validaciones

    // Función para cargar órdenes
    const loadOrders = async () => {
        try {
            const ordersData = await fetchOrders();
            orders = ordersData;
        } catch (error) {
            console.error('Error al cargar órdenes:', error);
        }
    };

    // Función para cargar productos
    const loadProducts = async () => {
        try {
            const productsData = await fetchProducts();
            products = productsData;
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    const handleSubmit = async () => {
        // Validar si se ha seleccionado un producto
        if (!productId || !quantity) {
            errorMessage = 'Por favor selecciona un producto y cantidad válida.';
            return;
        }

        // Buscar el producto seleccionado para verificar el inventario
        const selectedProduct = products.find(product => product.id === productId);
        if (!selectedProduct) {
            errorMessage = 'El producto seleccionado no existe.';
            return;
        }

        // Verificar si la cantidad es válida
        if (quantity > selectedProduct.quantity) {
            errorMessage = `Solo hay ${selectedProduct.quantity} unidades disponibles de ${selectedProduct.name}.`;
            return;
        }

        try {
            // Si se está editando una orden
            if (editingOrder) {
                await updateOrder(editingOrder.id, { productId, quantity });
            } else {
                // Crear nueva orden si la cantidad es válida
                await createOrder({ productId, quantity });
            }
            loadOrders(); // Volver a cargar las órdenes
            resetForm();
            errorMessage = ''; // Limpiar mensaje de error si todo salió bien
        } catch (error) {
            console.error('Error al crear/editar la orden:', error);
        }
    };

    const resetForm = () => {
        productId = '';
        quantity = '';
        editingOrder = null; // Resetear el estado de edición
        errorMessage = ''; // Limpiar el mensaje de error
    };

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id);
            loadOrders(); // Vuelve a cargar las órdenes
        } catch (error) {
            console.error('Error al eliminar la orden:', error);
        }
    };

    const handleEdit = (order) => {
        productId = order.productId; // Cargar datos de la orden a editar
        quantity = order.quantity;
        editingOrder = order; // Establecer la orden que se va a editar
    };

    // Carga inicial de órdenes y productos
    onMount(async () => {
        await Promise.all([loadOrders(), loadProducts()]);
    });
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: auto;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
     h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: #333;
        text-align: center;
    }
    select, input {
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }
    button {
        padding: 0.5rem;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }
    button:hover {
        background-color: #555;
    }
    h2 {
        text-align: center;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        margin: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .error-message {
        color: red;
        margin-bottom: 1rem;
        font-weight: bold;
    }
    @media (max-width: 600px) {
        form {
            width: 90%;
        }
    }
</style>

<h1>Gestión de Órdenes</h1>

<form on:submit|preventDefault={handleSubmit}>
    {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
    {/if}
    
    <select bind:value={productId} required>
        <option value="" disabled>Selecciona un producto</option>
        {#each products as product}
            <option value={product.id}>
                {product.name} - ${product.price ? product.price.toFixed(2) : 'N/A'} (Disponible: {product.quantity})
            </option>
        {/each}
    </select>

    <input type="number" bind:value={quantity} placeholder="Cantidad" required min="1" />
    <button type="submit">{editingOrder ? 'Actualizar Orden' : 'Crear Orden'}</button>
</form>

<h2>Lista de Órdenes</h2>
{#if orders.length === 0}
    <p>No hay órdenes disponibles.</p>
{:else}
    <ul>
        {#each orders as order}
            <li>
                Orden ID: {order.id} - 
                Producto ID: {order.productId} - 
                Cantidad: {order.quantity ? order.quantity : 'N/A'}
                <div>
                    <button on:click={() => handleEdit(order)}>Editar</button>
                    <button on:click={() => handleDelete(order.id)}>Eliminar</button>
                </div>
            </li>
        {/each}
    </ul>
{/if}
