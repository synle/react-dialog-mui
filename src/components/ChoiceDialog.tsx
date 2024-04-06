import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ReactNode } from 'react';
import { BaseDialogInput } from './ActionDialogsContext';

export type ChoiceOption = {
  startIcon?: ReactNode;
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

export type ChoiceInput = BaseDialogInput & {
  title: string;
  message: ReactNode;
  options: ChoiceOption[];
  required?: boolean;
};

export default function ChoiceDialog(
  props: ChoiceInput & {
    open: boolean;
    onSelect: (newValue: string) => void;
    onDismiss: () => void;
  },
): ReactNode {
  const {
    title,
    message,
    options,
    open,
    required,
    onDismiss: handleClose,
    onSelect: handleListItemClick,
  } = props;

  let onClose: (() => void) | undefined = handleClose;
  if (required) {
    onClose = undefined;
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      aria-labelledby={`dialog-title-${props.key}`}
      aria-describedby={`dialog-description-${props.key}`}>
      <DialogTitle id={`dialog-title-${props.key}`}>{title}</DialogTitle>
      <DialogContent sx={{ mt: 1 }} id={`dialog-description-${props.key}`}>
        {message}
        <List dense>
          {options.map((option) => (
            <ListItem
              button
              onClick={() => !option.disabled && handleListItemClick(option.value)}
              disabled={!!option.disabled}
              key={option.value}
              sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
              {!option.startIcon ? null : option.startIcon}
              <ListItemText primary={option.label} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
