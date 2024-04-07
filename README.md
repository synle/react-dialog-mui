# react-mui-action-dialog

This React library simplifies the usage of Material-UI dialogs, removing the need to manage states manually. It offers convenient replicas of standard JavaScript dialog methods such as `alert`, `confirm`, and `prompt`, streamlining the implementation of common UX flows.

The library internally utilizes React Context to handle states, ensuring compatibility with most versions of React from version 17 onward.

## Why?

The MUI Dialogs codebase is overly complex and lacks functionality. While the built-in JavaScript methods for alert, confirm, and prompt offer simplicity, they're not customizable and may fall short for complex scenarios.

My aim with this library is to create a user-friendly solution that meets both ease-of-use and complex use case requirements.

## How to use?

Currently, it's hosted on GitHub. My plan is to transition it into an official npm package.

```bash
npm i github:synle/react-mui-action-dialog#main;
```

### Add the action dialog context to your root

To begin, wrap your app with ActionDialogsContext, a React context consumer that manages the dialog stack state.

```tsx
import { ActionDialogsContext } from 'react-mui-action-dialog';

<ActionDialogsContext>
  <YourApp>
</ActionDialogsContext>
```

### Use the ActionDialog hooks

#### Alert

This alerts a simple message with an OK button, informing the user of an event.

![image](https://github.com/synle/react-mui-action-dialog/assets/3792401/7811010b-3c3b-45f3-ae9d-6144641c585f)

```tsx
// then call it in your component
function MyComponent() {
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
```

#### Confirm

This prompts the user for a yes or no confirmation regarding an event.

![image](https://github.com/synle/react-mui-action-dialog/assets/3792401/ec9217d4-407a-4c7f-8fb2-67b4630c86e1)

```tsx
// then call it in your component
function MyComponent() {
  const { confirm } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await confirm(
        <>Do you want to delete this query?</>,
        `Delete`, // Optional: Yes label
        <>Confirmation?</>, // Optional: the dialog title
      );

      // when user selects yes
    } catch (err) {
      // when user selects no
    }
  };

  return <button onClick={onSubmit}>Delete Query?</button>;
}
```

#### Prompt

This is a basic text input for requesting user input in free-form text, ideal for short-and-single inputs.

![image](https://github.com/synle/react-mui-action-dialog/assets/3792401/e3eade16-0fec-44d7-aa2e-aad9deaf3b55)

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

This presents a list of options for the user to choose from, similar to a single-select dropdown. The user must select one option.

![image](https://github.com/synle/react-mui-action-dialog/assets/3792401/54be7d21-2fa7-46cd-b5d9-c5d000061837)

```tsx
function ChoiceExample() {
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

This displays custom modal content, suitable for complex use cases.

![image](https://github.com/synle/react-mui-action-dialog/assets/3792401/89f18eeb-a6cb-4b28-bb12-03c3dd5afaad)

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
        )
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

#### Additional Samples:

For more code samples, you can find them in the Storybook examples located here: https://github.com/synle/react-mui-action-dialog/tree/main/src/stories

## Future Plans

- [ ] Set up CI/CD pipeline to release this as an official npm package.
- [ ] Enhance the dismiss dialog API for easy dismissal of custom dialog content.
- [ ] Implement support for multi-select in the choice dialog.
