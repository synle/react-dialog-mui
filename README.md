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

```tsx
// then call it in your component
function MyComponent() {
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

```tsx
// then call it in your component
function MyComponent() {
  const onSubmit = async () => {
    try {
      const newName = await prompt({
        title: 'Rename Query',
        message: 'New Query Name',
        value: query.name,
        saveLabel: 'Save',
      });
      await connectionQueries.onChangeQuery(query.id, {
        name: newName,
      });
    } catch (err) {}
  };

  return <button onClick={onSubmit}>Rename Query?</button>;
}
```
