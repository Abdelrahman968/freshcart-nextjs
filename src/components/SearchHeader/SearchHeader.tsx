'use client';
import { IoSearch } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type Inputs = {
  searchQ: string;
};

type SearchHeaderProps = {
  placeholder: string;
  roundValue: string;
  width: string;
  height: string;
  onClick?: () => void;
};

function SearchHeader({
  placeholder,
  roundValue,
  width,
  height,
  onClick,
}: SearchHeaderProps) {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      searchQ: '',
    },
    mode: 'onSubmit',
  });

  const router = useRouter();

  const onSubmit = async (data: { searchQ: string }) => {
    router.push(`/search?q=${data.searchQ}`);
    onClick?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <input
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        className={`${width} ${height} px-5 py-3 pr-12 ${roundValue} border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm placeholder:text-[#36415380]`}
        {...register('searchQ')}
      />

      <button
        type="submit"
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 ${roundValue} bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors ease-in-out duration-300 cursor-pointer`}
      >
        <IoSearch />
      </button>
    </form>
  );
}

export default SearchHeader;
