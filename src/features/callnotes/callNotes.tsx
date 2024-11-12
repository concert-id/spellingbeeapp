import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCallReason,
  selectCallerName,
  selectExtraNotes,
  selectPastCallNotes,
  selectPolicyID,
  selectResolutionStatus,
  setCallReasonAction,
  setCallerNameAction,
  setExtraNotesAction,
  setPolicyIDAction,
  toggleResolutionStatusAction,
  submitNewCallNotesAction,
} from "./callNotesSlice";

function CallNotes() {
  const dispatch = useAppDispatch();
  const policyID = useAppSelector(selectPolicyID);
  const callerName = useAppSelector(selectCallerName);
  const callReason = useAppSelector(selectCallReason);
  const resolved = useAppSelector(selectResolutionStatus);
  const extraNotes = useAppSelector(selectExtraNotes);
  const pastNotes = useAppSelector(selectPastCallNotes);

  function CallNotesForm() {
    return (
      <>
        <div>
          <form>
            <div></div>
          </form>
        </div>
      </>
    );
  }
}
