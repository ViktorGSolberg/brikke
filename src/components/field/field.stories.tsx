import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button';
import { Field } from './field';

const meta = {
  title: 'Components/Field',
  component: Field.Root,
} satisfies Meta<typeof Field.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field.Root className="max-w-sm">
      <Field.Label>Project name</Field.Label>
      <Field.Control placeholder="acme-web" />
      <Field.Description>Lowercase letters, numbers, and hyphens.</Field.Description>
    </Field.Root>
  ),
};

export const Validated: Story = {
  render: () => (
    <form
      className="flex max-w-sm flex-col gap-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <Field.Root>
        <Field.Label>Work email</Field.Label>
        <Field.Control
          type="email"
          required
          placeholder="you@company.com"
          pattern=".+@.+\..+"
        />
        <Field.Error match="valueMissing">An email address is required.</Field.Error>
        <Field.Error match="patternMismatch">That is not a valid email address.</Field.Error>
      </Field.Root>
      <Button type="submit" className="self-start">
        Submit
      </Button>
    </form>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field.Root disabled className="max-w-sm">
      <Field.Label>Organisation</Field.Label>
      <Field.Control defaultValue="Acme AS" />
      <Field.Description>Contact an admin to change this.</Field.Description>
    </Field.Root>
  ),
};
