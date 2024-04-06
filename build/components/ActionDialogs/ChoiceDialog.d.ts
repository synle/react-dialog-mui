import { ReactNode } from 'react';
export type ChoiceOption = {
    startIcon?: ReactNode;
    label: ReactNode;
    value: string;
    disabled?: boolean;
};
export type ChoiceInput = {
    title: string;
    message: ReactNode;
    options: ChoiceOption[];
    required?: boolean;
};
type ChoiceDialogProps = ChoiceInput & {
    open: boolean;
    onSelect: (newValue: string) => void;
    onDismiss: () => void;
};
export default function ChoiceDialog(props: ChoiceDialogProps): ReactNode;
export {};
