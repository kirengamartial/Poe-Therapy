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
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete-video/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {usePostVideoMutation, useDeleteVideoMutation} = videoApiSlice