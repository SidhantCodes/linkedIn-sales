import { FilterType, FetchFilterSuggestionParams, SuggestionResponse } from "@/types/linkedin";

const filterEndpointMap: Record<FilterType, string> = {
  'job-title': 'filter_job_title_suggestions',
  'company': 'filter_company_suggestions',
  'location': 'filter_geography_location_region_suggestions',
  'experience': 'filter_years_in',
};

/**
 * Fetches filter suggestions from the LinkedIn Sales Navigator API based on filter type.
 * 
 * @param {FetchFilterSuggestionParams} params - The filter parameters including type, query, and pagination.
 * @returns {Promise<any>} - The API response containing suggestions or null on failure.
 */

export async function fetchFilterSuggestions({
  type,
  query = '',
  page = 1,
}: FetchFilterSuggestionParams): Promise<SuggestionResponse | null> {
  const endpoint = filterEndpointMap[type];
  const baseUrl = process.env.NEXT_PUBLIC_LINKEDIN_API_BASE_URL!;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
        'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(type !== 'experience' && { query }),
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const suggestions: SuggestionResponse = await response.json();
    return suggestions;
  } catch (err) {
    console.error(`[LinkedIn API] ${type} fetch failed:`, err);
    return null;
  }
}
