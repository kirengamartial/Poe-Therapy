import { apiSlice } from "../apiSlice";
const BASE_URL = '/comment'

const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postComment: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/post-comment`,
                method: 'POST',
                body: data
            })
        }),
        getAllComment: builder.query({
            query: (data) => ({
                url: `${BASE_URL}/all-comment`,
                method: 'GET'
            })
        }),
    })
})

export const {usePostCommentMutation, useGetAllCommentQuery} = commentApiSlice