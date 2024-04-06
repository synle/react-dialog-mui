import { ReactNode } from 'react';
import AlertExample from './AlertExample';
import ChoiceExample from './ChoiceExample';
import ConfirmExample from './ConfirmExample';
import ModalExample from './ModalExample';
import PromptExample from './PromptExample';

export default {
  title: 'Action Dialog Examples',
  parameters: {
    layout: 'fullscreen',
  },
};

function ExampleWrapper(props: { children: ReactNode; title: string }) {
  return (
    <div style={{ padding: '1rem 2rem' }}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

export const SimpleAlertExample = () => {
  return (
    <ExampleWrapper title='Simple Alert Example'>
      <AlertExample />
    </ExampleWrapper>
  );
};

export const SimpleChoiceExample = () => {
  return (
    <ExampleWrapper title='Simple Choice Example'>
      <ChoiceExample />
    </ExampleWrapper>
  );
};

export const SimpleConfirmExample = () => {
  return (
    <ExampleWrapper title='Simple Confirm Example'>
      <ConfirmExample />
    </ExampleWrapper>
  );
};

export const SimpleModalExample = () => {
  return (
    <ExampleWrapper title='Simple Modal Example'>
      <ModalExample />
    </ExampleWrapper>
  );
};

export const SimplePromptExample = () => {
  return (
    <ExampleWrapper title='Simple Prompt Example'>
      <PromptExample />
    </ExampleWrapper>
  );
};
