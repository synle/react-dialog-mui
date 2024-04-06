import { ReactNode } from 'react';
export type AlertInput = {
    title?: ReactNode;
    message: ReactNode;
    yesLabel?: ReactNode;
    onYesClick?: () => void;
    noLabel?: ReactNode;
    isConfirm?: boolean;
};
type AlertDialogProps = AlertInput & {
    open: boolean;
    onDismiss: () => void;
};
export default function AlertDialog(props: AlertDialogProps): ReactNode;
export {};
