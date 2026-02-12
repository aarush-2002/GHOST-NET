import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center z-[1000] bg-[rgba(242,242,242,0.85)] backdrop-blur-[20px] border-b border-[#d0d0d0] transition-all duration-300 ${
        scrolled ? 'py-3.5 px-[50px] shadow-[0_2px_20px_rgba(0,0,0,0.05)]' : 'py-6 px-[50px]'
      } max-[900px]:px-6`}
    >
      <a href="#" className="font-mono text-[1.2rem] font-bold text-[#1a1a1a] no-underline tracking-[3px] flex items-center gap-2.5">
        <span className="text-[1.4rem]">👻</span>
        GHOSTNET
      </a>

      <ul
        className={`flex gap-10 list-none max-[900px]:hidden ${
          mobileOpen
            ? '!flex flex-col fixed inset-0 bg-[#f2f2f2] items-center justify-center gap-7.5 z-[1000] max-[900px]:!flex'
            : ''
        }`}
      >
        {['Analyze', 'How It Works', 'Features', 'Examples', 'Extension'].map((item) => {
          const href = `#${item.toLowerCase().replace(/ /g, '')}`;
          return (
            <li key={item}>
              <a
                href={href === '#analyze' ? '#analyzer' : href === '#howitworks' ? '#how' : href}
                className="font-mono text-[0.75rem] text-[#6b6b6b] no-underline tracking-[2px] uppercase transition-colors duration-300 relative hover:text-[#1a1a1a] group"
                onClick={() => setMobileOpen(false)}
              >
                {item}
                <span className="absolute bottom-[-5px] left-0 w-0 h-px bg-[#1a1a1a] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          );
        })}
      </ul>

      <button className="font-mono text-[0.7rem] py-2.5 px-6 bg-black text-white border-none tracking-[2px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#333] hover:-translate-y-0.5 max-[900px]:hidden">
        Get Extension
      </button>

      <div
        className="hidden max-[900px]:flex flex-col gap-[5px] cursor-pointer z-[1001]"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className="w-[25px] h-0.5 bg-[#1a1a1a] transition-all duration-300" />
        <span className="w-[25px] h-0.5 bg-[#1a1a1a] transition-all duration-300" />
        <span className="w-[25px] h-0.5 bg-[#1a1a1a] transition-all duration-300" />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#f2f2f2] z-[999] flex flex-col items-center justify-center gap-8 min-[901px]:hidden">
          {['Analyze', 'How It Works', 'Features', 'Examples', 'Extension'].map((item) => {
            const href = item === 'Analyze' ? '#analyzer' : item === 'How It Works' ? '#how' : `#${item.toLowerCase()}`;
            return (
              <a
                key={item}
                href={href}
                className="font-mono text-base text-[#6b6b6b] no-underline tracking-[2px] uppercase transition-colors duration-300 hover:text-[#1a1a1a]"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
