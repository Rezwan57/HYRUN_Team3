'use client'; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            fetch("/api/products")
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res.json();
                })
                .then(data => setProducts(data))
                .catch(error => {
                    console.error("Error fetching products:", error);
                    setError("Failed to fetch products.");
                });
        }
    }, [router.isReady]);

    const handleEditProduct = (id) => {
        if (router.isReady) {
            router.push(`/admin/products/edit/${id}`);
        }
    };

    const handleDeleteProduct = (id) => {
        fetch(`/api/products/${id}`, { method: "DELETE" })
            .then(response => {
                if (!response.ok) throw new Error(`Failed to delete the product: ${response.statusText}`);
                return response.json();
            })
            .then(() => {
                alert("Product deleted successfully");
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error("Error deleting product:", error);
                setError("Failed to delete product.");
            });
    };

    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-products-page">
            <h1>Admin: Manage Products</h1>
            {products.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>£{product.price}</td>
                                <td>
                                    <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default AdminProductsPage;
