import { useEffect, useState, useMemo } from 'react';
import type { DemoResult } from '../data/demoData';

interface ResultsProps {
  data: DemoResult;
  type: 'alive' | 'dying' | 'dead';
}

export function Results({ data, type }: ResultsProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [barWidths, setBarWidths] = useState({ similarity: 0, timing: 0, account: 0, language: 0 });

  useEffect(() => {
    setAnimatedScore(0);
    setBarWidths({ similarity: 0, timing: 0, account: 0, language: 0 });

    const timer = setTimeout(() => {
      setAnimatedScore(data.score);
      setBarWidths({
        similarity: data.similarity,
        timing: data.timing,
        account: data.account,
        language: data.language,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [data]);

  const maxTimeline = Math.max(...data.timeline);

  const heatmapData = useMemo(() => {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    return days.map((day, di) => {
      const cells = Array.from({ length: 24 }, (_, h) => {
        let level: number;
        if (type === 'alive') {
          if (h >= 9 && h <= 21) {
            level = Math.floor(Math.random() * 3) + 3;
          } else {
            level = Math.floor(Math.random() * 2);
          }
          if (di >= 5) level = Math.max(0, level - 1);
        } else if (type === 'dying') {
          level = Math.floor(Math.random() * 3);
        } else {
          if (Math.random() > 0.7) {
            level = Math.floor(Math.random() * 5) + 1;
          } else {
            level = 0;
          }
        }
        return level;
      });
      return { day, cells };
    });
  }, [type]);

  const levelColors: Record<number, string> = {
    0: 'bg-[#e8e8e8]',
    1: 'bg-[#e0e0e0]',
    2: 'bg-[#bdbdbd]',
    3: 'bg-[#888]',
    4: 'bg-[#555]',
    5: 'bg-[#1a1a1a]',
  };

  const botIndicators = [
    { label: 'Comment Similarity', value: barWidths.similarity },
    { label: 'Timing Regularity', value: barWidths.timing },
    { label: 'Account Suspicion', value: barWidths.account },
    { label: 'Language Complexity', value: barWidths.language },
  ];

  return (
    <div className="w-full max-w-[900px] mx-auto px-[50px] pb-[100px] relative z-1 animate-fade-in-up max-[900px]:px-6 max-[900px]:pb-20">
      {/* Life Score Card */}
      <div className="bg-white border-2 border-[#d0d0d0] p-[50px] text-center mb-7.5">
        <div className="font-mono text-[0.7rem] tracking-[4px] uppercase text-[#999] mb-5">
          Life Score
        </div>
        <div className="font-mono text-[6rem] font-bold leading-none mb-2.5">
          {animatedScore}
        </div>
        <div className="font-mono text-base tracking-[6px] uppercase mb-5">
          {data.status}
        </div>
        <div className="w-full h-1 bg-[#e8e8e8] mt-5 relative overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-[1.5s] ease-out"
            style={{ width: `${animatedScore}%` }}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-0.5 mb-7.5 max-[900px]:grid-cols-1">
        {[
          { icon: '🕐', value: data.lastPost, label: 'Last Activity' },
          { icon: '🤖', value: data.botRate, label: 'Bot Probability' },
          { icon: '📉', value: data.trend, label: 'Activity Trend' },
        ].map(({ icon, value, label }) => (
          <div key={label} className="bg-white border border-[#d0d0d0] p-7.5 text-center">
            <div className="text-2xl mb-4">{icon}</div>
            <div className="font-mono text-[1.8rem] font-bold text-[#1a1a1a] mb-1">{value}</div>
            <div className="font-mono text-[0.6rem] tracking-[2px] uppercase text-[#999]">{label}</div>
          </div>
        ))}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white border border-[#d0d0d0] p-10 mb-7.5">
        <div className="font-mono text-[0.7rem] tracking-[3px] uppercase text-[#999] mb-7.5">
          Activity Timeline — Posts Per Month
        </div>
        <div className="flex items-end gap-1 h-[150px] pb-6 border-b border-[#e8e8e8] relative">
          {data.timeline.map((val, i) => (
            <div
              key={i}
              className="flex-1 bg-black min-w-2 relative opacity-70 hover:opacity-100 transition-all duration-1000 group"
              style={{
                height: `${(val / maxTimeline) * 100}%`,
                transitionDelay: `${i * 0.05}s`,
              }}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] text-[#1a1a1a] whitespace-nowrap hidden group-hover:block">
                {val} posts
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2.5">
          <span className="font-mono text-[0.55rem] text-[#999] tracking-[1px]">12 months ago</span>
          <span className="font-mono text-[0.55rem] text-[#999] tracking-[1px]">6 months ago</span>
          <span className="font-mono text-[0.55rem] text-[#999] tracking-[1px]">Now</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white border border-[#d0d0d0] p-10 mb-7.5">
        <div className="font-mono text-[0.7rem] tracking-[3px] uppercase text-[#999] mb-7.5">
          Engagement Heatmap — Activity by Hour & Day
        </div>
        <div className="grid gap-0.5 mt-5" style={{ gridTemplateColumns: '40px repeat(24, 1fr)' }}>
          {heatmapData.map(({ day, cells }) => (
            <>
              <div key={`label-${day}`} className="font-mono text-[0.5rem] text-[#999] flex items-center tracking-[1px]">
                {day}
              </div>
              {cells.map((level, h) => (
                <div
                  key={`${day}-${h}`}
                  className={`aspect-square ${levelColors[level]} transition-all duration-300 hover:scale-130 hover:z-2`}
                />
              ))}
            </>
          ))}
        </div>
        <div className="grid gap-0.5 mt-1" style={{ gridTemplateColumns: '40px repeat(24, 1fr)' }}>
          <span />
          {Array.from({ length: 24 }, (_, h) => (
            <span key={h} className="font-mono text-[0.45rem] text-[#999] text-center">
              {h % 3 === 0 ? `${h}h` : ''}
            </span>
          ))}
        </div>
      </div>

      {/* Bot Detection */}
      <div className="bg-white border border-[#d0d0d0] p-10 mb-7.5">
        <div className="font-mono text-[0.7rem] tracking-[3px] uppercase text-[#999] mb-7.5">
          Bot Detection Analysis
        </div>
        <div className="flex flex-col gap-5 mt-5">
          {botIndicators.map(({ label, value }) => (
            <div key={label} className="flex items-center gap-5">
              <div className="font-mono text-[0.7rem] text-[#6b6b6b] w-[180px] shrink-0 tracking-[1px]">
                {label}
              </div>
              <div className="flex-1 h-2 bg-[#e8e8e8] relative">
                <div
                  className="h-full bg-black transition-all duration-[1.5s] ease-out"
                  style={{ width: `${value}%` }}
                />
              </div>
              <div className="font-mono text-[0.75rem] font-bold w-10 text-right shrink-0">
                {value}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
