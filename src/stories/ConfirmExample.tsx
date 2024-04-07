import { useState } from 'react';
import { ActionDialogsContext, useActionDialogs } from 'react-mui-action-dialog';

function ConfirmExample() {
  const { confirm } = useActionDialogs();
  const [deleted, setDeleted] = useState(false);

  const onSubmit = async () => {
    try {
      await confirm(
        <>Do you want to delete this query?</>,
        `Delete`, // Optional: Yes label
        <>Confirmation?</>, // optional: the dialog title
      );

      // when user selects yes
      setDeleted(true);
    } catch (err) {
      // when user selects no
      setDeleted(false);
    }
  };

  return (
    <>
      <button onClick={onSubmit}>Delete Query?</button>
      <div>
        Status:
        {deleted ? <>This query has been deleted</> : null}
      </div>
    </>
  );
}

export default function () {
  return (
    <ActionDialogsContext>
      <ConfirmExample />
    </ActionDialogsContext>
  );
}
