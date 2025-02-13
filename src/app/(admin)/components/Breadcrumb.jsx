'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumb() {
    const pathname = usePathname();
    const [breadcrumb, setBreadcrumb] = useState([]);

    useEffect(() => {
        if (pathname) {
            const pathArray = pathname.split('/').filter((item) => item !== '');
            const breadcrumbArray = pathArray.map((item, index) => ({
                name: item.charAt(0).toUpperCase() + item.slice(1),
                href: "/" + pathArray.slice(0, index + 1).join('/'),
            }));

            // Ensure the first breadcrumb is "Admin" if it starts with "/admin"
            if (pathArray[0] === 'admin') {
                breadcrumbArray[0].name = "Admin";
            }

            setBreadcrumb(breadcrumbArray);
        }
    }, [pathname]);

    return (
        <nav className="text-gray-600 text-md mx-4 my-2 px-10 py-2 bg-neutral-100 rounded-lg">
            <ul className="flex items-center space-x-2">
                {breadcrumb.map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center space-x-2">
                        <Link
                            href={crumb.href}
                            className={`${
                                index === breadcrumb.length - 1
                                    ? "text-gray-800 font-semibold"
                                    : "text-neutral-600 hover:underline"
                            }`}
                        >
                            {crumb.name}
                        </Link>
                        {index < breadcrumb.length - 1 && <span className="text-[var(--primary)]">/</span>}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
