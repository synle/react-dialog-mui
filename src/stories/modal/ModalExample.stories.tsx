import type { Meta, StoryObj } from '@storybook/react';
import ModalExample from './ModalExample';

const meta = {
  title: 'Modal',
  component: ModalExample,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ModalExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleModal: Story = {};
