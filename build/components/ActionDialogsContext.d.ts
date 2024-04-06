import { ReactNode } from 'react';
import { AlertInput } from './AlertDialog';
import { ChoiceInput, ChoiceOption } from './ChoiceDialog';
import { ModalInput } from './ModalDialog';
import { PromptInput } from './PromptDialog';
type BaseDialog = {
    key: string;
};
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
export declare function useActionDialogs(): {
    dialogs: ActionDialog[];
    dialog: any;
    alert: (message: ReactNode) => Promise<void>;
    prompt: (props: PromptInput) => Promise<string | undefined>;
    confirm: (message: ReactNode, yesLabel?: string) => Promise<void>;
    choice: (title: string, message: ReactNode, options: ChoiceOption[], required?: boolean) => Promise<string>;
    dismiss: (modalIdToDismiss?: string) => void;
    modal: (props: ModalInput) => Promise<void>;
};
export {};
