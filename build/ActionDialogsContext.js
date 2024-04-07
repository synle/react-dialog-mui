import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, createContext, useContext, useRef, useState } from 'react';
import AlertDialog from './AlertDialog';
import ChoiceDialog from './ChoiceDialog';
import ModalDialog from './ModalDialog';
import PromptDialog from './PromptDialog';
let _actionDialogs = [];
let modalId = 0;
function _getModalId() {
    return `modal.${modalId++}.${Date.now()}`;
}
//
const TargetContext = createContext({
    data: _actionDialogs,
    setData: (_newDialogs) => { },
});
export function ActionDialogsContext(props) {
    // State to hold the theme value
    const [data, setData] = useState(_actionDialogs);
    // Provide the theme value and toggle function to the children components
    return (_jsxs(TargetContext.Provider, { value: { data, setData }, children: [props.children, _jsx(ActionDialogs, {})] }));
}
/**
 * This is the main component used to describe the dialog construction
 * @returns
 */
export default function ActionDialogs() {
    const { dialogs, dismiss } = useActionDialogs();
    if (!dialogs || dialogs.length === 0) {
        return null;
    }
    return (_jsx(_Fragment, { children: dialogs.map((dialog, idx) => {
            if (!dialog) {
                return null;
            }
            const onConfirmSubmit = () => {
                dismiss();
                dialog.onSubmit && dialog.onSubmit(true);
            };
            const onPromptSaveClick = (newValue) => {
                dismiss();
                dialog.onSubmit && dialog.onSubmit(true, newValue);
            };
            const onChoiceSelect = (newValue) => {
                dismiss();
                dialog.onSubmit && dialog.onSubmit(true, newValue);
            };
            const onDimiss = () => {
                dismiss();
                dialog.onSubmit && dialog.onSubmit(false);
            };
            let contentDom = _jsx(_Fragment, {});
            switch (dialog.type) {
                case 'alert':
                    contentDom = (_jsx(AlertDialog, { id: dialog.id, open: true, title: dialog.title, message: dialog.message, yesLabel: dialog.yesLabel, onDismiss: onDimiss, isConfirm: false }));
                    break;
                case 'confirm':
                    contentDom = (_jsx(AlertDialog, { id: dialog.id, open: true, title: dialog.title, message: dialog.message, yesLabel: dialog.yesLabel, onYesClick: onConfirmSubmit, onDismiss: onDimiss, isConfirm: true }));
                    break;
                case 'prompt':
                    contentDom = (_jsx(PromptDialog, { id: dialog.id, open: true, title: dialog.title, message: dialog.message, value: dialog.value, onSaveClick: onPromptSaveClick, onDismiss: onDimiss, languageMode: dialog.languageMode, isLongPrompt: dialog.isLongPrompt, saveLabel: dialog.saveLabel, required: dialog.required, readonly: dialog.readonly }));
                    break;
                case 'choice':
                    contentDom = (_jsx(ChoiceDialog, { id: dialog.id, open: true, title: dialog.title, message: dialog.message, options: dialog.options, onSelect: onChoiceSelect, onDismiss: onDimiss, required: dialog.required }));
                    break;
                case 'modal':
                    contentDom = (_jsx(ModalDialog, { id: dialog.id, open: true, title: dialog.title, message: dialog.message, onDismiss: onDimiss, showCloseButton: !!dialog.showCloseButton || true, disableBackdropClick: !!dialog.disableBackdropClick, size: dialog.size }));
                    break;
            }
            return _jsx(Fragment, { children: contentDom }, idx);
        }) }));
}
/**
 * This is the main hook for the component
 * @returns
 */
export function useActionDialogs() {
    const { data, setData } = useContext(TargetContext);
    let dialog;
    try {
        if (data) {
            dialog = data[data.length - 1];
        }
    }
    catch (err) {
        dialog = undefined;
    }
    function _invalidateQueries() {
        _actionDialogs = [..._actionDialogs];
        setData(_actionDialogs);
    }
    const ActionDialogHooks = {
        dialogs: data,
        dialog,
        dismiss: (toDismissModalId) => {
            if (toDismissModalId) {
                _actionDialogs = _actionDialogs.filter((modal) => modal.id !== toDismissModalId);
            }
            else {
                _actionDialogs.pop();
            }
            _invalidateQueries();
        },
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
        alert: (message, primaryActionLabel, title = 'Alert') => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push({
                    id: _getModalId(),
                    type: 'alert',
                    title,
                    message,
                    yesLabel: primaryActionLabel || 'OK',
                    onSubmit: () => {
                        resolve();
                    },
                });
                _invalidateQueries();
            });
        },
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
        prompt: (props) => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push(Object.assign({ id: _getModalId(), type: 'prompt', onSubmit: (yesSelected, newValue) => {
                        yesSelected ? resolve(newValue) : reject();
                    } }, props));
                _invalidateQueries();
            });
        },
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
        confirm: (message, yesLabel, title = 'Confirmation') => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push({
                    id: _getModalId(),
                    type: 'confirm',
                    title,
                    message,
                    yesLabel,
                    onSubmit: (yesSelected) => {
                        yesSelected ? resolve() : reject();
                    },
                });
                _invalidateQueries();
            });
        },
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
        choice: (title, message, options, required) => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push({
                    id: _getModalId(),
                    type: 'choice',
                    title,
                    message,
                    options,
                    onSubmit: (yesSelected, newValue) => {
                        yesSelected && newValue ? resolve(newValue) : reject();
                    },
                    required,
                });
                _invalidateQueries();
            });
        },
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
        modal: (props) => {
            return new Promise((resolve, reject) => {
                props.size = props.size || 'md';
                const modalId = _getModalId();
                const modalRef = props.modalRef;
                if (modalRef) {
                    (modalRef.current.id = modalId),
                        (modalRef.current.dismiss = () => {
                            ActionDialogHooks.dismiss(modalId);
                        });
                }
                _actionDialogs.push(Object.assign({ id: modalId, type: 'modal', onSubmit: () => {
                        resolve();
                    } }, props));
                _invalidateQueries();
            });
        },
    };
    return ActionDialogHooks;
}
/**
 * This hook can be used to dismiss the modal programatically
 * @returns
 */
export const useActionDialogRef = () => {
    // here we attempt to provide a skeleton for the ref, the actual assignment of these happen when the dialog is hooked up
    return useRef({
        id: '',
        dismiss: () => { },
    });
};
//# sourceMappingURL=ActionDialogsContext.js.map