/// <reference types="react" />
export type PromptInput = {
    title?: string;
    message: string;
    value?: string;
    isLongPrompt?: boolean;
    saveLabel?: string;
    languageMode?: string;
    required?: boolean;
    readonly?: boolean;
};
type PromptDialogProps = PromptInput & {
    open: boolean;
    onSaveClick: (newValue: string) => void;
    onDismiss: () => void;
};
export default function PromptDialog(props: PromptDialogProps): JSX.Element | null;
export {};
