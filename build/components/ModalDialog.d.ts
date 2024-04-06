import { ReactNode } from 'react';
export type ModalInput = {
    title: ReactNode;
    /**
     * body of the modal
     */
    message: ReactNode;
    showCloseButton?: boolean;
    disableBackdropClick?: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg';
};
type ModalProps = ModalInput & {
    open: boolean;
    onDismiss: () => void;
};
export default function Modal(props: ModalProps): ReactNode;
export {};
