import React from "react";
import { useActionDialogs, useActionDialogRef } from "react-dialog-mui";

export function AlertExample() {
  const { alert } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await alert({
        title: <>Query Result</>,
        message: (
          <>
            The query has successfully executed, yielding 200 records in 15
            seconds.
          </>
        ),
        yesLabel: `Acknowledge`,
      });
    } catch (err) {}
  };

  return <button onClick={onSubmit}>My Action</button>;
}

export function AlertExampleWithManualDismiss() {
  const { alert } = useActionDialogs();
  const modalRef = useActionDialogRef();

  const onSubmit = async () => {
    try {
      await alert({
        title: <>Query Result</>,
        message: (
          <>
            <div>The query has successfully executed.</div>
            <button onClick={() => modalRef.current.dismiss()}>
              Close this modal and retry
            </button>
          </>
        ),
        modalRef,
      });
    } catch (err) {}
  };

  return <button onClick={onSubmit}>My Action</button>;
}
