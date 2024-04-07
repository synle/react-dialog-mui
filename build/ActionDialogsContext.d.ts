import { ReactNode, RefObject } from 'react';
import { ChoiceOption } from './ChoiceDialog';
import { ModalInput } from './ModalDialog';
import { PromptInput } from './PromptDialog';
import { ActionDialog, ActionDialogRef } from './types';
export declare function ActionDialogsContext(props: {
    children: ReactNode;
}): ReactNode;
/**
 * This is the main component used to describe the dialog construction
 * @returns
 */
export default function ActionDialogs(): ReactNode;
/**
 * This is the main hook for the component
 * @returns
 */
export declare function useActionDialogs(): {
    dialogs: ActionDialog[];
    dialog: any;
    dismiss: (toDismissModalId?: string) => void;
    /**
     *
This alerts a simple message with an OK button, informing the user of an event.

```tsx
function MyComponent() {
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
    * @param message
    * @param primaryActionLabel
    * @param title
    * @returns
    */
    alert: (message: ReactNode, primaryActionLabel?: string, title?: ReactNode) => Promise<void>;
    /**
     This is a basic text input for requesting user input in free-form text, ideal for short-and-single inputs.

```tsx
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
    * @param props
    * @returns
    */
    prompt: (props: PromptInput) => Promise<string>;
    /**
     This prompts the user for a yes or no confirmation regarding an event.

```tsx
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
    * @param message
    * @param yesLabel
    * @param title
    * @returns
    */
    confirm: (message: ReactNode, yesLabel?: string, title?: ReactNode) => Promise<void>;
    /**

    This presents a list of options for the user to choose from, similar to a single-select dropdown. The user must select one option.

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
     * @param title
     * @param message
     * @param options
     * @param required
     * @returns
     */
    choice: (title: string, message: ReactNode, options: ChoiceOption[], required?: boolean) => Promise<string>;
    /**
     This displays custom modal content, suitable for complex use cases.

```tsx
function ModalExample() {
  const { modal } = useActionDialogs();

  const onSubmit = async () => {
    try {
      await modal({
        title: 'Query Details',
        message: <>
          <div><strong>Name:</strong> Sample Mocked Query</div>
          <div><strong>Status:</strong> Pending</div>
          <div><strong>Created Date:</strong> {new Date().toLocaleDateString()}</div>
        </>,
        size: 'md'
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
     * @param props
     * @returns
     */
    modal: (props: ModalInput & {
        modalRef?: RefObject<ActionDialogRef>;
    }) => Promise<void>;
};
/**
 * This hook can be used to dismiss the modal programatically
 * @returns
 */
export declare const useActionDialogRef: () => import("react").MutableRefObject<ActionDialogRef>;
