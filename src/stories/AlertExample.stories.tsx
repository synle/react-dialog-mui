import AlertExample from './AlertExample';
import ChoiceExample from './ChoiceExample';
import ConfirmExample from './ConfirmExample';
import ModalExample from './ModalExample';
import PromptExample from './PromptExample';


export default {
  title: 'Action Dialog Examples',
  component: AlertExample,
  parameters: {
    layout: 'fullscreen',
  },
};



export const SimpleAlertExample= () => {
  return <AlertExample />
};




export const SimpleChoiceExample = () => {
  return <ChoiceExample />
};




export const SimpleConfirmExample = () => {
  return <ConfirmExample />
};




export const SimpleModalExample = () => {
  return <ModalExample />
};




export const SimplePromptExample = () => {
  return <PromptExample />
};

