import { apiSlice } from "../apiSlice";
const BASE_URL = '/studio'

const videoApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postVideo: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/post-video`,
                method: 'POST',
                body: data
            })
        }),
        getVideos: builder.query({
            query: () => ({
                url: `${BASE_URL}/all-video`,
                method: 'GET'
            })
        }),
        getSingleVideo: builder.query({
            query: (id) => ({
                url: `${BASE_URL}/single-video/${id}`,
                method: 'GET'
            })
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete-video/${id}`,
                method: 'DELETE',
            })
        }),
        updateVideo: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/edit-video/${data.id}`,
                method: 'PUT',
                body: data.formData
            })
        }),
    })
})

export const {usePostVideoMutation, useDeleteVideoMutation, useGetVideosQuery, useUpdateVideoMutation, useGetSingleVideoQuery} = videoApiSlice