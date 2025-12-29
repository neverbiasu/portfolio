import React from 'react';

interface TerminalBlockProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalBlock({
  title = 'bash',
  children,
  className,
}: TerminalBlockProps) {
  return (
    <div
      className={`font-mono border-2 border-mocha-surface rounded-lg bg-mocha-base text-mocha-text shadow-lg overflow-hidden flex flex-col ${className}`}
    >
      {/* Title bar - fixed height */}
      <div className="flex items-center h-8 px-4 bg-mocha-surface shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-mocha-red"></div>
          <div className="w-3 h-3 rounded-full bg-mocha-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-mocha-green"></div>
        </div>
        <div className="flex-1 text-center text-sm text-mocha-subtle">{title}</div>
        <div className="w-12"></div> {/* Placeholder to balance the title */}
      </div>
      {/* Content area - takes remaining height */}
      <div className="p-4 flex-1 min-h-0">{children}</div>
    </div>
  );
}

