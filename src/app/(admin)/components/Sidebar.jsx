'use client';
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa6";
import { motion } from "framer-motion";

const adminLinks = [
  { id: 1, name: "Dashboard", link: "/admin" },
  { id: 2, name: "Products", link: "/admin/add-product" },
  { id: 3, name: "Messages", link: "/admin/add-messages"} // make sure it is correct//
 
];

const editLinks = [
  { id: 1, name: "Homepage Edit", link: "/admin/edit/homepage" },
  { id: 2, name: "Contact Edit", link: "/admin/edit/contact" },
  { id: 3, name: "More Important", link: "/admin/edit/important" },
];

function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <aside className=" bottom-0 p-4 flex flex-col justify-between flex-shrink-0 gap-10 w-1/6 h-screen bg-neutral-100">
      <h1>Admin Panel</h1>

      <div className="flex flex-col gap-2 h-full w-full">
        {adminLinks.map((link) => (
          <Link
            href={link.link}
            key={link.id}
            className="hover:text-yellow-600 rounded-md p-2"
          >
            {link.name}
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
             className="flex flex-col pl-3">
              {editLinks.map((link) => (
                <Link
                  href={link.link}
                  key={link.id}
                  className="hover:text-yellow-600 p-2"
                >
                  {link.name}
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
