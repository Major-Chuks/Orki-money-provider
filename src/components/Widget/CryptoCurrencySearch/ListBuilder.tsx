// components/ListBuilder.tsx
import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

type ListBuilderProps<T> = {
  items: T[];
  height?: number;
  estimateSize?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
};

export default function ListBuilder<T>({
  items,
  height = 400,
  estimateSize = 45,
  renderItem,
}: ListBuilderProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      style={{
        height,
        overflowY: "auto",
        contain: "strict",
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            width: "100%",
          }}
        >
          {virtualItems.map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              {renderItem(items[virtualRow.index], virtualRow.index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
