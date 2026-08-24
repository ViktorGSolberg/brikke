import { Select as BaseSelect } from '@base-ui/react/select';
import type * as React from 'react';
import { cn } from '../../lib/cn';

type Styled<T> = Omit<T, 'className'> & { className?: string };

export type SelectTriggerProps = Styled<
  React.ComponentProps<typeof BaseSelect.Trigger>
>;

function SelectTrigger({ className, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      className={cn(
        'flex h-10 w-full items-center justify-between gap-2 rounded-bk border border-bk-border',
        'bg-bk-surface px-3 text-sm text-bk-fg outline-none transition-colors',
        'hover:bg-bk-surface-muted',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bk-ring',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export type SelectPopupProps = Styled<React.ComponentProps<typeof BaseSelect.Popup>>;

function SelectPopup({ className, ...props }: SelectPopupProps) {
  return (
    <BaseSelect.Popup
      className={cn(
        'max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto',
        'rounded-bk border border-bk-border bg-bk-surface-raised p-1 shadow-lg outline-none',
        'transition-[opacity,transform] duration-150',
        'data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

export type SelectItemProps = Styled<React.ComponentProps<typeof BaseSelect.Item>>;

function SelectItem({ className, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      className={cn(
        'flex cursor-default items-center justify-between gap-2 rounded-[calc(var(--radius-bk)-0.25rem)]',
        'px-2 py-1.5 text-sm text-bk-fg outline-none select-none',
        'data-[highlighted]:bg-bk-primary data-[highlighted]:text-bk-primary-fg',
        'data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export type SelectGroupLabelProps = Styled<
  React.ComponentProps<typeof BaseSelect.GroupLabel>
>;

function SelectGroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      className={cn('px-2 py-1.5 text-xs font-medium text-bk-fg-muted', className)}
      {...props}
    />
  );
}

export type SelectSeparatorProps = Styled<
  React.ComponentProps<typeof BaseSelect.Separator>
>;

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <BaseSelect.Separator
      className={cn('-mx-1 my-1 h-px bg-bk-border', className)}
      {...props}
    />
  );
}

export const Select = {
  Root: BaseSelect.Root,
  Label: BaseSelect.Label,
  Trigger: SelectTrigger,
  Value: BaseSelect.Value,
  Icon: BaseSelect.Icon,
  Portal: BaseSelect.Portal,
  Positioner: BaseSelect.Positioner,
  Popup: SelectPopup,
  List: BaseSelect.List,
  Item: SelectItem,
  ItemText: BaseSelect.ItemText,
  ItemIndicator: BaseSelect.ItemIndicator,
  Group: BaseSelect.Group,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator,
};
