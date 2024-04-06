import { ReactNode } from 'react';
import { AlertInput } from './AlertDialog';
import { ChoiceInput, ChoiceOption } from './ChoiceDialog';
import { ModalInput } from './ModalDialog';
import { PromptInput } from './PromptDialog';
/**
 * base type used in all the dialog input
 */
export type BaseDialogInput = {
    key: string;
};
type BaseDialog = BaseDialogInput;
type AlertActionDialog = BaseDialog & AlertInput & {
    type: 'alert';
    message: ReactNode;
    onSubmit?: () => void;
};
type ConfirmActionDialog = BaseDialog & {
    type: 'confirm';
    message: ReactNode;
    yesLabel?: string;
    onSubmit: (yesSelected: boolean) => void;
};
type ChoiceActionDialog = BaseDialog & ChoiceInput & {
    type: 'choice';
    onSubmit: (yesSelected: boolean, selectedChoice?: string) => void;
};
type PromptActionDialog = BaseDialog & PromptInput & {
    type: 'prompt';
    onSubmit: (yesSelected: boolean, newValue?: string) => void;
};
type ModalActionDialog = BaseDialog & ModalInput & {
    type: 'modal';
    onSubmit: (closed: boolean) => void;
};
type ActionDialog = AlertActionDialog | ConfirmActionDialog | PromptActionDialog | ChoiceActionDialog | ModalActionDialog;
export declare function ActionDialogsContext(props: {
    children: ReactNode;
}): ReactNode;
type ActionDialogsProps = {};
export default function ActionDialogs(props: ActionDialogsProps): ReactNode;
export declare function useActionDialogs(): {
    dialogs: ActionDialog[];
    dialog: any;
    dismiss: (modalIdToDismiss?: string) => void;
    /**
     *
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
    * @param message
    * @returns
    */
    alert: (message: ReactNode) => Promise<void>;
    /**
     This is a simple text input used to ask user to enter a free form text.

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

    * @param props
    * @returns
    */
    prompt: (props: PromptInput) => Promise<string | undefined>;
    /**
     This is a yes/no confimation.

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
    * @param message
    * @param yesLabel
    * @returns
    */
    confirm: (message: ReactNode, yesLabel?: string) => Promise<void>;
    /**

    This is to display a list of choice which the user needs to select one of the choice

    ```
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

     * @param title
     * @param message
     * @param options
     * @param required
     * @returns
     */
    choice: (title: string, message: ReactNode, options: ChoiceOption[], required?: boolean) => Promise<string>;
    /**
     This is used to show any custom modal content.

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
    modal: (props: ModalInput) => Promise<void>;
};
export {};
