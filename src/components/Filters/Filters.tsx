import Link from 'next/link';
import { FaTags } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { TbFilterSpark } from 'react-icons/tb';

function Filters({
  itemName,
  fallbackURL,
}: {
  itemName: string;
  fallbackURL: string;
}) {
  return (
    <div className="container mx-auto px-4 py-2 flex items-center gap-3 flex-wrap">
      <span className="flex items-center gap-2 text-sm text-gray-600">
        <TbFilterSpark size={20} />
        <p className="font-semibold">Active Filters:</p>
      </span>
      <Link
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition-colors"
        href={`/${fallbackURL}`}
      >
        <FaTags />
        <p>{itemName}</p>
        <IoClose />
      </Link>
      <Link
        className="text-sm text-gray-500 hover:text-gray-700 underline"
        href={`/${fallbackURL}`}
      >
        Clear all
      </Link>
    </div>
  );
}

export default Filters;
