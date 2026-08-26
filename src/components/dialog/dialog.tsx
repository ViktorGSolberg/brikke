import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type * as React from 'react';
import { cn } from '../../lib/cn';

type Styled<T> = Omit<T, 'className'> & { className?: string };

export type DialogBackdropProps = Styled<
  React.ComponentProps<typeof BaseDialog.Backdrop>
>;

function DialogBackdrop({ className, ...props }: DialogBackdropProps) {
  return (
    <BaseDialog.Backdrop
      className={cn(
        'fixed inset-0 bg-bk-overlay transition-opacity duration-200',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

export type DialogViewportProps = Styled<
  React.ComponentProps<typeof BaseDialog.Viewport>
>;

function DialogViewport({ className, ...props }: DialogViewportProps) {
  return (
    <BaseDialog.Viewport
      className={cn('fixed inset-0 grid place-items-center overflow-y-auto p-5', className)}
      {...props}
    />
  );
}

export type DialogPopupProps = Styled<React.ComponentProps<typeof BaseDialog.Popup>>;

function DialogPopup({ className, ...props }: DialogPopupProps) {
  return (
    <BaseDialog.Popup
      // Organic's dialog is over-rounded and shadow-only — no hairline border.
      className={cn(
        'w-full max-w-md rounded-bk-lg bg-bk-surface-raised p-7',
        'font-bk-sans text-bk-fg shadow-bk-lg outline-none',
        'transition-[opacity,transform] duration-200',
        'data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

export type DialogTitleProps = Styled<React.ComponentProps<typeof BaseDialog.Title>>;

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      className={cn(
        'font-bk-display text-xl leading-tight font-normal tracking-[-0.015em] text-bk-fg',
        className,
      )}
      {...props}
    />
  );
}

export type DialogDescriptionProps = Styled<
  React.ComponentProps<typeof BaseDialog.Description>
>;

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={cn('mt-2.5 text-sm leading-relaxed text-bk-fg-muted', className)}
      {...props}
    />
  );
}

export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Portal: BaseDialog.Portal,
  Backdrop: DialogBackdrop,
  Viewport: DialogViewport,
  Popup: DialogPopup,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: BaseDialog.Close,
};
