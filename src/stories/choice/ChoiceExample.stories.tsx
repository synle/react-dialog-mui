import type { Meta, StoryObj } from '@storybook/react';
import ChoiceExample from './ChoiceExample';

const meta = {
  title: 'Choice',
  component: ChoiceExample,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ChoiceExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleChoice: Story = {};
