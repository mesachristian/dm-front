const products = [
    { id: 'aB3dEfGh1I', name: 'Product 1', type: 'TELEGRAM' },
    { id: 'jK4LmNoP2Q', name: 'Product 2', type: 'DISCORD' },
    { id: 'rS5tUvWx3Y', name: 'Product 3', type: 'TELEGRAM' },
    { id: 'zA6bCdEf4G', name: 'Product 4', type: 'DISCORD' },
    { id: 'hI7jKlMn5O', name: 'Product 5', type: 'TELEGRAM' },
    { id: 'pQ8rStUv6W', name: 'Product 6', type: 'DISCORD' },
    { id: 'xY9zAbCd7E', name: 'Product 7', type: 'TELEGRAM' },
    { id: 'fG0hIjKl8M', name: 'Product 8', type: 'DISCORD' },
    { id: 'nO1pQrSt9U', name: 'Product 9', type: 'TELEGRAM' },
    { id: 'vW2xYzAb0C', name: 'Product 10', type: 'DISCORD' },
    { id: 'dE3fGhIj1K', name: 'Product 11', type: 'TELEGRAM' },
    { id: 'lM4nOpQr2S', name: 'Product 12', type: 'DISCORD' },
    { id: 'tU5vWxYz3A', name: 'Product 13', type: 'TELEGRAM' },
    { id: 'bC6dEfGh4I', name: 'Product 14', type: 'DISCORD' },
    { id: 'jK7lMnOp5Q', name: 'Product 15', type: 'TELEGRAM' },
    { id: 'rS8tUvWx6Y', name: 'Product 16', type: 'DISCORD' },
    { id: 'zA9bCdEf7G', name: 'Product 17', type: 'TELEGRAM' },
    { id: 'hI0jKlMn8O', name: 'Product 18', type: 'DISCORD' },
    { id: 'pQ1rStUv9W', name: 'Product 19', type: 'TELEGRAM' },
    { id: 'xY2zAbCd0E', name: 'Product 20', type: 'DISCORD' }
];


export const getProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return products;
}

export const createProduct = async() => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    products.push({ id: 'xY2zAbCd0E', name: 'Product 20', type: 'DISCORD' });
}