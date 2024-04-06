import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
export default function Modal(props) {
    const onBackdropClick = () => {
        if (props.disableBackdropClick !== true) {
            props.onDismiss();
        }
    };
    return (_jsxs(Dialog, { open: props.open, onClose: onBackdropClick, fullWidth: true, maxWidth: props.size, "aria-labelledby": `dialog-title-${props.key}`, "aria-describedby": `dialog-description-${props.key}`, children: [_jsxs(DialogTitle, { id: `dialog-title-${props.key}`, children: [props.title, props.showCloseButton && (_jsx(IconButton, { "aria-label": 'close', onClick: () => props.onDismiss(), sx: {
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }, children: _jsx(CloseIcon, {}) }))] }), _jsx(DialogContent, { id: `dialog-description-${props.key}`, children: _jsx(Box, { sx: { pt: 1 }, children: props.message }) })] }));
}
//# sourceMappingURL=ModalDialog.js.map