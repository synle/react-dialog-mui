import type { Meta, StoryObj } from '@storybook/react';
import AlertExample from './AlertExample';

const meta = {
  title: 'Alert Message',
  component: AlertExample,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AlertExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleAlertMessage: Story = {};
