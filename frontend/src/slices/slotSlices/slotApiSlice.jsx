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
        deleteSlot: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/delete-slot/${id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {usePostSlotMutation, useDeleteSlotMutation, useGetAllSlotQuery} = slotApiSlice