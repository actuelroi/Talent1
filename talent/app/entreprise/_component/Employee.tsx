import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function Employees() {
  return (
    <Select>
        <Label>Nombre de personnes</Label>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Nombre d&apos;employees" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Employee</SelectLabel>
          <SelectItem value="est">1-10</SelectItem>
          <SelectItem value="cst">10-25 </SelectItem>
          <SelectItem value="mst">25-50 </SelectItem>
          <SelectItem value="pst">50-200</SelectItem>
          <SelectItem value="akst">200-1000</SelectItem>
          <SelectItem value="hst">+1000</SelectItem>
        </SelectGroup>
        
      </SelectContent>
    </Select>
  )
}
