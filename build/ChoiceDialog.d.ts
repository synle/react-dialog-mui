import { ReactNode } from 'react';
import { BaseDialogInput } from './ActionDialogsContext';
export type ChoiceOption = {
    startIcon?: ReactNode;
    label: ReactNode;
    value: string;
    disabled?: boolean;
};
export type ChoiceInput = BaseDialogInput & {
    title: string;
    message: ReactNode;
    options: ChoiceOption[];
    required?: boolean;
};
export default function ChoiceDialog(props: ChoiceInput & {
    open: boolean;
    onSelect: (newValue: string) => void;
    onDismiss: () => void;
}): ReactNode;
