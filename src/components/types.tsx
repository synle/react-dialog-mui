import { ReactNode, RefObject } from 'react';
import { AlertInput } from './AlertDialog';
import { ChoiceInput } from './ChoiceDialog';
import { ModalInput } from './ModalDialog';
import { PromptInput } from './PromptDialog';

export type ActionDialogRef = {
  /**
   * The ID of the modal createc
   */
  id: string;
  /**
   * This method can be used to close / dismiss the modal programtically
   * @returns
   */
  dismiss: () => void;
};

/**
 * base type used in all the dialog input
 */

export type BaseDialogInput = {
  id: string;
  title: ReactNode;
};

export type BaseActionDialogInput = {
  id?: string;
  title: ReactNode;
  message: ReactNode;
  modalRef?: RefObject<ActionDialogRef>;
};

export type ActionDialogType = 'alert'
| 'confirm'
| 'choice-single'
| 'choice-multiple'
| 'prompt'
| 'modal'

export type ActionDialog = BaseActionDialogInput & {
  id: string;
} & (
    | (AlertInput & {
        type: 'alert';
        message: ReactNode;
        yesLabel?: string;
        onSubmit?: () => void;
      })
    | {
        type: 'confirm';
        message: ReactNode;
        yesLabel?: string;
        onSubmit: () => void;
      }
    | ({
        type: 'choice-single';
        value?: string;
        onSubmit: (selectedChoice?: string) => void;
      } & ChoiceInput)
    | ({
        type: 'choice-multiple';
        value?: string[];
        onSubmit: (selectedOptions: string[]) => void;
      } & ChoiceInput)
    | ({
        type: 'prompt';
        onSubmit: (newValue: string) => void;
      } & PromptInput)
    | ({
        type: 'modal';
        onSubmit: (closed: boolean) => void;
      } & ModalInput)
  );
