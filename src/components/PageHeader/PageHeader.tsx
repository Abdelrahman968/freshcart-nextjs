import Link from 'next/link';

function PageHeader({
  title,
  subTitle,
  icon,
}: {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
          <Link className="hover:text-white transition-colors" href="/">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">{title}</span>
        </nav>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-white/80 mt-1">{subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
