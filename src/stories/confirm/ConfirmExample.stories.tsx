import type { Meta, StoryObj } from '@storybook/react';
import ConfirmExample from './ConfirmExample';

const meta = {
  title: 'Confirm Message',
  component: ConfirmExample,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ConfirmExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleConfirm: Story = {};
