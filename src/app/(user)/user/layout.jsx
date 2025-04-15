import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/6 bg-white">
        <p>Users Profile</p>
        <ul>
          <li>
            <Link href="/user/order">Profile</Link>
          </li>
          <li>
            <Link href="/user/return">Orders</Link>
          </li>
        </ul>
        <Link href="/login">Logout</Link>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
