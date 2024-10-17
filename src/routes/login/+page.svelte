<script>
    import { goto } from '$app/navigation'; // Para redirigir
    let email = '';
    let password = '';
    let successMessage = '';
    let errorMessage = '';

    const handleLogin = async () => {
        // Validar que el email y la contraseña no estén vacíos
        if (!email || !password) {
            errorMessage = 'Por favor, complete todos los campos.';
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
                setTimeout(() => {
                    goto('/products'); // Redirigir a la página de productos después de 2 segundos
                }, 2000);
            } else {
                const errorData = await response.json();
                errorMessage = errorData.message || 'Error en el inicio de sesión.';
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            errorMessage = 'Error en el inicio de sesión.';
        }
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
    .message {
        margin: 1rem 0; /* Espacio alrededor de los mensajes */
        color: green; /* Color del mensaje de éxito */
    }
    .error {
        color: red; /* Color del mensaje de error */
    }
    @media (max-width: 600px) {
        form {
            width: 90%; /* Anchura máxima en dispositivos pequeños */
        }
    }
</style>

<h1>Iniciar Sesión</h1>
<form on:submit|preventDefault={handleLogin}>
    <input type="email" placeholder="Email" bind:value={email} required />
    <input type="password" placeholder="Contraseña" bind:value={password} required />
    <button type="submit">Iniciar Sesión</button>
</form>

{#if successMessage}
    <div class="message">{successMessage}</div>
{/if}
{#if errorMessage}
    <div class="error">{errorMessage}</div>
{/if}
