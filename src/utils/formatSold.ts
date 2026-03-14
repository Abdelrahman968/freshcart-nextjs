export default function formatSold(value: number) {
  if (!Number.isFinite(value) || value > 1_000_000_000) return '0';

  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}
