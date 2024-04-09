import React from 'react';
import { Fragment, ReactNode, RefObject, createContext, useContext, useRef, useState } from 'react';
import AlertDialog from './AlertDialog';
import { ChoiceOption, SingleChoiceDialog, MultipleChoiceDialog } from './ChoiceDialog';
import ModalDialog, { ModalInput } from './ModalDialog';
import PromptDialog, { PromptInput } from './PromptDialog';
import { ActionDialog, ActionDialogRef } from './types';

let _actionDialogs: ActionDialog[] = [];

let _modalIdx = 0;
function _getModalId() {
  return `modal.${_modalIdx++}.${Date.now()}`;
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

        const onConfirmSubmit = () => {
          dismiss();
          dialog.onSubmit && dialog.onSubmit(true);
        };
        const onPromptSaveClick = (newValue?: string) => {
          dismiss();
          dialog.onSubmit && dialog.onSubmit(true, newValue);
        };
        const onSingleChoiceSelect = (newValue?: string) => {
          dismiss();
          dialog.onSubmit && dialog.onSubmit(newValue);
        };
        const onMultipleChoiceSelect = (newValue: string[]) => {
          dismiss();
          dialog.onSubmit && dialog.onSubmit(newValue);
        };
        const onDimiss = () => {
          dismiss();
          dialog.onSubmit && dialog.onSubmit(false);
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
                onYesClick={onConfirmSubmit}
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
                onSaveClick={onPromptSaveClick}
                onDismiss={onDimiss}
                languageMode={dialog.languageMode}
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
                onSelect={onSingleChoiceSelect}
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
                onSelect={onMultipleChoiceSelect}
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
    alert: (
      message: ReactNode,
      primaryActionLabel?: string,
      title: ReactNode = 'Alert',
    ): Promise<void> => {
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
    prompt: (
      props: Partial<PromptInput> & {
        title: ReactNode;
        message: string;
      },
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        _actionDialogs.push({
          ...props,
          id: _getModalId(),
          type: 'prompt',
          onSubmit: (newValue) => {
            newValue ? resolve(newValue) : reject();
          },
        });
        _invalidateQueries();
      });
    },
    confirm: (
      message: ReactNode,
      yesLabel?: string,
      title: ReactNode = 'Confirmation',
    ): Promise<void> => {
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
    choice: (
      title: string,
      message: ReactNode,
      options: ChoiceOption[],
      value?: string,
      required?: boolean,
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        _actionDialogs.push({
          id: _getModalId(),
          type: 'choice-single',
          title,
          message,
          options,
          onSubmit: (newValue) => {
            if (newValue) {
              return resolve(newValue);
            }

            // else
            reject();
          },
          required,
          value
        });
        _invalidateQueries();
      });
    },
    choiceMultiple: (
      title: string,
      message: ReactNode,
      options: ChoiceOption[],
      value?: string[],
      required?: boolean,
    ): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        _actionDialogs.push({
          id: _getModalId(),
          type: 'choice-multiple',
          title,
          message,
          options,
          onSubmit: (newValue) => {
            resolve(newValue);
          },
          required,
          value
        });
        _invalidateQueries();
      });
    },
    modal: (
      props: Partial<ModalInput> & {
        title: ReactNode;
        message: ReactNode;
        modalRef?: RefObject<ActionDialogRef>;
      },
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        const modalId = _getModalId();
        const modalRef = props.modalRef;

        if (modalRef && modalRef.current) {
          modalRef.current.id = modalId;
          modalRef.current.dismiss = () => {
            ActionDialogHooks.dismiss(modalId);
          };
        }

        _actionDialogs.push({
          ...props,
          id: modalId,
          type: 'modal',
          onSubmit: () => {
            resolve();
          },
          size: props.size || 'md',
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
