import React, { Fragment, ReactNode, RefObject, useRef } from 'react';
import AlertDialog from './AlertDialog';
import { ChoiceOption, MultipleChoiceDialog, SingleChoiceDialog } from './ChoiceDialog';
import ModalDialog, { ModalInput } from './ModalDialog';
import PromptDialog, { PromptInput } from './PromptDialog';
import { Store, useStore } from './store';
import { ActionDialog, ActionDialogRef, BaseActionDialogInput } from './types';

const _dialogStore = new Store<{ data: ActionDialog[] }>({
  data: [],
});

let _modalIdx = 0;

/**
 * This is the main component used to describe the dialog construction
 * @returns
 */
function ActionDialogs() {
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

export function ActionDialogsContext(props: { children: ReactNode }) {
  return (
    <>
      {props.children}
      <ActionDialogs />
    </>
  );
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

export function useActionDialogs() {
  let dialogs = useStore(_dialogStore, (s) => s.data) || [];
  let dialog = dialogs.length > 0 ? dialogs[dialogs.length - 1] : undefined;

  function _invalidateQueries() {
    _dialogStore.setState({
      data: [...dialogs],
    });
  }

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

  function createDialog<T>(
    type: string,
    props: BaseActionDialogInput & any,
    defaultTitle: string = '',
    customHandler?: (resolve: (value: T) => void, reject: () => void, newValue?: any) => void,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const { title, message, ...restProps } = props;

      // We need to pass the dismiss function directly here
      const dismiss = (toDismissModalId?: string) => {
        if (toDismissModalId) {
          dialogs = dialogs.filter((modal) => modal.id !== toDismissModalId);
        } else {
          dialogs.pop();
        }
        _invalidateQueries();
      };

      const modalId = _getModalId(props.modalRef!, dismiss);

      dialogs.push({
        id: modalId,
        type,
        title: title || defaultTitle,
        message,
        ...restProps,
        onSubmit: (newValue?: any) => {
          if (customHandler) {
            customHandler(resolve, reject, newValue);
          } else {
            resolve(newValue as T);
          }
        },
      });

      _invalidateQueries();
    });
  }

  const ActionDialogHooks = {
    dialogs,
    dialog,
    dismiss: (toDismissModalId?: string) => {
      if (toDismissModalId) {
        dialogs = dialogs.filter((modal) => modal.id !== toDismissModalId);
      } else {
        dialogs.pop();
      }
      _invalidateQueries();
    },

    alert: (props: BaseActionDialogInput & { yesLabel?: string }): Promise<void> =>
      createDialog('alert', { ...props, yesLabel: props.yesLabel || 'OK' }, 'Alert'),

    confirm: (props: BaseActionDialogInput & { yesLabel?: string }): Promise<void> =>
      createDialog('confirm', props, 'Confirmation?'),

    prompt: (props: BaseActionDialogInput & Partial<PromptInput>): Promise<string> =>
      createDialog('prompt', props, 'Prompt?', (resolve, reject, newValue) => {
        newValue ? resolve(newValue) : reject();
      }),

    choiceSingle: (
      props: BaseActionDialogInput & {
        options: ChoiceOption[];
        required?: boolean;
        value?: string;
      },
    ): Promise<string> =>
      createDialog('choice-single', props, '', (resolve, reject, newValue) => {
        newValue ? resolve(newValue) : reject();
      }),

    choiceMultiple: (
      props: BaseActionDialogInput & {
        options: ChoiceOption[];
        required?: boolean;
        value?: string[];
      },
    ): Promise<string[]> => createDialog('choice-multiple', props),

    modal: (props: BaseActionDialogInput & Partial<ModalInput>): Promise<void> =>
      createDialog('modal', { ...props, size: props.size || 'sm' }),
  };

  return ActionDialogHooks;
}
