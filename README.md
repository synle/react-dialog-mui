# react-mui-action-dialog

## How to use?

```bash
npm i github:synle/react-mui-action-dialog#main;
```

### Add the action dialog context to your root

Use one of these import options

```tsx
// const { ActionDialogsContext } = require('react-mui-action-dialog');
// import { ActionDialogsContext } from 'react-mui-action-dialog';
```

```tsx
<ActionDialogsContext>
  <YourApp>
</ActionDialogsContext>
```

### Use the hook

You can use the hooks to invoke the action dialogs:

```tsx
// in your component
const { alert, prompt, confirm, choice, dismiss, modal } = useActionDialogs();

// ... then call the method in your code
```

#### Alert

This is to alert a simple message.

<img width="203" alt="image" src="https://github.com/synle/react-mui-action-dialog/assets/3792401/027c6e41-04a3-42d3-a398-d7ac3d1d5467">

```tsx
// then call it in your component
function MyComponent() {
  const onSubmit = async () => {
    try {
      await alert(<>Your alert message...</>);
    } catch (err) {}
  };

  return <button onClick={onSubmit}>My Action</button>;
}
```

#### Confirm

This is a yes/no confimation.

<img width="219" alt="image" src="https://github.com/synle/react-mui-action-dialog/assets/3792401/ee08ab35-1774-40ba-a6c1-fc9d7a7297a9">

```tsx
// then call it in your component
function MyComponent() {
  const { confirm } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await confirm(`Do you want to delete this query?`);

      // when user selects yes
    } catch (err) {
      // when user selects no
    }
  };

  return <button onClick={onSubmit}>Delete Query?</button>;
}
```

#### Prompt

This is a simple text input used to ask user to enter a free form text.

<img width="382" alt="image" src="https://github.com/synle/react-mui-action-dialog/assets/3792401/cd617969-19f6-4737-b613-d39a136a8c6e">

```tsx
// then call it in your component
function MyComponent() {
  const { prompt } = useActionDialogs();

  const onSubmit = async () => {
    try {
      const newName = await prompt({
        title: 'Rename Query',
        message: 'New Query Name',
        value: 'default query value',
        saveLabel: 'Save',
      });

      // when user entered and submitted the value for new name
    } catch (err) {}
  };

  return <button onClick={onSubmit}>Rename Query?</button>;
}
```

#### Choice

This is to display a list of choice which the user needs to select one of the choice

<img width="379" alt="image" src="https://github.com/synle/react-mui-action-dialog/assets/3792401/81140e54-77bd-45af-a28b-b134e7e6f0be">

```tsx
function ChoiceExample() {
  const { choice } = useActionDialogs();
  const [session, setSession] = useState('');

  const onSubmit = async () => {
    try {
      const newSession = await choice(
        'Switch session',
        'Select one of the following session:',
        [
          { label: 'Session 1', value: 'session_1' },
          { label: 'Session 2', value: 'session_2' },
          { label: 'Session 3', value: 'session_3' },
        ],
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
```

#### Modal

This is used to show any custom modal content.

<img width="438" alt="image" src="https://github.com/synle/react-mui-action-dialog/assets/3792401/cc6ae029-8d1f-482d-98e1-e1b896923aa0">

```tsx
function ModalExample() {
  const { modal } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Query Details',
        message: (
          <>
            <div>
              <strong>Name:</strong> Sample Mocked Query
            </div>
            <div>
              <strong>Status:</strong> Pending
            </div>
            <div>
              <strong>Created Date:</strong> {new Date().toLocaleDateString()}
            </div>
          </>
        ),
        size: 'md',
      });

      // when users close out of modal
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Show Details</button>
    </>
  );
}
```
