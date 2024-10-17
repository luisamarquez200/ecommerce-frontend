const API_URL = 'http://localhost:4000/api'; // Cambia esto si es necesario

// api.js
export const fetchProducts = async () => {
    const response = await fetch('http://localhost:4000/api/products');
    if (!response.ok) {
        throw new Error('Error al cargar productos');
    }
    return response.json(); // Asegúrate de que esto coincida con la estructura de tu respuesta
};


// Función para crear un nuevo producto
export const createProduct = async (product) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Error al crear el producto');
    }
    return await response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorText = await response.text(); // Obtener la respuesta como texto
        console.error('Error deleting product:', errorText);
        throw new Error('Error deleting product');
    }

    // Si la respuesta es 204 (No Content), no intenta convertir a JSON
    if (response.status === 204) {
        return; // Solo retornamos si la respuesta es exitosa sin contenido
    }

    return response.json(); 
};


export const updateProduct = async (id, updatedData) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al actualizar el producto: ${errorData.message || 'Error desconocido'}`);
    }
};

// Función para obtener todas las órdenes
export const fetchOrders = async () => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) {
        throw new Error('Error al cargar órdenes');
    }
    return await response.json();
};

// Función para crear una nueva orden
export const createOrder = async (order) => {
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Error al crear la orden');
    }
    return await response.json();
};

// Función para actualizar una orden
export const updateOrder = async (id, order) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });
    if (!response.ok) {
        throw new Error('Error al actualizar la orden');
    }
    return await response.json();
};

// Función para eliminar una orden
export const deleteOrder = async (id) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorText = await response.text(); // Obtener la respuesta como texto
        console.error('Error deleting orders:', errorText);
        throw new Error('Error deleting orders');
    }

    // Si la respuesta es 204 (No Content), no intenta convertir a JSON
    if (response.status === 204) {
        return; // Solo retornamos si la respuesta es exitosa sin contenido
    }

    return response.json(); 
};

