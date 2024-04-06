import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, createContext, useContext, useState } from 'react';
import AlertDialog from './AlertDialog';
import ChoiceDialog from './ChoiceDialog';
import ModalDialog from './ModalDialog';
import PromptDialog from './PromptDialog';
let _actionDialogs = [];
let modalId = Date.now();
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
export default function ActionDialogs(props) {
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
                    contentDom = (_jsx(AlertDialog, { open: true, title: 'Alert', message: dialog.message, onDismiss: onDimiss, isConfirm: false }));
                    break;
                case 'confirm':
                    contentDom = (_jsx(AlertDialog, { open: true, title: 'Confirmation', message: dialog.message, yesLabel: dialog.yesLabel, onYesClick: onConfirmSubmit, onDismiss: onDimiss, isConfirm: true }));
                    break;
                case 'prompt':
                    contentDom = (_jsx(PromptDialog, { open: true, title: dialog.title, message: dialog.message, value: dialog.value, onSaveClick: onPromptSaveClick, onDismiss: onDimiss, languageMode: dialog.languageMode, isLongPrompt: dialog.isLongPrompt, saveLabel: dialog.saveLabel, required: dialog.required, readonly: dialog.readonly }));
                    break;
                case 'choice':
                    contentDom = (_jsx(ChoiceDialog, { open: true, title: dialog.title, message: dialog.message, options: dialog.options, onSelect: onChoiceSelect, onDismiss: onDimiss, required: dialog.required }));
                    break;
                case 'modal':
                    contentDom = (_jsx(ModalDialog, { open: true, title: dialog.title, message: dialog.message, onDismiss: onDimiss, showCloseButton: !!dialog.showCloseButton, disableBackdropClick: !!dialog.disableBackdropClick, size: dialog.size }));
                    break;
            }
            return _jsx(Fragment, { children: contentDom }, idx);
        }) }));
}
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
    const dismiss = (modalIdToDismiss) => {
        if (modalIdToDismiss) {
            _actionDialogs = _actionDialogs.filter((modal) => modal.key !== modalIdToDismiss);
        }
        else {
            _actionDialogs.pop();
        }
        _invalidateQueries();
    };
    function _invalidateQueries() {
        _actionDialogs = [..._actionDialogs];
        setData(_actionDialogs);
    }
    return {
        dialogs: data,
        dialog,
        dismiss,
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
        alert: (message) => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push({
                    key: `modal.${modalId++}`,
                    type: 'alert',
                    message,
                });
                _invalidateQueries();
            });
        },
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
        prompt: (props) => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push(Object.assign({ key: `modal.${modalId++}`, type: 'prompt', onSubmit: (yesSelected, newValue) => {
                        yesSelected ? resolve(newValue) : reject();
                    } }, props));
                _invalidateQueries();
            });
        },
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
        confirm: (message, yesLabel) => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push({
                    key: `modal.${modalId++}`,
                    type: 'confirm',
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
        choice: (title, message, options, required) => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push({
                    key: `modal.${modalId++}`,
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
        modal: (props) => {
            return new Promise((resolve, reject) => {
                _actionDialogs.push(Object.assign({ key: `modal.${modalId++}`, type: 'modal', onSubmit: () => {
                        resolve();
                    } }, props));
                _invalidateQueries();
            });
        },
    };
}
//# sourceMappingURL=ActionDialogsContext.js.map