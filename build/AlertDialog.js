import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function AlertDialog(props) {
    return (_jsx(Dialog, { open: props.open, onClose: props.onDismiss, "aria-labelledby": `dialog-title-${props.key}`, "aria-describedby": `dialog-description-${props.key}`, children: _jsxs("div", { style: { maxWidth: 400 }, children: [_jsx(DialogTitle, { id: `dialog-title-${props.key}`, children: props.title || 'Alert' }), _jsx(DialogContent, { children: _jsx(Box, { sx: { pt: 1 }, id: `dialog-description-${props.key}`, children: props.message }) }), _jsx(DialogActions, { sx: { display: 'flex', gap: 2, justifyContent: 'end' }, children: props.isConfirm ? (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: props.onYesClick, autoFocus: true, variant: 'contained', children: props.yesLabel || 'Yes' }), ' ', _jsx(Button, { onClick: props.onDismiss, children: props.noLabel || 'No' })] })) : (_jsx(_Fragment, { children: _jsx(Button, { onClick: props.onDismiss, autoFocus: true, variant: 'contained', children: props.yesLabel || 'OK' }) })) })] }) }));
}
//# sourceMappingURL=AlertDialog.js.map