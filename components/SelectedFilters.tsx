"use client"

import type React from "react"

import type { FilterType } from "@/types/linkedin"
import type { FilterOption, SelectedFiltersProps } from "@/types/filters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Users, Building2, MapPin, Briefcase, Trash2 } from "lucide-react"
import { getFilterGradient, getFilterIcon } from "@/utils/filterUtils"

export const SelectedFilters: React.FC<SelectedFiltersProps> = ({ filters, onRemove }) => {
  const hasFilters = Object.values(filters).some((list) => list.length > 0)

  if (!hasFilters) {
    return (
      <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No filters selected</h3>
          <p className="text-gray-600 text-center max-w-md">
            Start building your recruitment criteria by selecting filters from the categories above.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {Object.entries(filters).map(([type, list]) => {
        if (list.length === 0) return null

        const Icon = getFilterIcon(type as FilterType)
        const gradient = getFilterGradient(type as FilterType)

        return (
          <div key={type} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 capitalize">{type.replace("-", " ")}</h4>
                <Badge variant="secondary" className="text-xs">
                  {list.length} {list.length === 1 ? "filter" : "filters"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  list.forEach((item) => onRemove(type as FilterType, item.id))
                }}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear all
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {list.map((item) => (
                <Badge
                  key={item.id}
                  variant={item.include ? "default" : "destructive"}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    item.include
                      ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                      : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
                  }`}
                >
                  <span className="mr-2">{item.include ? "+" : "−"}</span>
                  {item.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(type as FilterType, item.id)}
                    className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
