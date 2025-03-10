'use client';
import { useEffect, useState } from 'react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdate = async (orderId) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error('Failed to update order');
      const updatedOrders = orders.map((order) =>
        order.order_id === orderId ? { ...order, ...editData } : order
      );
      setOrders(updatedOrders);
      setIsEditing(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDelete = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete order');
      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setEditData({ ...order }); // Pre-fill with current data
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedOrder(null);
    setIsEditing(false);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Orders</h1>
      <table className="table-auto w-full border-collapse">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Order Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Total Amount</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id} className="border-b">
              <td className="p-2">{order.order_id}</td>
              <td className="p-2">{order.customer_name}</td>
              <td className="p-2">{order.customer_email}</td>
              <td className="p-2">{new Date(order.order_date).toLocaleString()}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">${order.total_amount}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleView(order)}
                  className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(order)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(order.order_id)}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Order Details - Order #{selectedOrder.order_id}
            </h2>
            {isEditing ? (
              <div className="space-y-4">
                <p>
                  <strong>Customer:</strong>
                  <input
                    name="customer_name"
                    value={editData.customer_name || ''}
                    onChange={handleEditChange}
                    className="border p-2 w-full"
                  />
                </p>
                <p>
                  <strong>Email:</strong>
                  <input
                    name="customer_email"
                    value={editData.customer_email || ''}
                    onChange={handleEditChange}
                    className="border p-2 w-full"
                  />
                </p>
                <p>
                  <strong>Status:</strong>
                  <select
                    name="status"
                    value={editData.status || ''}
                    onChange={handleEditChange}
                    className="border p-2 w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </p>
                <p>
                  <strong>Total Amount:</strong>
                  <input
                    name="total_amount"
                    type="number"
                    value={editData.total_amount || ''}
                    onChange={handleEditChange}
                    className="border p-2 w-full"
                  />
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p>
                  <strong>Customer:</strong> {selectedOrder.customer_name} (
                  {selectedOrder.customer_email})
                </p>
                <p>
                  <strong>Order Date:</strong>{' '}
                  {new Date(selectedOrder.order_date).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Total Amount:</strong> ${selectedOrder.total_amount}
                </p>
              </div>
            )}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => handleUpdate(selectedOrder.order_id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => handleDelete(selectedOrder.order_id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

