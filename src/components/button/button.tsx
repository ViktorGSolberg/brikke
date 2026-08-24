import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '../../lib/cn';

export const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-bk font-medium',
    'transition-colors outline-none select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bk-ring',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-bk-primary text-bk-primary-fg hover:bg-bk-primary-hover',
        secondary:
          'border border-bk-border bg-bk-surface text-bk-fg hover:bg-bk-surface-muted',
        ghost: 'text-bk-fg hover:bg-bk-surface-muted',
        danger: 'bg-bk-danger text-bk-danger-fg hover:bg-bk-danger-hover',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
