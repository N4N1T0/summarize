import { configureStore } from '@reduxjs/toolkit'
import { articuleApi } from './articule'

export const store = configureStore({
  reducer: {
    [articuleApi.reducerPath]: articuleApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articuleApi.middleware)
})
