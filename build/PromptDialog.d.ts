import { ReactNode } from 'react';
import { BaseDialogInput } from './ActionDialogsContext';
export type PromptInput = BaseDialogInput & {
    title?: string;
    message: string;
    value?: string;
    isLongPrompt?: boolean;
    saveLabel?: string;
    languageMode?: string;
    required?: boolean;
    readonly?: boolean;
};
export default function PromptDialog(props: PromptInput & {
    open: boolean;
    onSaveClick: (newValue: string) => void;
    onDismiss: () => void;
}): ReactNode;
