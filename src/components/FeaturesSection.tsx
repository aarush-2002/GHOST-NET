import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: '🕐',
    title: 'Activity Decay',
    description: 'Track posting frequency over time. Detect slow deaths and sudden abandonments with time-series analysis.',
  },
  {
    icon: '🤖',
    title: 'Bot Detection',
    description: 'NLP-powered detection of repetitive phrasing, unnatural timing patterns, and template-based comments.',
  },
  {
    icon: '📈',
    title: 'Engagement Auth',
    description: 'Separate real engagement from bot-farmed likes. Analyze like-to-comment ratios and timing spikes.',
  },
  {
    icon: '🗺️',
    title: 'Activity Heatmap',
    description: "Visual heatmap showing when activity happens. Humans sleep — bots don't. Spot the difference instantly.",
  },
  {
    icon: '⚡',
    title: 'Adaptive Crawling',
    description: 'Smart rate limiting with rotating headers and adaptive delays. Crawl without getting blocked.',
  },
  {
    icon: '🧩',
    title: 'Browser Extension',
    description: 'Chrome extension shows a live badge on every site you visit. Know instantly if a site is alive or dead.',
  },
];

export function FeaturesSection() {
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
    <section className="py-[120px] px-[50px] bg-[#1a1a1a] text-white relative z-1 max-[900px]:py-20 max-[900px]:px-6" id="features" ref={ref}>
      <div className="text-center mb-20">
        <div className="font-mono text-[0.65rem] tracking-[4px] uppercase text-[#666] mb-5">Capabilities</div>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-2px] text-white">Features</h2>
      </div>

      <div className="grid grid-cols-3 gap-0.5 max-w-[1100px] mx-auto max-[900px]:grid-cols-1">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="bg-[#222] border border-[#333] p-10 transition-all duration-600 hover:bg-[#2a2a2a] hover:-translate-y-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div className="text-[2rem] mb-5">{feature.icon}</div>
            <h3 className="font-mono text-[0.8rem] tracking-[2px] uppercase mb-4 text-white">{feature.title}</h3>
            <p className="text-[0.85rem] text-[#888] leading-[1.7]">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
