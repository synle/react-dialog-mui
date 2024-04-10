import React from 'react';
import { useActionDialogs } from 'react-dialog-mui';

export function AlertExample() {
  const { alert } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await alert({
        title: <>Query Result</>,
        message: <>The query has successfully executed, yielding 200 records in 15 seconds.</>,
        yesLabel: `Acknowledge`,
      });
    } catch (err) {}
  };

  return <button onClick={onSubmit}>My Action</button>;
}
