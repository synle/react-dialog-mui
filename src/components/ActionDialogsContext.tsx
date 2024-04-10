import React from 'react';
import { Fragment, ReactNode, RefObject, createContext, useContext, useRef, useState } from 'react';
import AlertDialog from './AlertDialog';
import { ChoiceOption, SingleChoiceDialog, MultipleChoiceDialog } from './ChoiceDialog';
import ModalDialog, { ModalInput } from './ModalDialog';
import PromptDialog, { PromptInput } from './PromptDialog';
import { ActionDialog, ActionDialogRef, BaseActionDialogInput } from './types';

let _actionDialogs: ActionDialog[] = [];

let _modalIdx = 0;
function _getModalId(modalRef: RefObject<ActionDialogRef>, dismiss: (id: string) => void) {
  const modalId = `modal.${_modalIdx++}.${Date.now()}`;

  if (modalRef && modalRef.current) {
    modalRef.current.id = modalId;
    modalRef.current.dismiss = () => {
      dismiss(modalId);
    };
  }

  return modalId;
}

//
const TargetContext = createContext({
  data: _actionDialogs,
  setData: (_newDialogs: ActionDialog[]) => {},
});

export function ActionDialogsContext(props: { children: ReactNode }) {
  const [data, setData] = useState(_actionDialogs);

  return (
    <TargetContext.Provider value={{ data, setData }}>
      {props.children}
      <ActionDialogs />
    </TargetContext.Provider>
  );
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

  return (
    <>
      {dialogs.map((dialog, idx) => {
        if (!dialog) {
          return null;
        }

        const onDimiss = () => {
          dismiss();
        };

        let contentDom = <></>;
        switch (dialog.type) {
          case 'alert':
            contentDom = (
              <AlertDialog
                id={dialog.id}
                open={true}
                title={dialog.title}
                message={dialog.message}
                yesLabel={dialog.yesLabel}
                onYesClick={() => {
                  dismiss();
                  dialog.onSubmit && dialog.onSubmit();
                }}
                onDismiss={onDimiss}
                isConfirm={false}
              />
            );
            break;
          case 'confirm':
            contentDom = (
              <AlertDialog
                id={dialog.id}
                open={true}
                title={dialog.title}
                message={dialog.message}
                yesLabel={dialog.yesLabel}
                onYesClick={() => {
                  dismiss();
                  dialog.onSubmit && dialog.onSubmit();
                }}
                onDismiss={onDimiss}
                isConfirm={true}
              />
            );
            break;
          case 'prompt':
            contentDom = (
              <PromptDialog
                id={dialog.id}
                open={true}
                title={dialog.title}
                message={dialog.message}
                value={dialog.value}
                onSaveClick={(newValue: string) => {
                  dismiss();
                  dialog.onSubmit && dialog.onSubmit(newValue);
                }}
                onDismiss={onDimiss}
                isLongPrompt={dialog.isLongPrompt}
                saveLabel={dialog.saveLabel}
                required={dialog.required}
                readonly={dialog.readonly}
              />
            );
            break;
          case 'choice-single':
            contentDom = (
              <SingleChoiceDialog
                id={dialog.id}
                open={true}
                title={dialog.title}
                message={dialog.message}
                value={dialog?.value}
                options={dialog.options}
                onSelect={(newValue?: string) => {
                  dismiss();
                  dialog.onSubmit && dialog.onSubmit(newValue);
                }}
                onDismiss={onDimiss}
                required={dialog.required}
              />
            );
            break;
          case 'choice-multiple':
            contentDom = (
              <MultipleChoiceDialog
                id={dialog.id}
                open={true}
                title={dialog.title}
                message={dialog.message}
                value={dialog?.value}
                options={dialog.options}
                onSelect={(newValue: string[]) => {
                  dismiss();
                  dialog.onSubmit && dialog.onSubmit(newValue);
                }}
                onDismiss={onDimiss}
                required={dialog.required}
              />
            );
            break;
          case 'modal':
            contentDom = (
              <ModalDialog
                id={dialog.id}
                open={true}
                title={dialog.title}
                message={dialog.message}
                onDismiss={onDimiss}
                showCloseButton={!!dialog.showCloseButton || true}
                disableBackdropClick={!!dialog.disableBackdropClick}
                size={dialog.size}
              />
            );
            break;
        }

        return <Fragment key={idx}>{contentDom}</Fragment>;
      })}
    </>
  );
}

/**
 * This is the main hook for the component
 * @returns
 */
export function useActionDialogs() {
  const { data, setData } = useContext(TargetContext)!;

  let dialog: ActionDialog | undefined = undefined;
  try {
    if (data) {
      dialog = data[data.length - 1];
    }
  } catch (err) {}

  function _invalidateQueries() {
    _actionDialogs = [..._actionDialogs];
    setData(_actionDialogs);
  }

  const ActionDialogHooks = {
    dialogs: data,
    dialog,
    dismiss: (toDismissModalId?: string) => {
      if (toDismissModalId) {
        _actionDialogs = _actionDialogs.filter((modal) => modal.id !== toDismissModalId);
      } else {
        _actionDialogs.pop();
      }
      _invalidateQueries();
    },
    /**
     * This alerts a simple message with an OK button, informing the user of an event. Useful for displaying messages.
     * https://github.com/synle/react-dialog-mui?tab=readme-ov-file#alert
     *
     * @param props
     * @returns
     */
    alert: (
      props: BaseActionDialogInput & {
        yesLabel?: string;
      },
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        const { title, message, yesLabel } = props;

        const modalId = _getModalId(props.modalRef!, ActionDialogHooks.dismiss);

        _actionDialogs.push({
          id: modalId,
          type: 'alert',
          title: title || 'Alert',
          message,
          yesLabel: yesLabel || 'OK',
          onSubmit: () => {
            resolve();
          },
        });
        _invalidateQueries();
      });
    },
    /**
     * This prompts the user for a yes or no confirmation regarding an event.
     * https://github.com/synle/react-dialog-mui?tab=readme-ov-file#confirm
     *
     * @param props
     * @returns
     */
    confirm: (
      props: BaseActionDialogInput & {
        yesLabel?: string;
      },
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        const { title, message, yesLabel } = props;

        const modalId = _getModalId(props.modalRef!, ActionDialogHooks.dismiss);

        _actionDialogs.push({
          id: modalId,
          type: 'confirm',
          title: title || 'Confirmation?',
          message,
          yesLabel,
          onSubmit: () => {
            resolve();
          },
        });
        _invalidateQueries();
      });
    },
    /**
     * This is a basic text input for requesting user input in free-form text, ideal for short-and-single inputs.
     * https://github.com/synle/react-dialog-mui?tab=readme-ov-file#prompt
     *
     * @param props
     * @returns
     */
    prompt: (props: BaseActionDialogInput & Partial<PromptInput>): Promise<string> => {
      return new Promise((resolve, reject) => {
        const { title, message, value } = props;

        const modalId = _getModalId(props.modalRef!, ActionDialogHooks.dismiss);

        _actionDialogs.push({
          id: modalId,
          type: 'prompt',
          title: title || 'Prompt?',
          message,
          value,
          onSubmit: (newValue) => {
            newValue ? resolve(newValue) : reject();
          },
        });
        _invalidateQueries();
      });
    },
    /**
     * This presents a list of options for the user to choose from, similar to a single-select dropdown.
     * The user must select one option.
     * https://github.com/synle/react-dialog-mui?tab=readme-ov-file#single-select-choice
     *
     * @param props
     * @returns
     */
    choiceSingle: (
      props: BaseActionDialogInput & {
        options: ChoiceOption[];
        required?: boolean;
        value?: string;
      },
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        const { title, message, options, required, value } = props;

        const modalId = _getModalId(props.modalRef!, ActionDialogHooks.dismiss);

        _actionDialogs.push({
          id: modalId,
          type: 'choice-single',
          title,
          message,
          options,
          required,
          value,
          onSubmit: (newValue) => {
            if (newValue) {
              return resolve(newValue);
            }

            // else
            reject();
          },
        });

        _invalidateQueries();
      });
    },
    /**
     * This presents a list of options for the user to choose from, similar to a checkbox list.
     * The user can select more than options from the list.
     * https://github.com/synle/react-dialog-mui?tab=readme-ov-file#multi-select-choice
     *
     * @param props
     * @returns
     */
    choiceMultiple: (
      props: BaseActionDialogInput & {
        options: ChoiceOption[];
        required?: boolean;
        value?: string[];
      },
    ): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        const { title, message, options, required, value } = props;

        const modalId = _getModalId(props.modalRef!, ActionDialogHooks.dismiss);

        _actionDialogs.push({
          id: modalId,
          type: 'choice-multiple',
          title,
          message,
          options,
          required,
          value,
          onSubmit: (newValue) => {
            resolve(newValue);
          },
        });

        _invalidateQueries();
      });
    },
    /**
     * This displays custom modal content, suitable for complex use cases.
     * https://github.com/synle/react-dialog-mui?tab=readme-ov-file#modal
     *
     * @param props
     * @returns
     */
    modal: (props: BaseActionDialogInput & Partial<ModalInput>): Promise<void> => {
      return new Promise((resolve, reject) => {
        const modalId = _getModalId(props.modalRef!, ActionDialogHooks.dismiss);

        _actionDialogs.push({
          ...props,
          id: modalId,
          type: 'modal',
          size: props.size || 'sm',
          onSubmit: () => {
            resolve();
          },
        });

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
  return useRef<ActionDialogRef>({
    id: '',
    dismiss: () => {},
  });
};
