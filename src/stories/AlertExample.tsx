import { ActionDialogsContext, useActionDialogs } from 'react-mui-action-dialog';

function AlertExample() {
  const { alert } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await alert(
        <>Your alert message...</>,
        `Acknowledge`, // Optional: Yes label
        <>Alert</>, // optional: the dialog title
      );
    } catch (err) {}
  };

  return <button onClick={onSubmit}>My Action</button>;
}

export default function () {
  return (
    <ActionDialogsContext>
      <AlertExample />
    </ActionDialogsContext>
  );
}
