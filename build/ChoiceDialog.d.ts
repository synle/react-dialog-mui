import { ReactNode } from 'react';
import { BaseDialogInput } from './types';
export type ChoiceOption = {
    startIcon?: ReactNode;
    label: ReactNode;
    value: string;
    disabled?: boolean;
};
export type ChoiceInput = BaseDialogInput & {
    message: ReactNode;
    options: ChoiceOption[];
    required?: boolean;
};
export default function ChoiceDialog(props: ChoiceInput & {
    open: boolean;
    onSelect: (newValue: string) => void;
    onDismiss: () => void;
}): ReactNode;
