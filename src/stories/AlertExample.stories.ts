import type { Meta, StoryObj } from '@storybook/react';
import AlertExample from './AlertExample';

const meta = {
  title: 'Alert Message',
  component: AlertExample,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AlertExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Alert: Story = {};
