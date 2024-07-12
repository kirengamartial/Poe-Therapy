import { apiSlice } from "../apiSlice";
const BASE_URL = '/slot'

const slotApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postSlot: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/post-slot`,
                method: 'POST',
                body: data
            })
        }),
        getAllSlot: builder.query({
            query: () => ({
                url: `${BASE_URL}/all-slot`,
                method: 'GET'
            })
        }),
        getSingleSlot: builder.query({
            query: (data) => ({
                url: `${BASE_URL}/single-slot`,
                method: 'POST',
                body: data
            })
        }),
        deleteSlot: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete-slot/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {usePostSlotMutation, useDeleteSlotMutation, useGetAllSlotQuery, useGetSingleSlotQuery} = slotApiSlice