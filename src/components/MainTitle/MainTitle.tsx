import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface MainTitleProps {
  textOne: string;
  textTwo: string;
  linkText?: string;
  linkUrl?: string;
}

function MainTitle({
  textOne = 'Shop By',
  textTwo = 'Category',
  linkText,
  linkUrl,
}: MainTitleProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-4">
      <div className="flex items-center gap-3 my-8">
        <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {textOne} <span className="text-emerald-600">{textTwo}</span>
        </h2>
      </div>
      {linkText && linkUrl && (
        <Link
          href={`${linkUrl}`}
          className="self-end sm:self-auto font-medium flex items-center cursor-pointer gap-2 text-green-600 hover:text-green-800 transition-all duration-300 ease-in-out"
        >
          <p>{linkText}</p>
          <FaArrowRight />
        </Link>
      )}
    </div>
  );
}

export default MainTitle;
