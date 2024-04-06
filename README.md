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
```
