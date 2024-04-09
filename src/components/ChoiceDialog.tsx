import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from '@mui/material';
import { ReactNode } from 'react';
import { BaseDialogInput } from './types';

export type ChoiceOption = {
  startIcon?: ReactNode;
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

export type ChoiceInput = BaseDialogInput & {
  message: ReactNode;
  options: ChoiceOption[];
  required?: boolean;
};

export function SingleChoiceDialog(
  props: ChoiceInput & {
    open: boolean;
    value?: string
    onSelect: (newValue?: string) => void;
    onDismiss: () => void;
  },
) {
  const {
    title,
    message,
    options,
    open,
    required,
    onDismiss: handleClose,
    onSelect,
    value
  } = props;

  const [selectedOption, setSelectedOption] = useState<string | undefined>(value);

  let onClose: (() => void) | undefined = handleClose;
  if (required) {
    onClose = undefined;
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      aria-labelledby={`dialog-title-${props.id}`}
      aria-describedby={`dialog-description-${props.id}`}>
      <DialogTitle id={`dialog-title-${props.id}`}>
        {title}
        <IconButton
          aria-label='close'
          onClick={props.onDismiss}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }} id={`dialog-description-${props.id}`}>
        {message}
        <List dense>
          {options.map((option, idx) => {
            const checked = selectedOption === option.value;
            const labelId = `dialog-title-${props.id}-choice.${idx}`;
            const onOptionSelected = () => {
              setSelectedOption(option.value);
            };

            return <ListItem
              onClick={onOptionSelected}
              key={option.value}
              sx={{ alignItems: 'center', display: 'flex', gap: 1 }}>
              <ListItemIcon>
                <Checkbox
                  checked={checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  disabled={option.disabled}
                />
              </ListItemIcon>
              {!option.startIcon ? null : option.startIcon}
              <ListItemText primary={option.label} />
            </ListItem>
          })}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => onSelect(selectedOption)}
            autoFocus
            variant='contained'>
            Apply
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export function MultipleChoiceDialog(
  props: ChoiceInput & {
    open: boolean;
    value?: string[];
    onSelect: (newValue: string[]) => void;
    onDismiss: () => void;
  },
) {
  const { title, message, options, open, required, onDismiss: handleClose, onSelect, value } = props;

  const [selectedOptions, setSelectedOptions] = useState<string[]>(value || []);

  let onClose: (() => void) | undefined = handleClose;
  if (required) {
    onClose = undefined;
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      aria-labelledby={`dialog-title-${props.id}`}
      aria-describedby={`dialog-description-${props.id}`}>
      <DialogTitle id={`dialog-title-${props.id}`}>
        {title}
        <IconButton
          aria-label='close'
          onClick={props.onDismiss}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }} id={`dialog-description-${props.id}`}>
        {message}
        <List dense>
          {options.map((option, idx) => {
            const checked = selectedOptions?.includes(option.value);
            const labelId = `dialog-title-${props.id}-choice.${idx}`;
            const onOptionSelected = () => {
              let newSelectedOptions = selectedOptions;
              if (!checked) {
                newSelectedOptions?.push(option.value);
              } else {
                newSelectedOptions = newSelectedOptions?.filter(
                  (targetOptionValue) => targetOptionValue !== option.value,
                );
              }
              setSelectedOptions([...newSelectedOptions]);
            };

            return (
              <ListItem
                key={option.value}
                sx={{ alignItems: 'center', display: 'flex', gap: 1 }}
                onClick={onOptionSelected}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    disabled={option.disabled}
                  />
                </ListItemIcon>
                {!option.startIcon ? null : option.startIcon}
                <ListItemText id={labelId} primary={option.label} />
              </ListItem>
            );
          })}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => onSelect(selectedOptions)}
            autoFocus
            variant='contained'>
            Apply
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
