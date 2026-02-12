export function ExtensionSection() {
  return (
    <section className="py-[120px] px-[50px] bg-[#e8e8e8] relative z-1 max-[900px]:py-20 max-[900px]:px-6" id="extension">
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-20 items-center max-[900px]:grid-cols-1 max-[900px]:gap-10">
        {/* Text */}
        <div>
          <div className="font-mono text-[0.65rem] tracking-[4px] uppercase text-[#999] mb-5">Browser Plugin</div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-2px] mb-5">
            See the truth<br />on every site.
          </h2>
          <p className="text-base text-[#6b6b6b] leading-[1.8] mb-7.5">
            Install the GhostNet extension and see a live badge on every
            website you visit. No more guessing — know instantly if a
            community is alive, dying, or dead.
          </p>
          <div className="flex gap-4 mb-7.5 max-[600px]:flex-col">
            {['🟢 Alive', '🟡 Dying', '🔴 Dead'].map((badge) => (
              <div key={badge} className="font-mono text-[0.7rem] py-2 px-4 border border-[#d0d0d0] bg-white tracking-[2px] flex items-center gap-2">
                {badge}
              </div>
            ))}
          </div>
          <button className="font-mono text-[0.7rem] py-4 px-9 bg-black text-white border-none tracking-[2px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#333] hover:-translate-y-0.5">
            Download for Chrome →
          </button>
        </div>

        {/* Browser Preview */}
        <div className="bg-white border border-[#d0d0d0] p-7.5 relative">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#e8e8e8]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#d0d0d0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#d0d0d0]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#d0d0d0]" />
            <div className="flex-1 h-7 bg-[#f2f2f2] border border-[#d0d0d0] ml-2.5 flex items-center px-3 font-mono text-[0.6rem] text-[#999]">
              https://old-forum.example.com
            </div>
          </div>
          <div className="min-h-[200px] bg-[#f2f2f2] relative flex items-start p-5">
            <div className="flex flex-col gap-2.5 w-full">
              {[80, 60, 90, 45, 70].map((w, i) => (
                <div key={i} className="h-2 bg-[#d0d0d0]" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[0.65rem] py-2 px-3.5 bg-black text-white tracking-[2px] flex items-center gap-1.5 animate-badge-pulse">
              🔴 DEAD — Score: 12
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
