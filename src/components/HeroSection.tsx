import { useState, useCallback, useRef, useEffect } from 'react';
import { ScanAnimation } from './ScanAnimation';
import { Results } from './Results';
import { demoResults } from '../data/demoData';

type AnalysisType = 'alive' | 'dying' | 'dead';

interface HeroSectionProps {
  triggerAnalysis: AnalysisType | null;
  onAnalysisTriggered: () => void;
}

export function HeroSection({ triggerAnalysis, onAnalysisTriggered }: HeroSectionProps) {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [resultType, setResultType] = useState<AnalysisType>('dying');
  const [showStats, setShowStats] = useState(true);
  const [inputError, setInputError] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runScan = useCallback((type: AnalysisType) => {
    clearTimers();
    setShowStats(false);
    setShowResults(false);
    setScanning(true);
    setActiveStep(0);
    setCompletedSteps([]);

    for (let i = 0; i < 5; i++) {
      const t = setTimeout(() => {
        setCompletedSteps(prev => (i > 0 ? [...prev, i - 1] : prev));
        setActiveStep(i);
      }, i * 800);
      timersRef.current.push(t);
    }

    const finishTimer = setTimeout(() => {
      setCompletedSteps([0, 1, 2, 3, 4]);
      setActiveStep(-1);

      const showTimer = setTimeout(() => {
        setScanning(false);
        setResultType(type);
        setShowResults(true);
      }, 500);
      timersRef.current.push(showTimer);
    }, 4500);
    timersRef.current.push(finishTimer);
  }, [clearTimers]);

  useEffect(() => {
    if (triggerAnalysis) {
      const urls: Record<AnalysisType, string> = {
        alive: 'https://reddit.com/r/programming',
        dying: 'https://forums.oldgamesite.net',
        dead: 'https://myspace.com/oldband2008',
      };
      setUrl(urls[triggerAnalysis]);
      runScan(triggerAnalysis);
      onAnalysisTriggered();
    }
  }, [triggerAnalysis, runScan, onAnalysisTriggered]);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const handleScan = () => {
    if (!url) {
      setInputError(true);
      setTimeout(() => setInputError(false), 1000);
      return;
    }

    let type: AnalysisType = 'dying';
    if (url.includes('reddit') || url.includes('github') || url.includes('stackoverflow')) {
      type = 'alive';
    } else if (url.includes('myspace') || url.includes('dead') || url.includes('old')) {
      type = 'dead';
    }

    runScan(type);
  };

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center pt-[120px] pb-20 px-[50px] relative z-1 max-[900px]:px-6 max-[900px]:pt-[120px] max-[900px]:pb-15" id="analyzer">
        {/* Badge */}
        <div className="font-mono text-[0.65rem] tracking-[4px] uppercase text-[#999] border border-[#d0d0d0] py-2 px-5 mb-10 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-black animate-blink" />
          Dead Internet Detection Engine v1.0
        </div>

        {/* Heading */}
        <h1 className="font-sans font-black text-center leading-none tracking-[-3px] mb-7.5 text-[clamp(3rem,8vw,7rem)] text-[#1a1a1a] max-[900px]:tracking-[-1px]">
          IS THIS SITE<br />
          <span className="outline-text">EVEN REAL</span><br />
          ANYMORE?
        </h1>

        {/* Description */}
        <p className="text-[1.1rem] font-light text-[#6b6b6b] text-center max-w-[550px] leading-[1.8] mb-[50px]">
          Paste any URL. We'll crawl it, analyze activity patterns,
          detect bot behavior, and tell you if this corner of the
          internet is alive, dying, or already dead.
        </p>

        {/* URL Input */}
        <div className="w-full max-w-[650px] relative mb-7.5">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="paste any url here..."
            spellCheck={false}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            className={`w-full py-[22px] pl-7.5 pr-[140px] font-mono text-[0.85rem] bg-white border-2 text-[#1a1a1a] outline-none transition-all duration-300 tracking-[1px] placeholder:text-[#999] focus:border-black focus:shadow-[0_5px_30px_rgba(0,0,0,0.08)] ${
              inputError ? 'border-[#F44336]' : 'border-[#d0d0d0]'
            }`}
          />
          <button
            onClick={handleScan}
            className="absolute right-2 top-1/2 -translate-y-1/2 py-3.5 px-7 font-mono text-[0.7rem] bg-black text-white border-none tracking-[2px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#333]"
          >
            SCAN →
          </button>
        </div>

        {/* Scan Animation */}
        {scanning && (
          <ScanAnimation activeStep={activeStep} completedSteps={completedSteps} />
        )}

        {/* Stats */}
        {showStats && !scanning && !showResults && (
          <div className="flex gap-[50px] mt-5 max-[900px]:gap-7.5 max-[600px]:flex-col max-[600px]:gap-5">
            {[
              { number: '847K', label: 'URLs Scanned' },
              { number: '62%', label: 'Found Dead' },
              { number: '23%', label: 'Bot Activity' },
            ].map(({ number, label }) => (
              <div key={label} className="text-center">
                <div className="font-mono text-2xl font-bold text-[#1a1a1a]">{number}</div>
                <div className="text-[0.7rem] text-[#999] tracking-[2px] uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Results */}
      {showResults && (
        <Results data={demoResults[resultType]} type={resultType} />
      )}
    </>
  );
}
