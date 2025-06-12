
# AI Recruitment Filter Builder

A modern, responsive React (Next.js) application for building advanced recruitment filters with dynamic suggestions from LinkedIn's Sales Navigator API. This is part of an internship assignment focused on real-world UI/UX, API integration, and component state management.


## Features
- **Intelligent Filter Search**: Suggests filters based on user input (job title, company, location, experience).
- **Dynamic Filter Selection**: Add or exclude filters with just a click.
- **Filter Summary Panel**: Visually track and manage selected filters.
- **LinkedIn API Integration**: Fetches real-time suggestions using RapidAPI-hosted endpoints.


## 🗂️ Project Structure
/app

└── layout.tsx 

└── page.tsx # Main landing page layout and logic

/components  
└── /ui # contains ShadCN UI Components

└── FilterSearch.tsx # UI for searching and selecting filters  

└── SelectedFilters.tsx # Displays selected filters with remove/clear options

/utils  

└── filterUtils.ts # Filter interface related utility functions

└── linkedinApi.ts # API utility for fetching filter suggestions

/types  
└── filters.ts

└──linkedin.ts

/constants  
└── filterConfigs.ts


## Technologies Used

- **React + Next.js**
- **TypeScript**
- **Tailwind CSS + ShadCN UI**
- **Lucide Icons**
- **RapidAPI** (LinkedIn Sales Navigator endpoints)
- **Custom Hooks & Modular Components**

## Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/filter-builder.git
   cd filter-builder
    ```

3. Install dependencies:
    
    ```bash
    npm install
    ```
    
4. Create a `.env.local` file with these variables:
    
    ```env
    NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
    NEXT_PUBLIC_RAPIDAPI_HOST=your_rapidapi_host
    NEXT_PUBLIC_LINKEDIN_API_BASE_URL=https://your-api-base-url/
    ```
    
5. Run the development server:
    
    ```bash
    npm run dev
    ```


## Deployment

Live Demo(Deployed using Vercel): [https://linked-in-sales.vercel.app/](https://linked-in-sales.vercel.app/)

## Assignment Highlights
    
- Debounced API calls to reduce unnecessary requests
- Managed complex filter state using custom hooks
- Handled API errors and fallback UI elegantly
