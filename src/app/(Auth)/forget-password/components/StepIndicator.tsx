import { HiKey } from 'react-icons/hi2';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';

const steps = [
  { icon: <HiOutlineMail className="text-sm" />, label: 'Email' },
  { icon: <HiKey className="text-sm" />, label: 'Code' },
  { icon: <HiOutlineLockClosed className="text-sm" />, label: 'Reset' },
];

function StepIndicator({ current = 0 }: { current?: number }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              idx <= current
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {step.icon}
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                idx < current ? 'bg-emerald-400' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
export default StepIndicator;
