interface Props {
  onOpen: () => void;
}

export function AssistantLauncher({ onOpen }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="fixed left-3 top-1/2 hidden h-[120px] w-[60px] -translate-y-1/2 items-center justify-center rounded-r-full bg-mocha-primary text-sm font-mono uppercase tracking-[0.2em] text-mocha-base shadow-surface transition-transform duration-200 hover:translate-x-1 md:flex"
        aria-label="Open AI assistant"
      >
        &gt; Say
        <br />
        something
      </button>
      <button
        type="button"
        onClick={onOpen}
        className="fixed bottom-6 left-4 flex h-14 w-[180px] items-center justify-center rounded-full bg-mocha-primary text-sm font-mono uppercase tracking-[0.25em] text-mocha-base shadow-surface transition-transform duration-200 hover:-translate-y-1 md:hidden"
        aria-label="Open AI assistant"
      >
        &gt; Say something
      </button>
    </>
  );
}
