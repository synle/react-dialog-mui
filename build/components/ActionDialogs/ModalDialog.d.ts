/// <reference types="react" />
export type ModalInput = {
    title: string;
    /**
     * body of the modal
     * @type {[type]}
     */
    message: JSX.Element;
    showCloseButton?: boolean;
    disableBackdropClick?: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg';
};
type ModalProps = ModalInput & {
    open: boolean;
    onDismiss: () => void;
};
export default function Modal(props: ModalProps): JSX.Element | null;
export {};
