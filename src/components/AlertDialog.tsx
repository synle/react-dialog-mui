import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';
import { BaseDialogInput } from './ActionDialogsContext';

export type AlertInput = BaseDialogInput & {
  title?: ReactNode;
  message: ReactNode;
  yesLabel?: ReactNode;
  onYesClick?: () => void;
  noLabel?: ReactNode;
  isConfirm?: boolean;
};

type AlertDialogProps = AlertInput & {
  key: string;
  open: boolean;
  onDismiss: () => void;
};

export default function AlertDialog(props: AlertDialogProps): ReactNode {
  return (
    <Dialog
      open={props.open}
      onClose={props.onDismiss}
      aria-labelledby={`dialog-title-${props.key}`}
      aria-describedby={`dialog-description-${props.key}`}>
      <div style={{ maxWidth: 400 }}>
        <DialogTitle id={`dialog-title-${props.key}`}>{props.title || 'Alert'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }} id={`dialog-description-${props.key}`}>
            {props.message}
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
          {props.isConfirm ? (
            <>
              <Button onClick={props.onYesClick} autoFocus variant='contained'>
                {props.yesLabel || 'Yes'}
              </Button>{' '}
              <Button onClick={props.onDismiss}>{props.noLabel || 'No'}</Button>
            </>
          ) : (
            <>
              <Button onClick={props.onDismiss} autoFocus variant='contained'>
                {props.yesLabel || 'OK'}
              </Button>
            </>
          )}
        </DialogActions>
      </div>
    </Dialog>
  );
}
