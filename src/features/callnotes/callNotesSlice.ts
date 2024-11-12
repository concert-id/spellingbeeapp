import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";

interface CallNote {
  id: string;
  caller: string;
  reason: string;
  resolved: boolean;
  extras: string;
}

interface CallNoteLog {
  [id: string]: Array<CallNote>;
}

interface CallNoteState {
  currentNote: CallNote;
  pastNotes: CallNoteLog;
}

const initialState: CallNoteState = {
  currentNote: {
    id: "",
    caller: "",
    reason: "",
    resolved: false,
    extras: "",
  },
  pastNotes: {},
};

export const callNotesSlice = createAppSlice({
  name: "callNotes",
  initialState,
  reducers: (create) => ({
    setPolicyIDAction: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.currentNote.id = action.payload;
      }
    ),
    setCallerNameAction: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.currentNote.caller = action.payload;
      }
    ),
    setCallReasonAction: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.currentNote.reason = action.payload;
      }
    ),
    toggleResolutionStatusAction: create.reducer(
      (state, action: PayloadAction<undefined>) => {
        state.currentNote.resolved = !state.currentNote.resolved;
      }
    ),
    setExtraNotesAction: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.currentNote.extras = action.payload;
      }
    ),
    submitNewCallNotesAction: create.reducer(
      (state, action: PayloadAction<undefined>) => {
        try {
          const policyID = state.currentNote.id;
          const newNote = { ...state.currentNote };
          if (state.pastNotes.hasOwnProperty(policyID)) {
            state.pastNotes[policyID].push(newNote);
          } else {
            state.pastNotes[policyID] = [newNote];
          }
          state.currentNote = {
            id: "",
            caller: "",
            reason: "",
            resolved: false,
            extras: "",
          };
        } catch (e) {
          console.log(e);
        }
      }
    ),
  }),
  selectors: {
    selectPolicyID: (state) => state.currentNote.id,
    selectCallerName: (state) => state.currentNote.caller,
    selectCallReason: (state) => state.currentNote.reason,
    selectResolutionStatus: (state) => state.currentNote.resolved,
    selectExtraNotes: (state) => state.currentNote.extras,
    selectPastCallNotes: (state) => Object.values(state.pastNotes),
  },
});

export const {
  setPolicyIDAction,
  setCallerNameAction,
  setCallReasonAction,
  toggleResolutionStatusAction,
  setExtraNotesAction,
  submitNewCallNotesAction,
} = callNotesSlice.actions;
export const {
  selectPolicyID,
  selectCallerName,
  selectCallReason,
  selectExtraNotes,
  selectResolutionStatus,
  selectPastCallNotes,
} = callNotesSlice.selectors;
