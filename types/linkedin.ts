export type FilterType = 'job-title' | 'company' | 'location' | 'experience';

export interface FetchFilterSuggestionParams {
  type: FilterType;
  query?: string;
  page?: number;
}

export interface TextAttribute {
  start: number;
  length: number;
  type: Record<string, unknown>;
  attributeKindUnion: Record<string, unknown>;
}

export interface HeadlineV2 {
  text: string;
  attributes?: TextAttribute[];
}

export interface SuggestionItem {
  id: string;
  displayValue: string;
  headline: string;
  headlineV2: HeadlineV2;
}

export interface SuggestionResponse {
  data: SuggestionItem[];
}
