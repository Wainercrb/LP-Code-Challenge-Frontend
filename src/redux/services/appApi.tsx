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
  tagTypes: ["User", "Record", "Role"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    credentials: "include",
    prepareHeaders(headers) {
      headers.set("Access-Control-Allow-Methods", 'POST, GET, OPTIONS')
      return headers
    }
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
      query: () => ({
        url: "profile",
        method: "GET",
      }),
    }),
    crateRecord: builder.mutation<Record, Partial<CreateRecordPayload>>({
      query: (body) => ({
        url: "record",
        method: "POST",
        body: {
          ...body,
        },
      }),
      invalidatesTags: ["Record"],
    }),
    deleteRecord: builder.mutation<Record, Partial<DeleteRecordPayload>>({
      invalidatesTags: ['Record'],
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
  useDeleteRecordMutation,
  useCrateRecordMutation,
} = appApi;
