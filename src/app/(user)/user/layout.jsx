import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/6 bg-white shadow-lg p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-700">User Profile</h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/user"
              className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/user/order"
              className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/user/returns"
              className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
            >
              Returns
            </Link>
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="/login"
            className="block px-4 py-2 rounded-lg bg-red-500 text-white text-center hover:bg-red-600 transition"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 shadow-inner">{children}</main>
    </div>
  );
}
