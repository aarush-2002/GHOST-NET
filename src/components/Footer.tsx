export function Footer() {
  return (
    <footer className="py-15 px-[50px] bg-[#1a1a1a] text-[#666] relative z-1 max-[900px]:px-6">
      <div className="max-w-[1100px] mx-auto flex justify-between items-center max-[900px]:flex-col max-[900px]:gap-5 max-[900px]:text-center">
        <div className="font-mono text-[0.9rem] font-bold text-[#888] tracking-[3px]">
          👻 GHOSTNET
        </div>
        <div className="flex gap-7.5 max-[600px]:flex-col max-[600px]:gap-4 max-[600px]:items-center">
          {['GitHub', 'API Docs', 'Extension', 'About'].map((link) => (
            <a
              key={link}
              href="#"
              className="font-mono text-[0.65rem] text-[#555] no-underline tracking-[2px] uppercase transition-colors duration-300 hover:text-[#999]"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="font-mono text-[0.6rem] text-[#444] tracking-[1px]">
          © 2025 GhostNet — The Dead Internet Detector
        </div>
      </div>
    </footer>
  );
}
