import { ReactNode } from 'react';
import { BaseDialogInput } from './types';
export type ModalInput = BaseDialogInput & {
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
