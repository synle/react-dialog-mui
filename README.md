# react-mui-action-dialog

## How to use?
```bash
npm i github:synle/react-mui-action-dialog#main;
```

### Add the action dialog context to your root
```tsx
// const { ActionDialogsContext } = require('react-mui-action-dialog');
// import { ActionDialogsContext } from 'react-mui-action-dialog';

//...
<ActionDialogsContext>
  <YourApp>
</ActionDialogsContext>
//...
```

###
```tsx
// const { useActionDialogs } = require('react-mui-action-dialog');
// import  { useActionDialogs } from 'react-mui-action-dialog';

// in your component
const { alert,
    prompt,
    confirm,
    choice,
    dismiss,
    modal,
    } = useActionDialogs();
```
