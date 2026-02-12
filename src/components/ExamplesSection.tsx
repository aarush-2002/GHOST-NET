import { useEffect, useRef, useState, useMemo } from 'react';

type AnalysisType = 'alive' | 'dying' | 'dead';

interface ExamplesSectionProps {
  onExampleClick: (type: AnalysisType) => void;
}

function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-10 mt-4">
      {data.map((val, i) => (
        <div
          key={i}
          className="flex-1 bg-black opacity-30 min-w-[3px]"
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

const examples: { type: AnalysisType; status: string; dotClass: string; url: string; score: number; data: number[] }[] = [
  {
    type: 'alive',
    status: 'Alive',
    dotClass: 'bg-[#4CAF50]',
    url: 'reddit.com/r/programming',
    score: 94,
    data: [40, 45, 50, 48, 55, 60, 58, 65, 70, 68, 75, 80],
  },
  {
    type: 'dying',
    status: 'Dying',
    dotClass: 'bg-[#FF9800]',
    url: 'forums.oldgamesite.net',
    score: 38,
    data: [80, 75, 65, 55, 45, 35, 28, 20, 15, 10, 8, 5],
  },
  {
    type: 'dead',
    status: 'Dead',
    dotClass: 'bg-[#F44336]',
    url: 'myspace.com/oldband2008',
    score: 7,
    data: [50, 45, 30, 15, 5, 2, 0, 0, 0, 0, 0, 0],
  },
];

export function ExamplesSection({ onExampleClick }: ExamplesSectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const memoizedExamples = useMemo(() => examples, []);

  return (
    <section className="py-[120px] px-[50px] relative z-1 max-[900px]:py-20 max-[900px]:px-6" id="examples" ref={ref}>
      <div className="text-center mb-20">
        <div className="font-mono text-[0.65rem] tracking-[4px] uppercase text-[#999] mb-5">Real Results</div>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-2px] text-[#1a1a1a]">Live Examples</h2>
      </div>

      <div className="grid grid-cols-3 gap-5 max-w-[1100px] mx-auto max-[900px]:grid-cols-1">
        {memoizedExamples.map((example, i) => (
          <div
            key={example.type}
            className="bg-white border border-[#d0d0d0] p-7.5 transition-all duration-600 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.15}s`,
            }}
            onClick={() => onExampleClick(example.type)}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className={`w-2.5 h-2.5 rounded-full ${example.dotClass}`} />
              <span className="font-mono text-[0.65rem] tracking-[2px] uppercase">{example.status}</span>
            </div>
            <div className="font-mono text-[0.75rem] text-[#6b6b6b] mb-4 break-all">{example.url}</div>
            <div className="font-mono text-[2.5rem] font-bold text-[#1a1a1a] mb-2.5">{example.score}</div>
            <MiniChart data={example.data} />
          </div>
        ))}
      </div>
    </section>
  );
}
