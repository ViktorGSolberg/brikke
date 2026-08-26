import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '../../lib/cn';

export const buttonVariants = cva(
  [
    // Organic: controls are pills, and the display face carries actions.
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-bk-pill',
    'border border-transparent font-bk-display font-normal leading-tight',
    // Brikke ships without Preflight, so nothing zeroes the UA's
    // `background-color: buttonface` — without this, `secondary` and `ghost`
    // render on the browser's grey instead of the page. Variants that paint
    // their own background override this via twMerge.
    'bg-transparent',
    'transition-colors outline-none select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bk-ring',
    'disabled:pointer-events-none disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-bk-primary text-bk-primary-fg hover:bg-bk-primary-hover active:bg-bk-primary-active',
        secondary:
          'border-bk-border text-bk-fg hover:bg-bk-fg/7 active:bg-bk-fg/14',
        // Organic's ghost carries the accent rather than plain ink.
        ghost: 'text-bk-primary hover:bg-bk-primary/12 active:bg-bk-primary/20',
        // The sage second voice — a genuine accent, not a highlight.
        sage: 'bg-bk-accent-2 text-bk-accent-2-fg hover:bg-bk-accent-2-hover',
        danger: 'bg-bk-danger text-bk-danger-fg hover:bg-bk-danger-hover',
      },
      // Organic asks for air around its rounded shapes, so the horizontal
      // padding runs one step wider than a square-cornered button would need.
      size: {
        sm: 'h-8 px-4 text-[13px]',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
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
