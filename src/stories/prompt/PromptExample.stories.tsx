import type { Meta, StoryObj } from '@storybook/react';
import PromptExample from './PromptExample';

const meta = {
  title: 'Prompt Message',
  component: PromptExample,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PromptExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimplePromptMessage: Story = {};
