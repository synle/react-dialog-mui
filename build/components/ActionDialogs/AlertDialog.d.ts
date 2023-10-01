/// <reference types="react" />
export type AlertInput = {
    title?: string;
    message: string | JSX.Element;
    yesLabel?: string;
    onYesClick?: () => void;
    noLabel?: string;
    isConfirm?: boolean;
};
type AlertDialogProps = AlertInput & {
    open: boolean;
    onDismiss: () => void;
};
export default function AlertDialog(props: AlertDialogProps): JSX.Element | null;
export {};
