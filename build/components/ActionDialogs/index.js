"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AlertDialog_1 = require("./AlertDialog");
const ChoiceDialog_1 = require("./ChoiceDialog");
const ModalDialog_1 = require("./ModalDialog");
const PromptDialog_1 = require("./PromptDialog");
const ActionDialogs_1 = require("../../hooks/ActionDialogs");
function ActionDialogs(props) {
    const { dialogs, dismiss } = (0, ActionDialogs_1.useActionDialogs)();
    if (!dialogs || dialogs.length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: dialogs.map((dialog, idx) => {
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
            let contentDom = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
            switch (dialog.type) {
                case 'alert':
                    contentDom = ((0, jsx_runtime_1.jsx)(AlertDialog_1.default, { open: true, title: 'Alert', message: dialog.message, onDismiss: onDimiss, isConfirm: false }));
                    break;
                case 'confirm':
                    contentDom = ((0, jsx_runtime_1.jsx)(AlertDialog_1.default, { open: true, title: 'Confirmation', message: dialog.message, yesLabel: dialog.yesLabel, onYesClick: onConfirmSubmit, onDismiss: onDimiss, isConfirm: true }));
                    break;
                case 'prompt':
                    contentDom = ((0, jsx_runtime_1.jsx)(PromptDialog_1.default, { open: true, title: dialog.title, message: dialog.message, value: dialog.value, onSaveClick: onPromptSaveClick, onDismiss: onDimiss, languageMode: dialog.languageMode, isLongPrompt: dialog.isLongPrompt, saveLabel: dialog.saveLabel, required: dialog.required, readonly: dialog.readonly }));
                    break;
                case 'choice':
                    contentDom = ((0, jsx_runtime_1.jsx)(ChoiceDialog_1.default, { open: true, title: dialog.title, message: dialog.message, options: dialog.options, onSelect: onChoiceSelect, onDismiss: onDimiss, required: dialog.required }));
                    break;
                case 'modal':
                    contentDom = ((0, jsx_runtime_1.jsx)(ModalDialog_1.default, { open: true, title: dialog.title, message: dialog.message, onDismiss: onDimiss, showCloseButton: !!dialog.showCloseButton, disableBackdropClick: !!dialog.disableBackdropClick, size: dialog.size }));
                    break;
            }
            return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: contentDom }, idx);
        }) }));
}
exports.default = ActionDialogs;
//# sourceMappingURL=index.js.map