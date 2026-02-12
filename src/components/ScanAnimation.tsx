interface ScanAnimationProps {
  activeStep: number;
  completedSteps: number[];
}

const steps = [
  'Crawling page content...',
  'Analyzing activity timestamps...',
  'Running NLP bot detection...',
  'Checking engagement authenticity...',
  'Calculating life score...',
];

export function ScanAnimation({ activeStep, completedSteps }: ScanAnimationProps) {
  return (
    <div className="flex flex-col items-center py-10 w-full max-w-[650px]">
      {/* Radar scanner */}
      <div className="w-[120px] h-[120px] border-2 border-[#d0d0d0] rounded-full relative mb-7.5">
        {/* Rings */}
        <div className="absolute top-1/2 left-1/2 w-full h-full border border-[#d0d0d0] rounded-full -translate-x-1/2 -translate-y-1/2 animate-scan-pulse" />
        <div className="absolute top-1/2 left-1/2 w-full h-full border border-[#d0d0d0] rounded-full -translate-x-1/2 -translate-y-1/2 animate-scan-pulse-delayed-1" />
        <div className="absolute top-1/2 left-1/2 w-full h-full border border-[#d0d0d0] rounded-full -translate-x-1/2 -translate-y-1/2 animate-scan-pulse-delayed-2" />
        {/* Scan line */}
        <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-black origin-left animate-scan-rotate" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-black rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Steps */}
      <div className="w-full flex flex-col gap-3">
        {steps.map((text, i) => {
          const isDone = completedSteps.includes(i);
          const isActive = activeStep === i;
          return (
            <div
              key={i}
              className={`flex items-center gap-4 font-mono text-[0.75rem] tracking-[1px] transition-colors duration-300 ${
                isDone ? 'text-[#6b6b6b]' : isActive ? 'text-[#1a1a1a]' : 'text-[#999]'
              }`}
            >
              <div
                className={`w-5 h-5 border rounded-full flex items-center justify-center text-[0.6rem] shrink-0 ${
                  isDone
                    ? 'bg-black border-black text-white'
                    : isActive
                    ? 'border-black animate-blink-fast'
                    : 'border-[#d0d0d0]'
                }`}
              >
                {isDone ? '✓' : i + 1}
              </div>
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
