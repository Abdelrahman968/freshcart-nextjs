export default function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <p className="text-green-100 text-sm mt-1">{subtitle}</p>
    </div>
  );
}
