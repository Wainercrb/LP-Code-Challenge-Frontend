import { User } from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";

interface State {
  user?: User;
  isInitialized: boolean
}

const INITIAL_STATE: State = {
  user: undefined,
  isInitialized: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isInitialized = true
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
