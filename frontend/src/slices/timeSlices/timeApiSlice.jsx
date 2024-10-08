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
        allTime: builder.query({
            query: () => ({
                url: `${BASE_URL}/all-time`,
                method: 'GET'
            })
        }),
        deleteTime: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete-time/${id}`,
                method: 'DELETE',
            })
        }),
        updateTime: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/edit-time/${data.id}`,
                method: 'PUT',
                body: data
            })
        }),
    })
})

export const {usePostTimeMutation, useDeleteTimeMutation, useAllTimeQuery, useUpdateTimeMutation} = timeApiSlice