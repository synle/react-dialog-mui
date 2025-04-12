# react-dialog-mui

This React library simplifies the usage of Material-UI dialogs, removing the need to manage states manually. It offers convenient replicas of standard JavaScript dialog methods such as `alert`, `confirm`, and `prompt`, streamlining the implementation of common UX flows.

The library internally utilizes React Context to handle states, ensuring compatibility with most versions of React from version 17 onward.

## Why?

The MUI Dialogs codebase is overly complex and lacks functionality. While the built-in JavaScript methods for alert, confirm, and prompt offer simplicity, they're not customizable and may fall short for complex scenarios.

My aim with this library is to create a user-friendly solution that meets both ease-of-use and complex use case requirements.

## How to use?

```bash
npm install --save react-dialog-mui

yarn add react-dialog-mui
```

I've created some repos using Create React Application script. You can reference the sample repos here:

- With typescript: https://github.com/synle/react-dialog-mui-cra-ts-sample
- With javascript: https://github.com/synle/react-dialog-mui-cra-js-sample

### Add the action dialog context to your root

To begin, wrap your app with ActionDialogsContext, a React context consumer that manages the dialog stack state.

```tsx
// then wrap your app with with the ActionDialogContext
import { ActionDialogsContext } from 'react-dialog-mui';

function YourApp() {
  return (
    <ActionDialogsContext>
      <YourAppComponent />
    </ActionDialogsContext>
  );
}
```

### Use the ActionDialog hooks

#### Alert

This alerts a simple message with an OK button, informing the user of an event. Useful for displaying messages.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/7811010b-3c3b-45f3-ae9d-6144641c585f)

```tsx
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
```

#### Confirm

This prompts the user for a yes or no confirmation regarding an event.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/ec9217d4-407a-4c7f-8fb2-67b4630c86e1)

```tsx
import React, { useState } from 'react';
import { useActionDialogs } from 'react-dialog-mui';

export function ConfirmExample() {
  const { confirm } = useActionDialogs();
  const [deleted, setDeleted] = useState(false);

  const onSubmit = async () => {
    try {
      await confirm({
        title: <>Confirmation?</>,
        message: <>Do you want to delete this query?</>,
        yesLabel: `Delete`,
      });

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
```

#### Prompt

This is a basic text input for requesting user input in free-form text, ideal for short-and-single inputs.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/e3eade16-0fec-44d7-aa2e-aad9deaf3b55)

```tsx
import React, { useState } from 'react';
import { useActionDialogs } from 'react-dialog-mui';

export function PromptExample() {
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
```

#### Single Select Choice

This presents a list of options for the user to choose from, similar to a single-select dropdown. The user must select one option.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/1e9474c7-f5e0-42e0-98c2-d15996603bef)

```tsx
import React, { useState } from 'react';
import { useActionDialogs } from 'react-dialog-mui';

export function SingleSelectChoiceExample() {
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
```

#### Multi Select Choice

This presents a list of options for the user to choose from, similar to a checkbox list. The user can select more than options from the list.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/3ffa65f3-513a-4daf-aa9e-09b982df9aee)

```tsx
import React, { useState } from 'react';
import { useActionDialogs } from 'react-dialog-mui';

export function MultiSelectChoiceExample() {
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
```

#### Modal

This displays custom modal content, suitable for complex use cases.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/89f18eeb-a6cb-4b28-bb12-03c3dd5afaad)

```tsx
import React from 'react';
import { useActionDialogs } from 'react-dialog-mui';

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

#### Reference your own component

If you prefer not to use inline components, you can define your component separately and then include it in the react hook.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/492ad10f-125c-4eb7-917b-6e893a878b4e)

```tsx
import React from 'react';
import { useActionDialogs } from 'react-dialog-mui';

function MyChildComponent() {
  return (
    <>
      <div>Hello world</div>
    </>
  );
}

export function ModalExampleWithChildComponent() {
  const { modal } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Simple Modal',
        message: <MyChildComponent />,
        modalRef: modalRef,
        size: 'sm',
      });

      // when users close out of modal
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Show Modal</button>
    </>
  );
}
```

##### Dismiss the modal programmatically

Manual dismissal post-action, like form submission or interactions can be achieved via `useActionDialogRef` and `dismiss()`. Here's a sample code snippet.

###### Simplest example with Alert

This example shows how to set up `modalRef` and calling `dismiss` to dimiss the alert

```tsx
import React from 'react';
import { useActionDialogs, useActionDialogRef } from 'react-dialog-mui';

export function AlertExampleWithManualDismiss() {
  const { alert } = useActionDialogs();
  const modalRef = useActionDialogRef();

  const onSubmit = async () => {
    try {
      await alert({
        title: <>Query Result</>,
        message: (
          <>
            <div>The query has successfully executed.</div>
            <button onClick={() => modalRef.current.dismiss()}>Close this modal and retry</button>
          </>
        ),
        modalRef,
      });
    } catch (err) {}
  };

  return <button onClick={onSubmit}>My Action</button>;
}
```

###### Dismiss via button click

This example features a modal with a dismiss button, allowing control from your component.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/d51e1726-bdb0-4d99-86cd-79d87d730afc)

```tsx
import React from 'react';
import { useActionDialogRef, useActionDialogs } from 'react-dialog-mui';

export function ModalExampleWithManualDismiss() {
  const { modal } = useActionDialogs();
  const modalRef = useActionDialogRef();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Manual Dismiss Modal',
        message: (
          <>
            <div>
              <button onClick={() => modalRef.current.dismiss()}>
                Manually dismiss this dialog
              </button>
            </div>
          </>
        ),
        modalRef: modalRef,
        size: 'sm',
      });

      // when users close out of modal
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Show Modal</button>
    </>
  );
}
```

###### Dismiss via form submission

This example features a modal with a form. Upon form submission, the modal closes automatically.

![image](https://github.com/synle/react-dialog-mui/assets/3792401/3b9896cd-d334-4b40-8503-385e55b5bc78)

```tsx
import React from 'react';
import { useActionDialogRef, useActionDialogs } from 'react-dialog-mui';

export function ModalExampleWithFormSubmit() {
  const { modal } = useActionDialogs();
  const modalRef = useActionDialogRef();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Login Modal',
        message: (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              modalRef.current.dismiss();
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type='text' placeholder='Username' required />
            <input type='password' placeholder='Password' required />
            <div>
              <button type='submit'>Login</button>
            </div>
          </form>
        ),
        modalRef: modalRef,
        size: 'sm',
      });

      // when users close out of modal
    } catch (err) {}
  };

  return (
    <>
      <button onClick={onSubmit}>Show Modal</button>
    </>
  );
}
```

#### Additional Samples:

For more code samples, you can find them in the Storybook examples located here: https://github.com/synle/react-dialog-mui/tree/main/src/stories .

I published a blog post, you can refer to the link for more information about the motivation behind this library here: https://www.linkedin.com/article/edit/7182404170941972480/

### Local Dev Storybook

I've set up the Storybook locally. You can interact with the live demo on your local machine. Use the following setup:

```bash
npm install
npm run dev

# then open http://localhost:6006/
```

## Future Plans

- [x] Set up CI/CD pipeline to release this as an official npm package.
- [x] Enhance the dismiss dialog API for easy dismissal of custom dialog content.
- [x] Implement support for multi-select in the choice dialog.
