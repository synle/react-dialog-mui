"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Close_1 = require("@mui/icons-material/Close");
const material_1 = require("@mui/material");
const Dialog_1 = require("@mui/material/Dialog");
const DialogContent_1 = require("@mui/material/DialogContent");
const DialogTitle_1 = require("@mui/material/DialogTitle");
const IconButton_1 = require("@mui/material/IconButton");
function Modal(props) {
    const onBackdropClick = () => {
        if (props.disableBackdropClick !== true) {
            props.onDismiss();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(Dialog_1.default, { open: props.open, onClose: onBackdropClick, "aria-labelledby": 'modal-dialog-title', "aria-describedby": 'modal-dialog-description', fullWidth: true, maxWidth: props.size, children: [(0, jsx_runtime_1.jsxs)(DialogTitle_1.default, { id: 'modal-dialog-title', children: [props.title, props.showCloseButton && ((0, jsx_runtime_1.jsx)(IconButton_1.default, { "aria-label": 'close', onClick: () => props.onDismiss(), sx: {
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }, children: (0, jsx_runtime_1.jsx)(Close_1.default, {}) }))] }), (0, jsx_runtime_1.jsx)(DialogContent_1.default, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { pt: 1 }, children: props.message }) })] }));
}
exports.default = Modal;
//# sourceMappingURL=ModalDialog.js.map