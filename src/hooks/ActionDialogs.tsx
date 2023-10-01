import { createContext, useContext, useState } from 'react';
import ActionDialogs from '../components/ActionDialogs';
import { AlertInput } from '../components/ActionDialogs/AlertDialog';
import { ChoiceInput, ChoiceOption } from '../components/ActionDialogs/ChoiceDialog';
import { ModalInput } from '../components/ActionDialogs/ModalDialog';
import { PromptInput } from '../components/ActionDialogs/PromptDialog';

type BaseDialog = {
  key: string;
};

type AlertActionDialog = BaseDialog &
  AlertInput & {
    type: 'alert';
    message: string | JSX.Element;
    onSubmit?: () => void;
  };

type ConfirmActionDialog = BaseDialog & {
  type: 'confirm';
  message: string | JSX.Element;
  yesLabel?: string;
  onSubmit: (yesSelected: boolean) => void;
};

type ChoiceActionDialog = BaseDialog &
  ChoiceInput & {
    type: 'choice';
    onSubmit: (yesSelected: boolean, selectedChoice?: string) => void;
  };

type PromptActionDialog = BaseDialog &
  PromptInput & {
    type: 'prompt';
    onSubmit: (yesSelected: boolean, newValue?: string) => void;
  };

type ModalActionDialog = BaseDialog &
  ModalInput & {
    type: 'modal';
    onSubmit: (closed: boolean) => void;
  };

type ActionDialog =
  | AlertActionDialog
  | ConfirmActionDialog
  | PromptActionDialog
  | ChoiceActionDialog
  | ModalActionDialog;

let _actionDialogs: ActionDialog[] = [];

let modalId = Date.now();

//
const TargetContext = createContext({
  data: _actionDialogs,
  setData: (_newDialogs: ActionDialog[]) => {},
});

export function ActionDialogsContext(props: { children: JSX.Element }): JSX.Element | null {
  // State to hold the theme value
  const [data, setData] = useState(_actionDialogs);
  // Provide the theme value and toggle function to the children components
  return (
    <TargetContext.Provider value={{ data, setData }}>
      {props.children}
      <ActionDialogs />
    </TargetContext.Provider>
  );
}

export function useActionDialogs() {
  const { data, setData } = useContext(TargetContext)!;

  const prompt = (props: PromptInput): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      _actionDialogs.push({
        key: `modal.${modalId++}`,
        type: 'prompt',
        onSubmit: (yesSelected, newValue) => {
          yesSelected ? resolve(newValue) : reject();
        },
        ...props,
      });
      _invalidateQueries();
    });
  };

  const confirm = (message: string | JSX.Element, yesLabel?: string): Promise<void> => {
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
  };

  const choice = (
    title: string,
    message: string | JSX.Element,
    options: ChoiceOption[],
    required?: boolean,
  ): Promise<string> => {
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
  };

  const alert = (message: string | JSX.Element): Promise<void> => {
    return new Promise((resolve, reject) => {
      _actionDialogs.push({
        key: `modal.${modalId++}`,
        type: 'alert',
        message,
      });
      _invalidateQueries();
    });
  };

  const modal = (props: ModalInput): Promise<void> => {
    return new Promise((resolve, reject) => {
      _actionDialogs.push({
        key: `modal.${modalId++}`,
        type: 'modal',
        onSubmit: () => {},
        ...props,
      });
      _invalidateQueries();
    });
  };

  let dialog;
  try {
    if (data) {
      dialog = data[data.length - 1];
    }
  } catch (err) {
    dialog = undefined;
  }

  const dismiss = (modalIdToDismiss?: string) => {
    if (modalIdToDismiss) {
      _actionDialogs = _actionDialogs.filter((modal) => modal.key !== modalIdToDismiss);
    } else {
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
    alert,
    prompt,
    confirm,
    choice,
    dismiss,
    modal,
  };
}
