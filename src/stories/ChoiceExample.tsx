import React, { useState } from 'react';
import { useActionDialogs } from 'react-dialog-mui';

export function ChoiceExample() {
  const { choiceSingle } = useActionDialogs();
  const [session, setSession] = useState('');

  const onSubmit = async () => {
    try {
      const newSession = await choiceSingle({
        title: 'Switch session', // the dialog title
        message: 'Select one of the following sessions:', // the question for the input
        options: [
          { label: 'Session 1', value: 'session_1' },
          { label: 'Session 2', value: 'session_2' },
          { label: 'Session 3', value: 'session_3' },
          { label: 'Session 4', value: 'session_4', disabled: true },
        ],
        value: session,
        required: true,
      });

      // when user selected a choice
      setSession(newSession);
    } catch (err) {
      setSession('');
    }
  };

  return (
    <>
      <button onClick={onSubmit}>Switch Session</button>
      <div>
        <strong>New selected session:</strong> {session}
      </div>
    </>
  );
}

export function ChoiceExampleWithMultiselect() {
  const { choiceMultiple } = useActionDialogs();
  const [favContacts, setFavContacts] = useState<string[]>([]);

  const onSubmit = async () => {
    try {
      const newFavContacts = await choiceMultiple({
        title: 'Update Favorite Contacts',
        message: 'Select contacts to add to the favorite list:',
        options: [
          { label: 'John Doe', value: 'John Doe' },
          { label: 'Alice Smith', value: 'Alice Smith' },
          { label: 'Michael Johnson', value: 'Michael Johnson', disabled: true },
          { label: 'Emily Brown', value: 'Emily Brown' },
          { label: 'Daniel Wilson', value: 'Daniel Wilson' },
        ],
        value: favContacts,
        required: true,
      });

      // when user selected a choice
      setFavContacts(newFavContacts);
    } catch (err) {
      setFavContacts([]);
    }
  };

  return (
    <>
      <button onClick={onSubmit}>Update Favorite Contacts</button>
      <div>
        <strong>New selected favorite contacts:</strong> {JSON.stringify(favContacts)}
      </div>
    </>
  );
}
