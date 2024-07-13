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
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/delete-image/${id}`,
        method: 'DELETE'
      })
    }),
    updateImage: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/edit-image/${data.id}`,
        method: 'PUT',
        body: data.formData
      })
    }),
  })
})

export const { usePostImageMutation, useGetImagesQuery, useDeleteImageMutation, useUpdateImageMutation} = galleryApiSlice