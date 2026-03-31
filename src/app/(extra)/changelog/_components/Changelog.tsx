'use client';

import {
  FaCodeBranch,
  FaTag,
  FaWrench,
  FaStar,
  FaShieldAlt,
  FaRocket,
  FaBug,
  FaLayerGroup,
} from 'react-icons/fa';
import { MdNewReleases, MdUpdate } from 'react-icons/md';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { useState } from 'react';

type ChangeType =
  | 'feat'
  | 'fix'
  | 'refactor'
  | 'perf'
  | 'security'
  | 'breaking';

interface ChangeEntry {
  type: ChangeType;
  description: string;
}

interface Release {
  version: string;
  date: string;
  label?: 'latest' | 'stable' | 'legacy';
  summary: string;
  changes: ChangeEntry[];
}

const changeTypeConfig: Record<
  ChangeType,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  feat: {
    label: 'Feature',
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-200',
    icon: <FaStar className="text-green-500" />,
  },
  fix: {
    label: 'Fix',
    color: 'text-red-700',
    bg: 'bg-red-50 border-red-200',
    icon: <FaBug className="text-red-500" />,
  },
  refactor: {
    label: 'Refactor',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    icon: <FaLayerGroup className="text-blue-500" />,
  },
  perf: {
    label: 'Performance',
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200',
    icon: <FaRocket className="text-purple-500" />,
  },
  security: {
    label: 'Security',
    color: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-200',
    icon: <FaShieldAlt className="text-orange-500" />,
  },
  breaking: {
    label: 'Breaking Change',
    color: 'text-rose-700',
    bg: 'bg-rose-50 border-rose-200',
    icon: <FaWrench className="text-rose-500" />,
  },
};

const ALL_TYPES: ChangeType[] = [
  'feat',
  'fix',
  'refactor',
  'perf',
  'security',
  'breaking',
];

const RELEASES: Release[] = [
  {
    version: '3.2.4',
    date: 'March 31, 2026',
    label: 'latest',
    summary: 'Auto-login after registration and UI polish.',
    changes: [
      {
        type: 'feat',
        description:
          'Log in users automatically immediately after successful registration.',
      },
      {
        type: 'fix',
        description:
          'Resolve controlled/uncontrolled input conflict in checkout address fields using React Hook Form.',
      },
      {
        type: 'fix',
        description:
          'Fix several broken internal navigation links across static pages.',
      },
      {
        type: 'fix',
        description:
          'Safely invoke optional onClick callback in LoginForm using optional chaining.',
      },
      {
        type: 'fix',
        description: 'Correct IconBanner alignment and spacing styles.',
      },
      {
        type: 'fix',
        description: 'Resolve TypeScript parsing issue in checkout flow.',
      },
    ],
  },
  {
    version: '3.2.0',
    date: 'March 29, 2026',
    label: 'stable',
    summary:
      'Full backend integration, SEO improvements, and complete review feature.',
    changes: [
      {
        type: 'feat',
        description:
          'Add initial SEO improvements — metadata, Open Graph, and Twitter card tags across all pages.',
      },
      {
        type: 'feat',
        description: 'Complete backend API integrations for all core features.',
      },
      {
        type: 'feat',
        description:
          'Integrate product review APIs using the BFF pattern and finalize the Review feature end-to-end.',
      },
    ],
  },
  {
    version: '3.1.0',
    date: 'March 28, 2026',
    summary: 'Address management, settings page, and component reorganization.',
    changes: [
      {
        type: 'refactor',
        description:
          'Reorganize components into _components folders for better co-location.',
      },
      {
        type: 'feat',
        description: 'Build out settings page with full user preferences UI.',
      },
      {
        type: 'feat',
        description:
          'Address Feature — users can add, edit, and delete addresses via profile pages using the BFF pattern.',
      },
    ],
  },
  {
    version: '3.0.0',
    date: 'March 27, 2026',
    summary:
      'Reset password flow, wishlist integration, and authentication fixes.',
    changes: [
      {
        type: 'feat',
        description:
          'Complete Reset Password logic and its full UI on the Profile page.',
      },
      {
        type: 'fix',
        description: 'Fix price column display in Wishlist page.',
      },
      {
        type: 'fix',
        description:
          'Add missing quantity prop to ProductCard in ProductSwiper.',
      },
      {
        type: 'refactor',
        description:
          'Finish wishlist API integration with Next.js BFF layer and Redux state handling.',
      },
      {
        type: 'fix',
        description:
          'Resolve Next.js prerender error by wrapping useSearchParams in a Suspense boundary on the login page.',
      },
      {
        type: 'fix',
        description:
          'Fix useSearchParams server/client component boundary issue in the login page.',
      },
    ],
  },
  {
    version: '2.5.0',
    date: 'March 26, 2026',
    summary: 'Cart BFF layer, Redux cart state, and full cart API coverage.',
    changes: [
      {
        type: 'refactor',
        description:
          'Decouple cart logic from client components by introducing a Next.js BFF layer with Redux state handling.',
      },
      { type: 'feat', description: 'Add dispatch for Clear Cart action.' },
      {
        type: 'feat',
        description:
          'Complete all Cart V2 API integrations — next step: Wishlist and remaining Auth APIs.',
      },
    ],
  },
  {
    version: '2.0.0',
    date: 'March 25, 2026',
    summary: 'Core product display, shopping cart, and Redux setup.',
    changes: [
      { type: 'feat', description: 'Add numOfCartItems badge in NavBar.' },
      {
        type: 'feat',
        description:
          'Implement core product display components, shopping cart functionality, and Redux state management.',
      },
    ],
  },
  {
    version: '1.5.0',
    date: 'March 24, 2026',
    label: 'legacy',
    summary: 'Protected routes, support pages, and contact form.',
    changes: [
      {
        type: 'fix',
        description:
          'Safely invoke optional onClick in SearchHeader using optional chaining.',
      },
      {
        type: 'feat',
        description: 'Add ProtectedRoutes via Next.js middleware proxy.',
      },
      {
        type: 'feat',
        description:
          'Add Support & Legal static pages (Help, Shipping, Returns, Privacy, Terms, Cookies).',
      },
      {
        type: 'feat',
        description: 'Add Contact Us page with form data handling.',
      },
    ],
  },
  {
    version: '1.2.0',
    date: 'March 19–22, 2026',
    summary:
      'Authentication system, product filtering, and subcategory support.',
    changes: [
      {
        type: 'feat',
        description: 'Add product review counter on the Reviews tab.',
      },
      {
        type: 'feat',
        description:
          'Add subcategory filtering, dynamic metadata, and UI enhancements on Products page.',
      },
      {
        type: 'feat',
        description: 'Handle logout flow and add Filter component.',
      },
      {
        type: 'feat',
        description:
          'Complete authentication setup with NextAuth — JWT decoding, session callbacks, routeToken, and secure cookie configuration.',
      },
    ],
  },
  {
    version: '1.0.0',
    date: 'March 5–16, 2026',
    summary: 'Initial release — UI foundation, pages, and component library.',
    changes: [
      {
        type: 'feat',
        description:
          'Complete Login & Register UI with React Hook Form and 90% of register logic.',
      },
      {
        type: 'feat',
        description:
          'Add Brands page, Product Details page, and app-wide image placeholder.',
      },
      {
        type: 'feat',
        description:
          'Add Categories page, Pagination, and Products listing page.',
      },
      {
        type: 'feat',
        description:
          'Add Breadcrumb component and Share button on Product Details.',
      },
      {
        type: 'feat',
        description:
          'Add HeroUI, configure Tailwind CSS v4, and implement NetworkStatusToast.',
      },
      {
        type: 'feat',
        description:
          'Complete Home Page — carousel, swiper, feature cards, footer, and category section.',
      },
      {
        type: 'refactor',
        description:
          'Enhance API handler and separate business logic from UI components.',
      },
      { type: 'feat', description: 'Finalize responsive Header component.' },
    ],
  },
];

function VersionBadge({ label }: { label: Release['label'] }) {
  if (!label) return null;

  const styles = {
    latest: 'bg-green-600 text-white',
    stable: 'bg-blue-100 text-blue-700',
    legacy: 'bg-gray-100 text-gray-500',
  };

  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${styles[label]}`}
    >
      {label}
    </span>
  );
}

function ChangeTypeBadge({ type }: { type: ChangeType }) {
  const cfg = changeTypeConfig[type];
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}
    >
      <span className="text-[10px]">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

function ReleaseCard({
  release,
  activeTypes,
}: {
  release: Release;
  activeTypes: ChangeType[];
}) {
  const filteredChanges =
    activeTypes.length === 0
      ? release.changes
      : release.changes.filter(c => activeTypes.includes(c.type));

  if (filteredChanges.length === 0) return null;

  const isLatest = release.label === 'latest';

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm p-6 lg:p-8 transition-all ${
        isLatest ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-100'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <FaTag className="text-green-600 text-base" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900 font-mono">
                v{release.version}
              </h2>
              <VersionBadge label={release.label} />
            </div>
            <p className="text-gray-400 text-xs mt-0.5">{release.date}</p>
          </div>
        </div>
        <span className="text-sm text-gray-500 bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5 max-w-sm text-right">
          {release.summary}
        </span>
      </div>

      <ul className="space-y-3">
        {filteredChanges.map((change, i) => (
          <li key={i} className="flex items-start gap-3">
            <ChangeTypeBadge type={change.type} />
            <p className="text-gray-600 text-sm leading-relaxed">
              {change.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChangelogPage() {
  const [activeTypes, setActiveTypes] = useState<ChangeType[]>([]);

  const toggleType = (type: ChangeType) => {
    setActiveTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const totalReleases = RELEASES.length;
  const totalChanges = RELEASES.reduce((acc, r) => acc + r.changes.length, 0);
  const currentVersion = RELEASES[0].version;

  return (
    <>
      <PageHeader
        title="Changelog"
        subTitle="Every improvement, fix, and new feature — documented in one place."
        subTitle2="Changelog"
        icon={<MdNewReleases size={40} />}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaCodeBranch className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Current Version
                  </h3>
                  <p className="text-green-700 font-mono font-bold text-2xl">
                    v{currentVersion}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {totalReleases} releases · {totalChanges} changes
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">
                Filter by Type
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                Show only specific change types across all releases.
              </p>
              <div className="flex flex-wrap gap-2">
                {ALL_TYPES.map(type => {
                  const cfg = changeTypeConfig[type];
                  const active = activeTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                        active
                          ? `${cfg.bg} ${cfg.color} shadow-sm`
                          : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {cfg.icon}
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
              {activeTypes.length > 0 && (
                <button
                  onClick={() => setActiveTypes([])}
                  className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <MdUpdate className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Release Stats
                  </h3>
                  <div className="space-y-2">
                    {ALL_TYPES.map(type => {
                      const cfg = changeTypeConfig[type];
                      const count = RELEASES.flatMap(r => r.changes).filter(
                        c => c.type === type
                      ).length;
                      if (count === 0) return null;
                      return (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <div
                            className={`flex items-center gap-1.5 text-xs font-medium ${cfg.color}`}
                          >
                            {cfg.icon}
                            {cfg.label}
                          </div>
                          <span className="text-xs font-bold text-gray-700 bg-gray-50 rounded-full px-2 py-0.5">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {RELEASES.map(release => (
              <ReleaseCard
                key={release.version}
                release={release}
                activeTypes={activeTypes}
              />
            ))}

            {activeTypes.length > 0 &&
              RELEASES.every(
                r => !r.changes.some(c => activeTypes.includes(c.type))
              ) && (
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
                  <FaBug className="text-gray-300 text-3xl mx-auto mb-3" />
                  <p className="font-semibold text-gray-500 text-sm">
                    No changes match the selected filters.
                  </p>
                  <button
                    onClick={() => setActiveTypes([])}
                    className="mt-3 text-xs text-green-600 hover:underline font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangelogPage;
