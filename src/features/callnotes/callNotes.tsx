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

  const setPolicyID = (id: string) => {
    dispatch(setPolicyIDAction(id));
  };

  function CallNotesForm() {
    return (
      <>
        <div>
          <form>
            <div>
              <label htmlFor="Policy Number">Policy Number</label>
            </div>
            <div>
              <input
                type="text"
                name="Policy Number"
                value={policyID}
                onInput={(e) => setPolicyID(e.currentTarget.value)}
              ></input>
            </div>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
    <CallNotesForm />
    <p>---</p>
    <div>{policyID}</div>
    </>
  )
}
