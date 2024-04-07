import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, } from '@mui/material';
export default function ChoiceDialog(props) {
    const { title, message, options, open, required, onDismiss: handleClose, onSelect: handleListItemClick, } = props;
    let onClose = handleClose;
    if (required) {
        onClose = undefined;
    }
    return (_jsxs(Dialog, { onClose: onClose, open: open, fullWidth: true, "aria-labelledby": `dialog-title-${props.id}`, "aria-describedby": `dialog-description-${props.id}`, children: [_jsxs(DialogTitle, { id: `dialog-title-${props.id}`, children: [title, _jsx(IconButton, { "aria-label": 'close', onClick: props.onDismiss, sx: {
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }, children: _jsx(CloseIcon, {}) })] }), _jsxs(DialogContent, { sx: { mt: 1 }, id: `dialog-description-${props.id}`, children: [message, _jsx(List, { dense: true, children: options.map((option) => (_jsxs(ListItem, { button: true, onClick: () => !option.disabled && handleListItemClick(option.value), disabled: !!option.disabled, sx: { alignItems: 'center', display: 'flex', gap: 1 }, children: [!option.startIcon ? null : option.startIcon, _jsx(ListItemText, { primary: option.label })] }, option.value))) })] })] }));
}
//# sourceMappingURL=ChoiceDialog.js.map