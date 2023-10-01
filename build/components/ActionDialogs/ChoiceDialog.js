"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Dialog_1 = require("@mui/material/Dialog");
const DialogContent_1 = require("@mui/material/DialogContent");
const DialogTitle_1 = require("@mui/material/DialogTitle");
const List_1 = require("@mui/material/List");
const ListItem_1 = require("@mui/material/ListItem");
const ListItemText_1 = require("@mui/material/ListItemText");
function ChoiceDialog(props) {
    const { title, message, options, open, required, onDismiss: handleClose, onSelect: handleListItemClick, } = props;
    let onClose = handleClose;
    if (required) {
        onClose = undefined;
    }
    return ((0, jsx_runtime_1.jsxs)(Dialog_1.default, { onClose: onClose, open: open, fullWidth: true, children: [(0, jsx_runtime_1.jsx)(DialogTitle_1.default, { children: title }), (0, jsx_runtime_1.jsxs)(DialogContent_1.default, { sx: { mt: 1 }, children: [message, (0, jsx_runtime_1.jsx)(List_1.default, { dense: true, children: options.map((option) => ((0, jsx_runtime_1.jsxs)(ListItem_1.default, { button: true, onClick: () => !option.disabled && handleListItemClick(option.value), disabled: !!option.disabled, sx: { alignItems: 'center', display: 'flex', gap: 1 }, children: [!option.startIcon ? null : option.startIcon, (0, jsx_runtime_1.jsx)(ListItemText_1.default, { primary: option.label })] }, option.value))) })] })] }));
}
exports.default = ChoiceDialog;
//# sourceMappingURL=ChoiceDialog.js.map