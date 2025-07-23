import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SiteInput() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
     
      <div className="flex items-center justify-between gap-1">
         <Label htmlFor={id}>Votre site internet</Label>
        <span className="text-muted-foreground text-sm">Optional</span>
      </div>
      <div className="flex rounded-md shadow-xs">
        <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
          https://
        </span>
        <Input
          id={id}
          className="-ms-px rounded-s-none shadow-none"
          placeholder="monentreprise.com"
          type="text"
        />
      </div>
    </div>
  )
}