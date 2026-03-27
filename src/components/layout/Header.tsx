"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Productos",
    href: "/products",
    children: [
      { label: "Todos los productos", href: "/products" },
      { label: "Componentes PC",      href: "/collections/componentes-pc" },
      { label: "Periféricos",         href: "/collections/perifericos" },
      { label: "Audio / VR",          href: "/collections/audio-vr" },
      { label: "Iluminación RGB",     href: "/collections/rgb" },
    ],
  },
  { label: "Colecciones", href: "/collections" },
  { label: "Ofertas",     href: "/products?sortKey=PRICE&reverse=true" },
  { label: "Nosotros",    href: "/about" },
];

export function Header() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const rawQty     = useCartStore((s) => s.totalQuantity());

  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted,    setMounted]    = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const totalQty = mounted ? rawQty : 0;
  const [searchOpen,    setSearchOpen]    = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        window.location.href = `/products?query=${encodeURIComponent(searchQuery.trim())}`;
        setSearchOpen(false);
        setSearchQuery("");
      }
    },
    [searchQuery]
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-deep/95 backdrop-blur-md border-b border-border-dim"
            : "bg-transparent"
        )}
      >
        {/* Top bar */}
        <div className="border-b border-border-dim px-4 py-1 hidden md:flex items-center justify-between">
          <p className="font-mono text-[0.6rem] text-text-dim tracking-widest">
            // SISTEMA EN LINEA — ENVIOS A TODA LATINOAMERICA
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.6rem] text-cyan animate-pulse-glow">
              ◉ TIENDA ACTIVA
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div className="relative w-8 h-8 flex items-center justify-center border border-cyan group-hover:shadow-[0_0_12px_var(--cyan)] transition-shadow">
              <Zap
                size={16}
                className="text-cyan group-hover:text-pink transition-colors"
                fill="currentColor"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm font-bold tracking-widest uppercase text-text-primary group-hover:text-cyan transition-colors">
                NEON<span className="text-pink">TECH</span>
              </span>
              <span className="font-mono text-[0.5rem] tracking-[0.3em] text-text-dim uppercase">
                CYBERPUNK STORE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 font-display text-[0.65rem] tracking-widest uppercase text-text-muted hover:text-cyan transition-colors">
                    {link.label}
                    <ChevronDown size={10} />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 w-48 bg-bg-dark border border-border-cyan shadow-[0_0_20px_var(--cyan-glow)] py-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 font-mono text-xs text-text-muted hover:text-cyan hover:bg-bg-card transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 font-display text-[0.65rem] tracking-widest uppercase text-text-muted hover:text-cyan transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 text-text-muted hover:text-cyan transition-colors"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 text-text-muted hover:text-cyan transition-colors hidden sm:block"
              aria-label="Mi cuenta"
            >
              <User size={18} />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-text-muted hover:text-cyan transition-colors"
              aria-label={`Carrito (${totalQty} items)`}
            >
              <ShoppingCart size={18} />
              {totalQty > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center bg-pink text-bg-deep font-mono text-[0.6rem] font-bold rounded-none px-0.5">
                  {totalQty}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 text-text-muted hover:text-cyan transition-colors lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-border-dim bg-bg-dark/95 backdrop-blur-md px-4 py-3">
            <form
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto flex gap-2"
            >
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="BUSCAR PRODUCTOS..."
                className="flex-1 bg-bg-card border border-border-dim focus:border-cyan text-text-primary font-mono text-sm px-4 py-2 outline-none transition-all placeholder:text-text-dim tracking-widest"
              />
              <button
                type="submit"
                className="border border-cyan text-cyan px-4 py-2 font-mono text-xs tracking-widest hover:bg-cyan hover:text-bg-deep transition-all"
              >
                BUSCAR
              </button>
            </form>
          </div>
        )}

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border-dim bg-bg-dark/98 backdrop-blur-md px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-3 font-display text-xs tracking-widest uppercase text-text-muted hover:text-cyan border-b border-border-dim transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setMobileOpen(false)}
              className="block px-2 py-3 font-display text-xs tracking-widest uppercase text-text-muted hover:text-cyan transition-colors"
            >
              Mi Cuenta
            </Link>
          </nav>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
      {/* top bar extra */}
      <div className="hidden md:block h-7" />
    </>
  );
}
