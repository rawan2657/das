import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyCart: builder.query({
            query: () => ({
                url: 'carts',
                method: 'GET',
            }),
            providesTags: ['Cart'],
        }),

        addItemToCart: builder.mutation({
            query: (itemData) => ({
                url: 'carts/items',
                method: 'POST',
                body: itemData,
            }),
            invalidatesTags: ['Cart'],
        }),

        updateCartItemQuantity: builder.mutation({
            query: (updateData) => ({
                url: 'carts/items',
                method: 'PATCH',
                body: updateData,
            }),
            invalidatesTags: ['Cart'],
        }),

        removeItemFromCart: builder.mutation({
            query: (productId) => ({
                url: `carts/items/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        applyCoupon: builder.mutation({
            query: (couponData) => ({
                url: 'carts/coupon',
                method: 'POST',
                body: couponData,
            }),
            invalidatesTags: ['Cart'],
        }),

        removeCoupon: builder.mutation({
            query: () => ({
                url: 'carts/coupon',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        clearCart: builder.mutation({
            query: () => ({
                url: 'carts/clear',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetMyCartQuery,
    useAddItemToCartMutation,
    useUpdateCartItemQuantityMutation,
    useRemoveItemFromCartMutation,
    useApplyCouponMutation,
    useRemoveCouponMutation,
    useClearCartMutation,
} = cartApiSlice;