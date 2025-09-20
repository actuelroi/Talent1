// src/app/companies/l-oreal/nos-offres/components/Navigation.tsx
import Link from "next/link";

export default function Navigation() {
  const navItems = [
    { href: "/companies/l-oreal", label: "Profil" },
    { href: "/companies/l-oreal/nos-offres", label: "Jobs" },
    { href: "#metiers", label: "Métiers" },
    { href: "#diversity", label: "Diversité" },
    { href: "#rse", label: "RSE" },
  ];

  return (
    <section className="bg-white border-b">
      <div className="container max-w-6xl mx-auto px-4">
        <nav className="flex overflow-x-auto gap-8 py-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`whitespace-nowrap font-medium ${
                item.href === "/companies/l-oreal/nos-offres"
                  ? "text-gray-900 border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}