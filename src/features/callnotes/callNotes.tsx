import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { submitNewCallNotesAction } from "./callNotesSlice";

export function CallNotes() {
  const dispatch = useAppDispatch();

  function CallNotesForm() {
    const [policyID, setPolicyID] = useState("");
    const [callerName, setCallerName] = useState("");
    const [callReason, setCallReason] = useState("");
    const [resolved, setResolved] = useState(false);
    const [extraNotes, setExtraNotes] = useState("");
    return (
      <>
        <div>
          <form>
            <div>
              <label htmlFor="Policy Number">Policy Number:</label>
            </div>
            <div>
              <input
                type="text"
                name="Policy Number"
                value={policyID}
                onInput={(e) => setPolicyID(e.currentTarget.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Caller Name">Caller Name:</label>
            </div>
            <div>
              <input
                type="text"
                name="Caller Name"
                value={callerName}
                onInput={(e) => setCallerName(e.currentTarget.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Call Reason">Reason For Call:</label>
            </div>
            <div>
              <input
                type="text"
                name="Call Reason"
                value={callReason}
                onInput={(e) => setCallReason(e.currentTarget.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="Resolved Status">Resolved:</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="Resolved Status"
                checked={resolved}
                onInput={() => setResolved(!resolved)}
              ></input>
            </div>
            <div>
              <label htmlFor="Extra Notes">Additional Notes:</label>
            </div>
            <div>
              <input
                type="text"
                name="Extra Notes"
                value={extraNotes}
                onInput={(e) => setExtraNotes(e.currentTarget.value)}
              ></input>
            </div>
          </form>
        </div>
        <div>
          <p>Policy Number: {policyID}</p>
          <p>Caller Name: {callerName}</p>
          <p>Reason For Call: {callReason}</p>
          <p>Resolved: {resolved ? "Y" : "N"}</p>
          <p>Additional Notes: {extraNotes}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <CallNotesForm />
    </>
  );
}
