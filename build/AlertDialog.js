import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, } from '@mui/material';
export default function AlertDialog(props) {
    return (_jsx(Dialog, { open: props.open, onClose: props.onDismiss, "aria-labelledby": `dialog-title-${props.id}`, "aria-describedby": `dialog-description-${props.id}`, children: _jsxs(Box, { sx: { maxWidth: 600, minWidth: 400 }, children: [_jsxs(DialogTitle, { id: `dialog-title-${props.id}`, children: [props.title, _jsx(IconButton, { "aria-label": 'close', onClick: props.onDismiss, sx: {
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }, children: _jsx(CloseIcon, {}) })] }), _jsx(DialogContent, { children: _jsx(Box, { sx: { pt: 1 }, id: `dialog-description-${props.id}`, children: props.message }) }), _jsx(DialogActions, { sx: { display: 'flex', gap: 2, justifyContent: 'end' }, children: props.isConfirm ? (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: props.onDismiss, children: props.noLabel || 'No' }), _jsx(Button, { onClick: props.onYesClick, autoFocus: true, variant: 'contained', children: props.yesLabel || 'Yes' }), ' '] })) : (_jsx(_Fragment, { children: _jsx(Button, { onClick: props.onDismiss, autoFocus: true, variant: 'contained', children: props.yesLabel || 'OK' }) })) })] }) }));
}
//# sourceMappingURL=AlertDialog.js.map