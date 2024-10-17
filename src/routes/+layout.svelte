<script>
    import { onMount } from 'svelte';
</script>

<style>
    nav {
        background-color: #333;
        color: white;
        padding: 1rem;
    }

    nav a {
        color: white;
        margin: 0 1rem;
        text-decoration: none;
    }

    nav a:hover {
        text-decoration: underline;
    }
</style>

<nav>
    <a href="/">Home</a>
    <a href="/products">Products</a>
    <a href="/orders">Orders</a>
</nav>

<slot /> <!-- Esto renderiza el contenido de las páginas secundarias -->