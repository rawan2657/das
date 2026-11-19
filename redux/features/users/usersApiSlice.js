import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ id, ...patchData }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: { ...patchData },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),
  }),
});

export const { useUpdateUserMutation } = usersApiSlice;
