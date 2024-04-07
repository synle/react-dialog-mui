import { useRef } from 'react';
import {
  ActionDialogsContext as _ActionDialogsContext,
  useActionDialogs as _useActionDialogs,
  type ActionDialogRef as _ActionDialogRef,
} from './ActionDialogsContext';

export const ActionDialogsContext = _ActionDialogsContext;
export const useActionDialogs = _useActionDialogs;
export const useActionDialogRef = () => {
  // here we attempt to provide a skeleton for the ref, the actual assignment of these happen when the dialog is hooked up
  return useRef<_ActionDialogRef>({
    id: '',
    dismiss: () => {},
  });
};
