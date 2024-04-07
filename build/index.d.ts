/// <reference types="react" />
import { ActionDialogsContext as _ActionDialogsContext, useActionDialogs as _useActionDialogs, type ActionDialogRef as _ActionDialogRef } from './ActionDialogsContext';
export declare const ActionDialogsContext: typeof _ActionDialogsContext;
export declare const useActionDialogs: typeof _useActionDialogs;
/**
 * This hook can be used to dismiss the modal programatically
 * @returns
 */
export declare const useActionDialogRef: () => import("react").MutableRefObject<_ActionDialogRef>;
