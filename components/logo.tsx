export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <text x="10" y="55" fontFamily="serif" fontSize="48" fontWeight="400" letterSpacing="2" fill="url(#goldGradient)">
        Violet Dream
      </text>
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F4E5C3" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
    </svg>
  )
}
