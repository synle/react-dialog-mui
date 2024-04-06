import { ReactNode } from 'react';
import { BaseDialogInput } from './ActionDialogsContext';
export type ModalInput = BaseDialogInput & {
    title: ReactNode;
    /**
     * body of the modal
     */
    message: ReactNode;
    showCloseButton?: boolean;
    disableBackdropClick?: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg';
};
export default function Modal(props: ModalInput & {
    open: boolean;
    onDismiss: () => void;
}): ReactNode;
