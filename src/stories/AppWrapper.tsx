import { ReactNode } from 'react';
import { ActionDialogsContext } from '../index';

export default function AppWrapper(props: { children: ReactNode }) {
  return <ActionDialogsContext>{props.children}</ActionDialogsContext>;
}
