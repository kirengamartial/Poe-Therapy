import { apiSlice } from "../apiSlice";
const BASE_URL = '/time'

const timeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postTime: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/post-time`,
                method: 'POST',
                body: data
            })
        }),
        deleteTime: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete-time/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {usePostTimeMutation, useDeleteTimeMutation} = timeApiSlice