import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 font-bold">
            <span>WTTJ Solutions</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#offers" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Nos offres
            </Link>
            <Link href="#clients" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Nos clients
            </Link>
            <Link href="#resources" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Nos ressources
            </Link>
            <Link href="#about" className="transition-colors hover:text-foreground/80 text-foreground/60">
              À propos
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="#demo">Demander une démo</Link>
          </Button>
          <Button asChild>
            <Link href="#login">Se connecter</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="#language">FR</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}