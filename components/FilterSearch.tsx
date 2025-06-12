"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { fetchFilterSuggestions } from "@/utils/linkedinApi"
import { type FilterType } from "@/types/linkedin"
import { useDebounce } from "@uidotdev/usehooks"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Search, Plus, Minus, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FilterSearchProps } from "@/types/filters"

export const FilterSearch: React.FC<FilterSearchProps> = ({ type, onSelect }) => {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 400)

  const [suggestions, setSuggestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSuggestions = async () => {
      if (type !== "experience" && debouncedQuery.trim().length < 2) {
        setSuggestions([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await fetchFilterSuggestions({
          type,
          query: type === "experience" ? undefined : debouncedQuery,
        })

        if (response) {
          const values = response.data || response || []
          setSuggestions(values)
        } else {
          setError("Failed to load suggestions.")
        }
      } catch (err) {
        setError("Failed to load suggestions.")
      }

      setLoading(false)
    }

    loadSuggestions()
  }, [debouncedQuery, type])

  const handleSelect = (item: any, include: boolean) => {
    const id = item.id || item.urn_id || item.text
    const name = item.displayValue || item.text || item.name || item.label || "Unknown"

    onSelect({ id, name, include })

    // Clear search for better UX
    if (type !== "experience") {
      setQuery("")
    }
  }

  return (
    <div className="space-y-4">
      {type !== "experience" && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${type.replace("-", " ")}...`}
            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-gray-950/50 transition-all duration-200"
          />
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <span className="ml-2 text-sm text-gray-600">Loading suggestions...</span>
        </div>
      )}

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}

      {!loading && !error && suggestions.length > 0 && (
        <ScrollArea className="h-64 rounded-lg border border-gray-200 bg-gray-900/80">
          <div className="p-2 space-y-1">
            {suggestions.map((item: any) => {
              const id = item.id || item.urn_id || item.text
              const name = item.displayValue || item.text || item.name || item.label || "Unknown"

              return (
                <div
                  key={id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-700 transition-colors duration-150 group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">{name}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSelect(item, true)}
                      className="h-8 px-3 text-xs border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Include
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSelect(item, false)}
                      className="h-8 px-3 text-xs border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                    >
                      <Minus className="w-3 h-3 mr-1" />
                      Exclude
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      )}

      {!loading && !error && type !== "experience" && debouncedQuery.trim().length >= 2 && suggestions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No suggestions found for "{debouncedQuery}"</p>
        </div>
      )}
    </div>
  )
}
