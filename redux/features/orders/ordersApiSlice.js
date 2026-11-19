import { apiSlice } from "../../app/api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (orderData) => ({
                url: 'orders',
                method: 'POST',
                body: orderData,
            }),
             invalidatesTags: ['Order', 'Cart'],
        }),

        getMyOrders: builder.query({
            query: (params) => ({
                url: 'orders/my',
                method: 'GET',
                params: { ...params },
            }),
            providesTags: ['Order'],
        }),

        getSingleOrder: builder.query({
            query: (id) => ({
                url: `orders/my/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Order', id }],
        }),

        cancelOrder: builder.mutation({
            query: (id) => ({
                url: `orders/my/${id}/cancel`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Order', id }, 'Order'],
        }),
    }),
});

export const {
    usePlaceOrderMutation,
    useGetMyOrdersQuery,
    useGetSingleOrderQuery,
    useCancelOrderMutation,
} = ordersApiSlice;