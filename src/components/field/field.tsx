import { Field as BaseField } from '@base-ui/react/field';
import { Input as BaseInput } from '@base-ui/react/input';
import type * as React from 'react';
import { cn } from '../../lib/cn';

/**
 * Base UI accepts `className` as either a string or a function of component
 * state. Brikke narrows it to a string so `cn()` can merge it predictably —
 * state-dependent styling is expressed with `data-*` variants instead.
 */
type Styled<T> = Omit<T, 'className'> & { className?: string };

export const inputClassName = cn(
  'h-10 w-full rounded-bk border border-bk-border bg-bk-surface px-3 text-sm text-bk-fg',
  'placeholder:text-bk-fg-muted outline-none transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bk-ring',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'data-[invalid]:border-bk-danger data-[invalid]:focus-visible:outline-bk-danger',
);

export type InputProps = Styled<React.ComponentProps<typeof BaseInput>>;

/** A standalone text input, for use outside of a `Field`. */
export function Input({ className, ...props }: InputProps) {
  return <BaseInput className={cn(inputClassName, className)} {...props} />;
}

export type FieldRootProps = Styled<React.ComponentProps<typeof BaseField.Root>>;

function FieldRoot({ className, ...props }: FieldRootProps) {
  return <BaseField.Root className={cn('flex flex-col gap-1.5', className)} {...props} />;
}

export type FieldLabelProps = Styled<React.ComponentProps<typeof BaseField.Label>>;

function FieldLabel({ className, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label
      className={cn('text-sm font-medium text-bk-fg', className)}
      {...props}
    />
  );
}

export type FieldControlProps = Styled<React.ComponentProps<typeof BaseField.Control>>;

function FieldControl({ className, ...props }: FieldControlProps) {
  return <BaseField.Control className={cn(inputClassName, className)} {...props} />;
}

export type FieldDescriptionProps = Styled<
  React.ComponentProps<typeof BaseField.Description>
>;

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      className={cn('text-sm text-bk-fg-muted', className)}
      {...props}
    />
  );
}

export type FieldErrorProps = Styled<React.ComponentProps<typeof BaseField.Error>>;

function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <BaseField.Error className={cn('text-sm text-bk-danger', className)} {...props} />
  );
}

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
  Validity: BaseField.Validity,
};
