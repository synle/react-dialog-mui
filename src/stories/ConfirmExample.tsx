import { useState } from 'react';
import { useActionDialogs } from 'react-dialog-mui';

export function ConfirmExample() {
  const { confirm } = useActionDialogs();
  const [deleted, setDeleted] = useState(false);

  const onSubmit = async () => {
    try {
      await confirm(
        <>Do you want to delete this query?</>,
        `Delete`, // Optional: Yes label
        <>Confirmation?</>, // Optional: the dialog title
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
