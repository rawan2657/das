import { apiSlice } from "../../app/api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (params) => ({
                url: 'products',
                params: { ...params },
            }),
            providesTags: ['Product'],
        }),

        searchProducts: builder.query({
            query: (params) => ({
                url: 'products/search',
                method: 'GET',
                params: { ...params },
            }),
            providesTags: ['Product'],
        }),

        getSingleProduct: builder.query({
            query: (id) => ({
                url: `products/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        getProductReviews: builder.query({
            query: (id) => ({
                url: `products/${id}/reviews`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Review', id }, 'Review'],
        }),

        addProductReview: builder.mutation({
            query: ({ id, ...reviewData }) => ({
                url: `products/${id}/reviews`,
                method: 'POST',
                body: reviewData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Review', id },
                'Review',
                { type: 'Product', id },
            ],
        }),

        deleteProductReview: builder.mutation({
            query: ({ id, reviewId }) => ({
                url: `products/${id}/reviews/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Review', id },
                'Review',
                { type: 'Product', id },
            ],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useSearchProductsQuery,
    useLazySearchProductsQuery,
    useGetSingleProductQuery,
    useGetProductReviewsQuery,
    useAddProductReviewMutation,
    useDeleteProductReviewMutation,
} = productsApiSlice;