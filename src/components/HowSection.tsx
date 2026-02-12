import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    icon: '🔗',
    title: 'Paste URL',
    description: 'Drop any URL — Reddit, forums, blogs, social pages. We handle all platforms.',
  },
  {
    number: '02',
    icon: '🕷️',
    title: 'Crawl & Extract',
    description: 'Our adaptive crawler extracts posts, timestamps, comments, and engagement data.',
  },
  {
    number: '03',
    icon: '🧠',
    title: 'NLP Analysis',
    description: 'Bot detection, sentiment analysis, engagement authenticity checks run in parallel.',
  },
  {
    number: '04',
    icon: '📊',
    title: 'Life Score',
    description: 'Get a 0-100 score with visual breakdowns, timelines, and heatmaps.',
  },
];

export function HowSection() {
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

  return (
    <section className="py-[120px] px-[50px] relative z-1 max-[900px]:py-20 max-[900px]:px-6" id="how" ref={ref}>
      <div className="text-center mb-20">
        <div className="font-mono text-[0.65rem] tracking-[4px] uppercase text-[#999] mb-5">Process</div>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-2px] text-[#1a1a1a]">How It Works</h2>
      </div>

      <div className="grid grid-cols-4 gap-0.5 max-w-[1100px] mx-auto max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="bg-white border border-[#d0d0d0] p-10 px-7.5 text-center transition-all duration-600 relative hover:-translate-y-1.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div className="font-mono text-[3rem] font-bold text-[#e8e8e8] mb-5">{step.number}</div>
            <div className="text-[2rem] mb-5">{step.icon}</div>
            <h3 className="font-mono text-[0.8rem] tracking-[2px] uppercase mb-4 text-[#1a1a1a]">{step.title}</h3>
            <p className="text-[0.85rem] text-[#6b6b6b] leading-[1.7]">{step.description}</p>
            {i < 3 && (
              <span className="absolute right-[-15px] top-1/2 -translate-y-1/2 text-[1.2rem] text-[#999] z-2 max-[900px]:hidden">→</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
