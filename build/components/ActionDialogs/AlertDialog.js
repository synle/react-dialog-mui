"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Button_1 = require("@mui/material/Button");
const Dialog_1 = require("@mui/material/Dialog");
const DialogActions_1 = require("@mui/material/DialogActions");
const DialogContent_1 = require("@mui/material/DialogContent");
const DialogTitle_1 = require("@mui/material/DialogTitle");
function AlertDialog(props) {
    return ((0, jsx_runtime_1.jsx)(Dialog_1.default, { open: props.open, onClose: props.onDismiss, "aria-labelledby": 'alert-dialog-title', "aria-describedby": 'alert-dialog-description', children: (0, jsx_runtime_1.jsxs)("div", { style: { maxWidth: 400 }, children: [(0, jsx_runtime_1.jsx)(DialogTitle_1.default, { id: 'alert-dialog-title', children: props.title || 'Alert' }), (0, jsx_runtime_1.jsx)(DialogContent_1.default, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { pt: 1 }, id: 'alert-dialog-description', children: props.message }) }), (0, jsx_runtime_1.jsx)(DialogActions_1.default, { sx: { display: 'flex', gap: 2, justifyContent: 'end' }, children: props.isConfirm ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Button_1.default, { onClick: props.onYesClick, autoFocus: true, variant: 'contained', children: props.yesLabel || 'Yes' }), ' ', (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: props.onDismiss, children: props.noLabel || 'No' })] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Button_1.default, { onClick: props.onDismiss, autoFocus: true, variant: 'contained', children: props.yesLabel || 'OK' }) })) })] }) }));
}
exports.default = AlertDialog;
//# sourceMappingURL=AlertDialog.js.map