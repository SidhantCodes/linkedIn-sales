import { FilterType } from "./linkedin"

export interface FilterOption {
  id: string
  name: string
  include: boolean
}

export interface FilterSearchProps {
  type: FilterType
  onSelect: (filter: FilterOption) => void
}

export interface SelectedFiltersProps {
  filters: Record<FilterType, FilterOption[]>
  onRemove: (type: FilterType, id: string) => void
}