import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export const getPlainErrorText = (error: FetchBaseQueryError | SerializedError | undefined) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedError = error as any;

    if (!parsedError || !parsedError?.data?.message) return 'Error processing your request'

    return parsedError.data.message
}