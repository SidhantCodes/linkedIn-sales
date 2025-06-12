import { FilterType } from "@/types/linkedin"
import { Briefcase, Building2, MapPin, Users } from "lucide-react"

export const getFilterIcon = (type: FilterType) => {
  switch (type) {
    case "job-title":
      return Briefcase
    case "company":
      return Building2
    case "location":
      return MapPin
    case "experience":
      return Users
    default:
      return Users
  }
}

export const getFilterGradient = (type: FilterType) => {
  switch (type) {
    case "job-title":
      return "from-blue-500 to-cyan-500"
    case "company":
      return "from-purple-500 to-pink-500"
    case "location":
      return "from-green-500 to-emerald-500"
    case "experience":
      return "from-orange-500 to-red-500"
    default:
      return "from-gray-500 to-slate-500"
  }
}