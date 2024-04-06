import { useState } from 'react';
import { ActionDialogsContext, useActionDialogs } from '../../index';

function PromptExample() {
  const { prompt } = useActionDialogs();
  const [name, setName] = useState('');

  const onSubmit = async () => {
    try {
      const newName = await prompt({
        title: 'Rename Query',
        message: 'New Query Name',
        value: name,
        saveLabel: 'Save',
      });

      // when user entered and submitted the value for new name
      setName(newName);
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Rename Query?</button>
      <div>
        <strong>New query name:</strong> {name}
      </div>
    </>
  );
}

export default function () {
  return (
    <ActionDialogsContext>
      <PromptExample />
    </ActionDialogsContext>
  );
}
