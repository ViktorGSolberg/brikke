import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './select';

const meta = {
  title: 'Components/Select',
  component: Select.Root,
} satisfies Meta<typeof Select.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const REGIONS = [
  { value: 'eu-north-1', label: 'Europe (Stockholm)' },
  { value: 'eu-west-1', label: 'Europe (Ireland)' },
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-xs">
      <Select.Root items={REGIONS} defaultValue="eu-north-1">
        <Select.Trigger>
          <Select.Value />
          <Select.Icon aria-hidden>▾</Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={4}>
            <Select.Popup>
              <Select.List>
                {REGIONS.map((region) => (
                  <Select.Item key={region.value} value={region.value}>
                    <Select.ItemText>{region.label}</Select.ItemText>
                    <Select.ItemIndicator aria-hidden>✓</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  ),
};
