import { ReactNode } from 'react';
import { BaseDialogInput } from './ActionDialogsContext';
export type AlertInput = BaseDialogInput & {
    message: ReactNode;
    yesLabel?: ReactNode;
    onYesClick?: () => void;
    noLabel?: ReactNode;
    isConfirm?: boolean;
};
export default function AlertDialog(props: AlertInput & {
    open: boolean;
    onDismiss: () => void;
}): ReactNode;
