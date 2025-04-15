"use client";
import { useEffect, useState } from "react";

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("/api/returns")
      .then((res) => res.json())
      .then((data) => {
        setReturns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch returns", err);
        setLoading(false);
      });
  }, []);

  const filteredReturns = returns.filter((item) =>
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.order_id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReturns.length / itemsPerPage);
  const paginatedData = filteredReturns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Return Requests</h1>

      <input
        type="text"
        placeholder="Search by email or order ID..."
        className="mb-4 p-2 border border-gray-300 rounded-md w-full sm:w-1/3"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredReturns.length === 0 ? (
        <p>No return requests found.</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{item.order_id}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.reason}</td>
                    <td className="p-3">{new Date(item.created_at).toLocaleString()}</td>
                    <td className="p-3">
                      <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs font-medium">
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredReturns.length)}–
              {Math.min(currentPage * itemsPerPage, filteredReturns.length)} of {filteredReturns.length}
            </p>
            <div className="space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
