import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { ReactNode, SyntheticEvent, useState } from 'react';

export type PromptInput = {
  title?: string;
  message: string;
  value?: string;
  isLongPrompt?: boolean;
  saveLabel?: string;
  languageMode?: string;
  required?: boolean;
  readonly?: boolean;
};

type PromptDialogProps = PromptInput & {
  key: string;
  open: boolean;
  onSaveClick: (newValue: string) => void;
  onDismiss: () => void;
};

export default function PromptDialog(props: PromptDialogProps): ReactNode {
  const [value, setValue] = useState(props.value || '');

  const handleClose = (forceClose = false) => {
    if (props.required && !forceClose) {
      // needs to fill out an input
      // we don't want to allow user to click outside
      return;
    }
    props.onDismiss();
  };

  const onSave = (e: SyntheticEvent) => {
    e.preventDefault();
    if (props.required && !value) {
      // needs to fill out an input
      // we don't want to allow user to click outside
      return;
    }
    props.onSaveClick(value.trim());
  };

  const isDisabled = !(value?.length > 0);

  return (
    <Dialog
      onClose={() => handleClose(false)}
      aria-labelledby='prompt-dialog-title'
      open={props.open}
      fullWidth={true}
      maxWidth={props.isLongPrompt ? 'lg' : 'sm'}>
      <form onSubmit={onSave}>
        <DialogTitle id='prompt-dialog-title'>
          {props.title || 'Prompt'}
          <IconButton
            aria-label='close'
            onClick={() => handleClose(true)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {props.isLongPrompt ? (
            <TextField
              label={props.message}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required={props.required}
              size='small'
              multiline
              fullWidth
              autoFocus
            />
          ) : (
            <TextField
              label={props.message}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required={props.required}
              size='small'
              fullWidth
              autoFocus
            />
          )}
        </DialogContent>
        {props.readonly !== true && (
          <DialogActions sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
            <Button type='submit' disabled={isDisabled}>
              {props.saveLabel || 'Save Changes'}
            </Button>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}
