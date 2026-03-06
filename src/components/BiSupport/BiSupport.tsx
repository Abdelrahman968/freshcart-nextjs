import Link from 'next/link';
import { BiSupport as SupportIcon } from 'react-icons/bi';

interface BiSupportProps {
  LinkClassName: string;
  iconClassName: string;
  size: number;
  color: string;
  strokeWidth: number;
  textDivClassName: string;
  firstText: string;
  secondText: string[];
  firstTextClassName: string;
  secondTextClassName: string;
}

function BiSupport({
  LinkClassName,
  iconClassName,
  size,
  color,
  strokeWidth,
  textDivClassName,
  firstText,
  secondText,
  firstTextClassName,
  secondTextClassName,
}: BiSupportProps) {
  return (
    <>
      <Link href="/support" className={LinkClassName}>
        <div className={iconClassName}>
          <SupportIcon color={color} size={size} strokeWidth={strokeWidth} />
        </div>
        <div className={textDivClassName}>
          <p className={firstTextClassName}>{firstText}</p>
          <p className={secondTextClassName}>
            {secondText?.[0]}{' '}
            <span className="text-green-600">{secondText?.[1]}</span>
          </p>
        </div>
      </Link>
    </>
  );
}

export default BiSupport;
