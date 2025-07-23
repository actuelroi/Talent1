import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputWithDescription() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id} className="text-2xl font-semibold">Entrer le nom de votre entreprise</Label>
      <Input id={id} placeholder="Mon Entreprise" type="email" />
      <p
        className="text-muted-foreground mt-2 text-xs"
        role="region"
        aria-live="polite"
      >
        Ce nom permetrat de vous identifiez
      </p>
    </div>
  )
}