import { FaCheck, FaTimes } from 'react-icons/fa';

type Props = {
  payment?: string;
  operation?: string;
};

export default function OrderStatus({ payment, operation }: Props) {
  if (!payment || !operation) return null;

  const isSuccess = operation === 'success';

  const config = {
    success: {
      icon: FaCheck,
      colors: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        iconBg: 'bg-green-100',
        text: 'text-green-600',
        title: 'text-green-800',
      },
      title: 'Order Placed Successfully!',
    },
    error: {
      icon: FaTimes,
      colors: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        text: 'text-red-600',
        title: 'text-red-800',
      },
      title: 'Order Placed Unsuccessfully!',
    },
  };

  const current = config[operation as 'success' | 'error'];
  if (!current) return null;

  const Icon = current.icon;
  const colors = current.colors;

  return (
    <div className="mb-8">
      <div className={`${colors.bg} ${colors.border} rounded-2xl p-6`}>
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full ${colors.iconBg} flex items-center justify-center`}
          >
            <Icon className={`${colors.text} text-2xl`} />
          </div>

          <div>
            <h2 className={`text-2xl font-bold ${colors.title}`}>
              {current.title}
            </h2>

            <p className={`${colors.text} mt-1`}>
              Your {payment} order has been placed{' '}
              {isSuccess ? 'successfully' : 'unsuccessfully'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
