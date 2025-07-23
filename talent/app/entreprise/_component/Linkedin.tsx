import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Linkedin() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Votre compte linkedin(optionel)</Label>
      <Input
        id={id}
        className="bg-muted border-transparent shadow-none"
        placeholder="ex:https://linkedin/"
        type="text"
      />
    </div>
  )
}