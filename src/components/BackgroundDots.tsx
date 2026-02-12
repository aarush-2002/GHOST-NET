export function BackgroundDots() {
  const dots = Array.from({ length: 80 }, (_, i) => {
    const size = Math.random() * 20 + 2;
    return (
      <div
        key={i}
        className="absolute rounded-full bg-black"
        style={{
          width: size,
          height: size,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.07 + 0.02,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {dots}
    </div>
  );
}
