import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Fragment } from 'react';
import { useActionDialogs } from './ActionDialogsContext';
import AlertDialog from './AlertDialog';
import ChoiceDialog from './ChoiceDialog';
import ModalDialog from './ModalDialog';
import PromptDialog from './PromptDialog';
export default function ActionDialogs(props) {
    const { dialogs, dismiss } = useActionDialogs();
    if (!dialogs || dialogs.length === 0) {
        return null;
    }
    return (_jsx(_Fragment, { children: dialogs.map((dialog, idx) => {
            if (!dialog) {
                return null;
            }
            const onConfirmSubmit = () => {
                dismiss();
                dialog.onSubmit && dialog.onSubmit(true);
            };
            const onPromptSaveClick = (newValue) => {
                dismiss();
                dialog.onSubmit && dialog.onSubmit(true, newValue);
            };
            const onChoiceSelect = (newValue) => {
                dismiss();
                dialog.onSubmit && dialog.onSubmit(true, newValue);
            };
            const onDimiss = () => {
                dismiss();
                dialog.onSubmit && dialog.onSubmit(false);
            };
            let contentDom = _jsx(_Fragment, {});
            switch (dialog.type) {
                case 'alert':
                    contentDom = (_jsx(AlertDialog, { open: true, title: 'Alert', message: dialog.message, onDismiss: onDimiss, isConfirm: false }));
                    break;
                case 'confirm':
                    contentDom = (_jsx(AlertDialog, { open: true, title: 'Confirmation', message: dialog.message, yesLabel: dialog.yesLabel, onYesClick: onConfirmSubmit, onDismiss: onDimiss, isConfirm: true }));
                    break;
                case 'prompt':
                    contentDom = (_jsx(PromptDialog, { open: true, title: dialog.title, message: dialog.message, value: dialog.value, onSaveClick: onPromptSaveClick, onDismiss: onDimiss, languageMode: dialog.languageMode, isLongPrompt: dialog.isLongPrompt, saveLabel: dialog.saveLabel, required: dialog.required, readonly: dialog.readonly }));
                    break;
                case 'choice':
                    contentDom = (_jsx(ChoiceDialog, { open: true, title: dialog.title, message: dialog.message, options: dialog.options, onSelect: onChoiceSelect, onDismiss: onDimiss, required: dialog.required }));
                    break;
                case 'modal':
                    contentDom = (_jsx(ModalDialog, { open: true, title: dialog.title, message: dialog.message, onDismiss: onDimiss, showCloseButton: !!dialog.showCloseButton, disableBackdropClick: !!dialog.disableBackdropClick, size: dialog.size }));
                    break;
            }
            return _jsx(Fragment, { children: contentDom }, idx);
        }) }));
}
//# sourceMappingURL=index.js.map