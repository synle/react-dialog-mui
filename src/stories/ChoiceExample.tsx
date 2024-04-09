import React from 'react';
import { useState } from 'react';
import { useActionDialogs } from 'react-dialog-mui';

export function ChoiceExample() {
  const { choice } = useActionDialogs();
  const [session, setSession] = useState('');

  const onSubmit = async () => {
    try {
      const newSession = await choice(
        'Switch session', // the dialog title
        'Select one of the following sessions:', // the question for the input
        [
          { label: 'Session 1', value: 'session_1' },
          { label: 'Session 2', value: 'session_2' },
          { label: 'Session 3', value: 'session_3' },
        ],
        session, // selected value
        true, // required
      );

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
      const newFavContacts = await choiceMultiple(
        'Update Favorite Contacts', // the dialog title
        'Select contacts to add to the favorite list:', // the question for the input
        [
          { label: 'John Doe', value: 'John Doe' },
          { label: 'Alice Smith', value: 'Alice Smith' },
          { label: 'Michael Johnson', value: 'Michael Johnson', disabled: true },
          { label: 'Emily Brown', value: 'Emily Brown' },
          { label: 'Daniel Wilson', value: 'Daniel Wilson' },
        ],
        favContacts, // selected options
        true, // required
      );

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
