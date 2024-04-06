import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
export default function ChoiceDialog(props) {
    const { title, message, options, open, required, onDismiss: handleClose, onSelect: handleListItemClick, } = props;
    let onClose = handleClose;
    if (required) {
        onClose = undefined;
    }
    return (_jsxs(Dialog, { onClose: onClose, open: open, fullWidth: true, children: [_jsx(DialogTitle, { children: title }), _jsxs(DialogContent, { sx: { mt: 1 }, children: [message, _jsx(List, { dense: true, children: options.map((option) => (_jsxs(ListItem, { button: true, onClick: () => !option.disabled && handleListItemClick(option.value), disabled: !!option.disabled, sx: { alignItems: 'center', display: 'flex', gap: 1 }, children: [!option.startIcon ? null : option.startIcon, _jsx(ListItemText, { primary: option.label })] }, option.value))) })] })] }));
}
//# sourceMappingURL=ChoiceDialog.js.map