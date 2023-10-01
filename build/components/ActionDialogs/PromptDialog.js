"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Close_1 = require("@mui/icons-material/Close");
const Button_1 = require("@mui/material/Button");
const Dialog_1 = require("@mui/material/Dialog");
const DialogActions_1 = require("@mui/material/DialogActions");
const DialogContent_1 = require("@mui/material/DialogContent");
const DialogTitle_1 = require("@mui/material/DialogTitle");
const IconButton_1 = require("@mui/material/IconButton");
const TextField_1 = require("@mui/material/TextField");
const react_1 = require("react");
function PromptDialog(props) {
    const [value, setValue] = (0, react_1.useState)(props.value || '');
    const handleClose = (forceClose = false) => {
        if (props.required && !forceClose) {
            // needs to fill out an input
            // we don't want to allow user to click outside
            return;
        }
        props.onDismiss();
    };
    const onSave = (e) => {
        e.preventDefault();
        if (props.required && !value) {
            // needs to fill out an input
            // we don't want to allow user to click outside
            return;
        }
        props.onSaveClick(value.trim());
    };
    const isDisabled = !((value === null || value === void 0 ? void 0 : value.length) > 0);
    return ((0, jsx_runtime_1.jsx)(Dialog_1.default, { onClose: () => handleClose(false), "aria-labelledby": 'prompt-dialog-title', open: props.open, fullWidth: true, maxWidth: props.isLongPrompt ? 'lg' : 'sm', children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSave, children: [(0, jsx_runtime_1.jsxs)(DialogTitle_1.default, { id: 'prompt-dialog-title', children: [props.title || 'Prompt', (0, jsx_runtime_1.jsx)(IconButton_1.default, { "aria-label": 'close', onClick: () => handleClose(true), sx: {
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }, children: (0, jsx_runtime_1.jsx)(Close_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(DialogContent_1.default, { dividers: true, children: props.isLongPrompt ? ((0, jsx_runtime_1.jsx)(TextField_1.default, { label: props.message, value: value, onChange: (e) => setValue(e.target.value), required: props.required, size: 'small', multiline: true, fullWidth: true, autoFocus: true })) : ((0, jsx_runtime_1.jsx)(TextField_1.default, { label: props.message, value: value, onChange: (e) => setValue(e.target.value), required: props.required, size: 'small', fullWidth: true, autoFocus: true })) }), props.readonly !== true && ((0, jsx_runtime_1.jsx)(DialogActions_1.default, { sx: { display: 'flex', gap: 2, justifyContent: 'end' }, children: (0, jsx_runtime_1.jsx)(Button_1.default, { type: 'submit', disabled: isDisabled, children: props.saveLabel || 'Save Changes' }) }))] }) }));
}
exports.default = PromptDialog;
//# sourceMappingURL=PromptDialog.js.map