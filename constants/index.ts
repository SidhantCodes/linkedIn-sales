import { FilterType } from "@/types/linkedin";
import { Briefcase, Building2, MapPin, Users } from "lucide-react";

export const filterConfigs = [
    {
      type: "job-title" as FilterType,
      title: "Job Titles",
      description: "Search and filter by specific job positions",
      icon: Briefcase,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      type: "company" as FilterType,
      title: "Companies",
      description: "Target specific organizations and employers",
      icon: Building2,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      type: "location" as FilterType,
      title: "Locations",
      description: "Filter by geographic regions and cities",
      icon: MapPin,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      type: "experience" as FilterType,
      title: "Experience Level",
      description: "Select candidates by experience requirements",
      icon: Users,
      gradient: "from-orange-500 to-red-500",
    },
  ]