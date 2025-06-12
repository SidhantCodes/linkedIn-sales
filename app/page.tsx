"use client"

import { useState } from "react"
import type { FilterType } from "@/types/linkedin"
import { FilterSearch } from "@/components/FilterSearch"
import { SelectedFilters } from "@/components/SelectedFilters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, MapPin, Briefcase, Filter } from "lucide-react"
import { FilterOption } from "@/types/filters"
import { filterConfigs } from "@/constants"

export default function HomePage() {
  const [filters, setFilters] = useState<Record<FilterType, FilterOption[]>>({
    "job-title": [],
    company: [],
    location: [],
    experience: [],
  })

  const addFilter = (type: FilterType, filter: FilterOption) => {
    setFilters((prev) => ({
      ...prev,
      [type]: [...prev[type], filter],
    }))
  }

  const removeFilter = (type: FilterType, id: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((f) => f.id !== id),
    }))
  }

  const getTotalFilters = () => {
    return Object.values(filters).reduce((total, filterList) => total + filterList.length, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Filter className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-50 to-purple-300 bg-clip-text text-transparent mb-4">
            AI Recruitment Filter Builder
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Build sophisticated candidate filters with intelligent search and precise targeting capabilities
          </p>
          {getTotalFilters() > 0 && (
            <div className="mt-4">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                {getTotalFilters()} {getTotalFilters() === 1 ? "Filter" : "Filters"} Active
              </Badge>
            </div>
          )}
        </div>

        {/* Filter Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {filterConfigs.map((config) => {
            const Icon = config.icon
            return (
              <Card
                key={config.type}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gray-950/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${config.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-gray-200">{config.title}</CardTitle>
                      <CardDescription className="text-gray-300 mt-1">{config.description}</CardDescription>
                    </div>
                    {filters[config.type].length > 0 && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {filters[config.type].length}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <FilterSearch type={config.type} onSelect={(f) => addFilter(config.type, f)} />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Selected Filters Section */}
        <Card className="shadow-xl border-0 bg-gray-950/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-gray-200">Active Filters</CardTitle>
                <CardDescription className="text-gray-300">
                  Review and manage your selected recruitment criteria
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <SelectedFilters filters={filters} onRemove={removeFilter} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
