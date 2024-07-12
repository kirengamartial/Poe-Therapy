import { apiSlice } from '../apiSlice'

const BASE_URL = "/gallery"

export const galleryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postImage: builder.mutation({
      query: (formData) => ({
        url: `${BASE_URL}/post-image`,
        method: 'POST',
        body: formData,
      })
    }),
    getImages: builder.query({
      query: () => ({
        url: `${BASE_URL}/all-image`,
        method: 'GET'
      })
    }),
  })
})

export const { usePostImageMutation, useGetImagesQuery } = galleryApiSlice