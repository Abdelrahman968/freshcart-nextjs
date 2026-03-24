import Link from 'next/link';
import { Suspense } from 'react';

function PageHeader({
  title,
  subTitle,
  subTitle2,
  subTitle2Link,
  icon,
}: {
  title: string;
  subTitle: string;
  subTitle2?: string;
  subTitle2Link?: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`bg-linear-to-br from-green-800 via-green-600 to-green-500 text-white ${
        title === 'Top Brands'
          ? 'bg-linear-to-br from-violet-800 via-violet-600 to-violet-500'
          : ''
      }`}
    >
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
          <Link className="hover:text-white transition-colors" href="/">
            Home
          </Link>
          {subTitle2 && subTitle2Link && (
            <>
              <span className="text-white/40">/</span>
              <Link
                href={subTitle2Link}
                className="font-medium hover:text-white transition-colors"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  {subTitle2}
                </Suspense>
              </Link>
            </>
          )}
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">
            <Suspense fallback={<div>Loading...</div>}>{title}</Suspense>
          </span>
        </nav>
        <div className="flex flex-col md:flex-row text-center md:text-start items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              <Suspense fallback={<div>Loading...</div>}>{title}</Suspense>
            </h1>
            <p className="text-white/80 mt-1">
              <Suspense fallback={<div>Loading...</div>}>{subTitle}</Suspense>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
