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
      // Matches the Field control exactly: same height, same pill, same fill.
      className={cn(
        'flex h-10 w-full items-center justify-between gap-2 rounded-bk-pill border border-bk-border',
        'bg-bk-surface pr-2 pl-3.5 font-bk-sans text-sm text-bk-fg outline-none transition-colors',
        'hover:bg-bk-surface-muted',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bk-ring',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45',
        className,
      )}
      {...props}
    />
  );
}

export type SelectIconProps = Styled<React.ComponentProps<typeof BaseSelect.Icon>>;

function SelectIcon({ className, ...props }: SelectIconProps) {
  return (
    <BaseSelect.Icon
      // A soft circular seat for the chevron, per Organic's round shapes.
      className={cn('grid size-6 place-items-center rounded-full text-bk-primary', className)}
      {...props}
    />
  );
}

export type SelectPopupProps = Styled<React.ComponentProps<typeof BaseSelect.Popup>>;

function SelectPopup({ className, ...props }: SelectPopupProps) {
  return (
    <BaseSelect.Popup
      // Organic lifts overlays with shadow alone — no hairline border.
      className={cn(
        'max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto',
        'rounded-bk bg-bk-surface-raised p-1.5 shadow-bk-lg outline-none',
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
        'flex cursor-default items-center justify-between gap-2 rounded-bk-pill',
        'px-3 py-2 font-bk-sans text-sm text-bk-fg outline-none select-none',
        'data-[highlighted]:bg-bk-primary data-[highlighted]:text-bk-primary-fg',
        'data-[disabled]:opacity-45',
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
      // Organic writes small labels as accent kickers.
      className={cn(
        'px-3 py-2 font-bk-sans text-[11px] tracking-[0.1em] text-bk-primary uppercase',
        className,
      )}
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
      className={cn('-mx-1.5 my-1.5 h-px bg-bk-border', className)}
      {...props}
    />
  );
}

export const Select = {
  Root: BaseSelect.Root,
  Label: BaseSelect.Label,
  Trigger: SelectTrigger,
  Value: BaseSelect.Value,
  Icon: SelectIcon,
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
