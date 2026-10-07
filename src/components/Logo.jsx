export default function Logo({ size = 34 }) {
  return (
    <svg viewBox="22 22 56 56" width={size} height={size} aria-hidden="true">
      <rect x="22" y="22" width="18" height="56" fill="#EEF3F6" />
      <rect x="44" y="22" width="34" height="16" fill="#EEF3F6" />
      <rect x="44" y="42" width="22" height="16" fill="#EEF3F6" />
      <rect x="58" y="62" width="20" height="16" fill="#2BA3D9" />
    </svg>
  );
}
