/// <reference types="react" />
import { AlertInput } from '../components/ActionDialogs/AlertDialog';
import { ChoiceInput, ChoiceOption } from '../components/ActionDialogs/ChoiceDialog';
import { ModalInput } from '../components/ActionDialogs/ModalDialog';
import { PromptInput } from '../components/ActionDialogs/PromptDialog';
type BaseDialog = {
    key: string;
};
type AlertActionDialog = BaseDialog & AlertInput & {
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
    children: JSX.Element;
}): JSX.Element | null;
export declare function useActionDialogs(): {
    dialogs: ActionDialog[];
    dialog: any;
    alert: (message: string | JSX.Element) => Promise<void>;
    prompt: (props: PromptInput) => Promise<string | undefined>;
    confirm: (message: string | JSX.Element, yesLabel?: string) => Promise<void>;
    choice: (title: string, message: string | JSX.Element, options: ChoiceOption[], required?: boolean) => Promise<string>;
    dismiss: (modalIdToDismiss?: string) => void;
    modal: (props: ModalInput) => Promise<void>;
};
export {};
