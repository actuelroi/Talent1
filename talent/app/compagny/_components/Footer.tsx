import Link from "next/link"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Case Studies", href: "#cases" },
    { name: "API", href: "#api" }
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" }
  ],
  legal: [
    { name: "Privacy", href: "#privacy" },
    { name: "Terms", href: "#terms" },
    { name: "Security", href: "#security" }
  ]
}

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Talent Solutions</h3>
            <p className="text-sm text-muted-foreground">
              Modern recruitment solutions for forward-thinking companies.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-medium">Product</h4>
            {footerLinks.product.map((link, index) => (
              <Link key={index} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-medium">Company</h4>
            {footerLinks.company.map((link, index) => (
              <Link key={index} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-medium">Legal</h4>
            {footerLinks.legal.map((link, index) => (
              <Link key={index} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Welcome to the Jungle Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}