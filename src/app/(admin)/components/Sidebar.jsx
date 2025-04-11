'use client';
import Link from "next/link";
import React, { useState } from "react";
import { FaHome, FaShoppingCart, FaBoxOpen, FaEnvelope, FaUsers, FaEdit, FaPhoneAlt,FaChevronRight, FaChevronDown  } from "react-icons/fa";
import { motion } from "framer-motion";

const adminLinks = [
  { id: 1, name: "Dashboard", link: "/admin", icon: <FaHome /> },
  { id: 2, name: "Orders", link: "/admin/orders", icon: <FaShoppingCart /> },
  { id: 3, name: "Products", link: "/admin/products", icon: <FaBoxOpen /> },
  { id: 4, name: "Messages", link: "/admin/add-messages", icon: <FaEnvelope /> },
  { id: 5, name: "Users", link: "/admin/users", icon: <FaUsers /> },
];

const editLinks = [
  { id: 1, name: "Homepage Edit", link: "/admin/edit/homepage", icon: <FaEdit /> },
  { id: 2, name: "Contact Edit", link: "/admin/edit/contact", icon: <FaPhoneAlt /> },
];

function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <aside className="bg-neutral-200 font-admin fixed xl:sticky flex flex-col h-[100vh] w-1/6 top-0 left-0 bottom-0 backdrop-blur-3xl bg-opacity-70 border-neutral-800 z-10 transition-width duration-300 gap-5 px-4 py-6">
      <h1 className="">Admin Panel</h1>

      <div className="flex flex-col gap-2 h-full w-full">
        {adminLinks.map((link) => (
          <Link
            href={link.link}
            key={link.id}
            className="hover:text-yellow-600 rounded-md p-2 flex items-center"
          >
            {link.icon}
            <span className="ml-2">{link.name}</span>
          </Link>
        ))}

        <div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex justify-between items-center hover:text-yellow-600 rounded-md p-2 w-full text-left"
          >
            <p>Edit Page</p>
            {isDropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col pl-3"
            >
              {editLinks.map((link) => (
                <Link
                  href={link.link}
                  key={link.id}
                  className="hover:text-yellow-600 p-2 flex items-center"
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

