import type { IconBannerType } from '../../data/iconBanner';

function IconBanner({
  data,
  extraClass,
}: {
  data: IconBannerType[];
  extraClass?: string;
}) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map(
          ({ id, Icon, title, description, color, bgc, roundedValue }) => (
            <div
              key={id}
              className={`flex flex-row-reverse md:flex-row items-center justify-between md:justify-start gap-4 p-4 animate-in fade-in slide-in-from-bottom-8 duration-500 ${extraClass}`}
              style={{ animationDelay: `${id * 150}ms` }}
            >
              <div
                className={`${bgc} ${roundedValue} w-12 h-12 flex items-center justify-center shrink-0`}
              >
                <Icon size={24} className={color} />
              </div>

              <div className="flex flex-col md:text-left md:items-start justify-center">
                <p className="font-semibold text-gray-800 text-sm">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default IconBanner;
