<script>
    import { goto } from '$app/navigation';

    // Función para redirigir al registro
    const goToRegister = () => {
        goto('/register');
    };
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
        background-color: #f5f5f5;
        min-height: 100vh;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: #333;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        color: #666;
    }

    .products {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .product-card {
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        width: 200px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .product-card img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }

    .cta-button {
        padding: 0.75rem 1.5rem;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 2rem;
    }

    .cta-button:hover {
        background-color: #555;
    }

    @media (max-width: 600px) {
        h1 {
            font-size: 2rem;
        }
        p {
            font-size: 1rem;
        }
        .products {
            flex-direction: column;
        }
        .product-card {
            width: 90%;
        }
    }
</style>

<div class="container">
    <h1>Bienvenido a Nuestro E-Commerce</h1>
    <p>Compra los mejores productos a precios increíbles. ¡Regístrate para comenzar!</p>
    
    <!-- Lista de productos populares (sólo ejemplos) -->
    <div class="products">
        <div class="product-card">
            <img src="/images/product1.jpg" alt="Producto 1" />
            <h2>Producto 1</h2>
            <p>$19.99</p>
        </div>
        <div class="product-card">
            <img src="/images/product1.jpg" alt="Producto 2" />
            <h2>Producto 2</h2>
            <p>$29.99</p>
        </div>
        <div class="product-card">
            <img src="/images/product1.jpg" alt="Producto 3" />
            <h2>Producto 3</h2>
            <p>$39.99</p>
        </div>
    </div>

    <!-- Botón de redirección al registro -->
    <button class="cta-button" on:click={goToRegister}>Regístrate Ahora</button>
</div>
