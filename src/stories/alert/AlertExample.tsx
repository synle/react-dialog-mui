import { ActionDialogsContext, useActionDialogs } from '../../index';

function AlertExample() {
  const { alert } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await alert(<>Your alert message...</>);
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
