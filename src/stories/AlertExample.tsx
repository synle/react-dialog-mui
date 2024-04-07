import { useActionDialogs } from 'react-mui-action-dialog';

export function AlertExample() {
  const { alert } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await alert(
        <>The query has successfully executed, yielding 200 records in 15 seconds.</>,
        `Acknowledge`, // Optional: Yes label
        <>Query Result</>, // Optional: the dialog title
      );
    } catch (err) {}
  };

  return <button onClick={onSubmit}>My Action</button>;
}
