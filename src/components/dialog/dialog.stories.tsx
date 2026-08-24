import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button';
import { Dialog } from './dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
} satisfies Meta<typeof Dialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup>
            <Dialog.Title>Delete project</Dialog.Title>
            <Dialog.Description>
              This permanently removes the project and every deployment attached to it.
              This cannot be undone.
            </Dialog.Description>
            <div className="mt-6 flex justify-end gap-2">
              <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
              <Dialog.Close render={<Button variant="danger">Delete</Button>} />
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};
