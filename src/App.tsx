import { useState, useCallback } from 'react';
import { LaunchScreen } from './components/LaunchScreen';
import { BackgroundDots } from './components/BackgroundDots';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowSection } from './components/HowSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ExamplesSection } from './components/ExamplesSection';
import { ExtensionSection } from './components/ExtensionSection';
import { Footer } from './components/Footer';

type AnalysisType = 'alive' | 'dying' | 'dead';

export function App() {
  const [launchVisible, setLaunchVisible] = useState(true);
  const [triggerAnalysis, setTriggerAnalysis] = useState<AnalysisType | null>(null);

  const handleDismissLaunch = useCallback(() => {
    setLaunchVisible(false);
  }, []);

  const handleExampleClick = useCallback((type: AnalysisType) => {
    setTriggerAnalysis(type);
    const el = document.getElementById('analyzer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleAnalysisTriggered = useCallback(() => {
    setTriggerAnalysis(null);
  }, []);

  return (
    <>
      <LaunchScreen visible={launchVisible} onDismiss={handleDismissLaunch} />
      <BackgroundDots />
      <Navbar />
      <HeroSection
        triggerAnalysis={triggerAnalysis}
        onAnalysisTriggered={handleAnalysisTriggered}
      />
      <HowSection />
      <FeaturesSection />
      <ExamplesSection onExampleClick={handleExampleClick} />
      <ExtensionSection />
      <Footer />
    </>
  );
}
