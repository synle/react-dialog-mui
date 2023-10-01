import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export type ChoiceOption = {
  startIcon?: JSX.Element;
  label: JSX.Element | string;
  value: string;
  disabled?: boolean;
};

export type ChoiceInput = {
  title: string;
  message: JSX.Element | string;
  options: ChoiceOption[];
  required?: boolean;
};

type ChoiceDialogProps = ChoiceInput & {
  open: boolean;
  onSelect: (newValue: string) => void;
  onDismiss: () => void;
};

export default function ChoiceDialog(props: ChoiceDialogProps): JSX.Element | null {
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
    <Dialog onClose={onClose} open={open} fullWidth={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
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
