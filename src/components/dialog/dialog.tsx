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
      className={cn('fixed inset-0 grid place-items-center overflow-y-auto p-4', className)}
      {...props}
    />
  );
}

export type DialogPopupProps = Styled<React.ComponentProps<typeof BaseDialog.Popup>>;

function DialogPopup({ className, ...props }: DialogPopupProps) {
  return (
    <BaseDialog.Popup
      className={cn(
        'w-full max-w-md rounded-bk border border-bk-border bg-bk-surface-raised p-6',
        'text-bk-fg shadow-lg outline-none',
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
      className={cn('text-lg font-semibold text-bk-fg', className)}
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
      className={cn('mt-2 text-sm text-bk-fg-muted', className)}
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
