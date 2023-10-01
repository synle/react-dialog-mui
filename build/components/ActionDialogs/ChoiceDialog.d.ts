/// <reference types="react" />
export type ChoiceOption = {
    startIcon?: JSX.Element;
    label: JSX.Element | string;
    value: string;
    disabled?: boolean;
};
export type ChoiceInput = {
    title: string;
    message: JSX.Element | string;
    options: ChoiceOption[];
    required?: boolean;
};
type ChoiceDialogProps = ChoiceInput & {
    open: boolean;
    onSelect: (newValue: string) => void;
    onDismiss: () => void;
};
export default function ChoiceDialog(props: ChoiceDialogProps): JSX.Element | null;
export {};
