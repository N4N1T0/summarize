import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICULE_KEY

export const articuleApi = createApi({
  reducerPath: 'articuleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', rapidApiKey)
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')

      return headers
    }
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => `/summarize?url=${encodeURIComponent(params.articuleUrl)}&length=3`
    })
  })
})

export const { useLazyGetSummaryQuery } = articuleApi
