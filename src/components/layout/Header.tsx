"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {
  ShoppingCart, Search, User, Menu, X, Zap, ChevronDown, LayoutGrid,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

interface NavCollection { handle: string; title: string }

const STATIC_NAV = [
  { label: "Ofertas",   href: "/products?sortKey=PRICE&reverse=true" },
  { label: "Nosotros",  href: "/about" },
];

export function Header() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const rawQty     = useCartStore((s) => s.totalQuantity());

  const [scrolled,        setScrolled]        = useState(false);
  const [mobileOpen,      setMobileOpen]       = useState(false);
  const [mounted,         setMounted]          = useState(false);
  const [searchOpen,      setSearchOpen]       = useState(false);
  const [searchQuery,     setSearchQuery]      = useState("");
  const [activeDropdown,  setActiveDropdown]   = useState<string | null>(null);
  const [collections,     setCollections]      = useState<NavCollection[]>([]);
  const [mobileProducts,  setMobileProducts]   = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Fetch real collections from Shopify
  useEffect(() => {
    fetch("/api/nav-collections")
      .then((r) => r.json())
      .then((data: NavCollection[]) => setCollections(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const totalQty = mounted ? rawQty : 0;

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
            {"// SISTEMA EN LINEA — ENVIOS A TODA LATINOAMERICA"}
          </p>
          <span className="font-mono text-[0.6rem] text-cyan animate-pulse-glow">
            ◉ TIENDA ACTIVA
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-8 h-8 flex items-center justify-center border border-cyan group-hover:shadow-[0_0_12px_var(--cyan)] transition-shadow">
              <Zap size={16} className="text-cyan group-hover:text-pink transition-colors" fill="currentColor" />
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

            {/* Productos + Colecciones dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("productos")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 font-display text-[0.65rem] tracking-widest uppercase text-text-muted hover:text-cyan transition-colors">
                Productos
                <ChevronDown size={10} />
              </button>

              {activeDropdown === "productos" && (
                <div className="absolute top-full left-0 mt-0 w-52 bg-bg-dark border border-border-cyan shadow-[0_0_20px_var(--cyan-glow)] py-1">
                  {/* Todos los productos */}
                  <Link
                    href="/products"
                    className="flex items-center gap-2 px-4 py-2 font-mono text-xs text-text-muted hover:text-cyan hover:bg-bg-card transition-colors border-b border-border-dim"
                  >
                    <LayoutGrid size={10} />
                    Todos los productos
                  </Link>

                  {/* Colecciones de Shopify */}
                  {collections.length > 0 && (
                    <>
                      <p className="px-4 pt-2 pb-1 font-mono text-[0.55rem] text-text-dim tracking-widest uppercase">
                        Colecciones
                      </p>
                      {collections.map((col) => (
                        <Link
                          key={col.handle}
                          href={`/collections/${col.handle}`}
                          className="block px-4 py-2 font-mono text-xs text-text-muted hover:text-cyan hover:bg-bg-card transition-colors"
                        >
                          {col.title}
                        </Link>
                      ))}
                    </>
                  )}

                  {/* Ver todas */}
                  <Link
                    href="/collections"
                    className="block px-4 py-2 font-mono text-xs text-cyan hover:bg-bg-card transition-colors border-t border-border-dim mt-1"
                  >
                    Ver todas las colecciones →
                  </Link>
                </div>
              )}
            </div>

            {/* Resto del nav */}
            {STATIC_NAV.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 font-display text-[0.65rem] tracking-widest uppercase text-text-muted hover:text-cyan transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 text-text-muted hover:text-cyan transition-colors"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
            <Link
              href="/account"
              className="p-2 text-text-muted hover:text-cyan transition-colors hidden sm:block"
              aria-label="Mi cuenta"
            >
              <User size={18} />
            </Link>
            <button
              onClick={toggleCart}
              className="relative p-2 text-text-muted hover:text-cyan transition-colors"
              aria-label={`Carrito (${totalQty} items)`}
            >
              <ShoppingCart size={18} />
              {totalQty > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 flex items-center justify-center bg-pink text-bg-deep font-mono text-[0.6rem] font-bold px-0.5">
                  {totalQty}
                </span>
              )}
            </button>
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
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
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
            {/* Productos accordion */}
            <button
              onClick={() => setMobileProducts((v) => !v)}
              className="flex items-center justify-between px-2 py-3 font-display text-xs tracking-widest uppercase text-text-muted hover:text-cyan border-b border-border-dim transition-colors w-full text-left"
            >
              Productos
              <ChevronDown size={12} className={cn("transition-transform", mobileProducts && "rotate-180")} />
            </button>
            {mobileProducts && (
              <div className="pl-4 flex flex-col gap-0.5 pb-2 border-b border-border-dim">
                <Link
                  href="/products"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 font-mono text-xs text-text-muted hover:text-cyan transition-colors"
                >
                  Todos los productos
                </Link>
                {collections.map((col) => (
                  <Link
                    key={col.handle}
                    href={`/collections/${col.handle}`}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 font-mono text-xs text-text-muted hover:text-cyan transition-colors"
                  >
                    {col.title}
                  </Link>
                ))}
                <Link
                  href="/collections"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 font-mono text-xs text-cyan transition-colors"
                >
                  Ver todas →
                </Link>
              </div>
            )}

            {STATIC_NAV.map((link) => (
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
      <div className="hidden md:block h-7" />
    </>
  );
}
