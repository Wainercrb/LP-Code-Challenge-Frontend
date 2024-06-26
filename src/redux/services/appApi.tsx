import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateRecordPayload,
  DeleteRecordPayload,
  GetOperations,
  GetRecords,
} from "@/redux/types";
import { setUser } from "@/redux/features/userSlice";

// Models
import { User } from "@/models/User";
import { PaginationOutput } from "@/utils/pagination";
import { Record } from "@/models/Record";

export const appApi = createApi({
  reducerPath: "appApi",
  tagTypes: ["User", "Record", "Role", "Session"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    credentials: "include",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    verifyUser: builder.query<User, null>({
      query: () => "verify-user",
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          dispatch(setUser(undefined));
        }
      },
    }),
    getRecords: builder.query<GetRecords, PaginationOutput>({
      providesTags: ["Record"],
      query: (body) => ({
        url: "records",
        method: "GET",
        params: {
          ...body,
        },
      }),
    }),
    getOperations: builder.query<GetOperations, PaginationOutput>({
      query: (body) => ({
        url: "operations",
        method: "GET",
        params: {
          ...body,
        },
      }),
    }),
    getProfile: builder.query<User, undefined>({
      providesTags: ["Session"],
      query: () => ({
        url: "profile",
        method: "GET",
      }),
    }),
    crateRecord: builder.mutation<Record, Partial<CreateRecordPayload>>({
      invalidatesTags: ["Record", "Session"],
      query: (body) => ({
        url: "record",
        method: "POST",
        body: {
          ...body,
        },
      }),
    }),
    deleteRecord: builder.mutation<Record, Partial<DeleteRecordPayload>>({
      invalidatesTags: ["Record", "Session"],
      query: (body) => ({
        url: "record",
        method: "DELETE",
        params: {
          ...body,
        },
      }),
    }),
    signIn: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "sign-in",
        method: "POST",
        body: {
          ...body,
        },
      }),
      invalidatesTags: ["User"],
    }),
    signUp: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "sign-up",
        method: "POST",
        body: {
          ...body,
        },
      }),
      invalidatesTags: ["User"],
    }),
    signOut: builder.mutation<undefined, undefined>({
      query: () => ({
        url: "sign-out",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useVerifyUserQuery,
  useSignOutMutation,
  useGetRecordsQuery,
  useGetProfileQuery,
  useGetOperationsQuery,
  useSignInMutation,
  useSignUpMutation,
  useDeleteRecordMutation,
  useCrateRecordMutation,
} = appApi;
