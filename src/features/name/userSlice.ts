import { createSelector, type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface NameSliceState {
  name: string
}

const initialState: NameSliceState = {
  name: ""
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    setName: create.reducer((state, action: PayloadAction<string>) => {
      state.name = action.payload
    }),
  }),
  selectors: {
    selectName: user => user.name
  },
})
export const { setName } = userSlice.actions
export const {
  selectName
} = userSlice.selectors

const selectLetter = (_: NameSliceState, email: string) => email;
export const selectIsLetterInName = createSelector(
  [selectName, selectLetter],
  (name, email) => {
    return name.includes(email)
  }
)