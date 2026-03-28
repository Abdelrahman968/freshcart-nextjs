import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';

function SuccessStep() {
  return (
    <div className="flex flex-col items-center text-center space-y-4 py-4">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce-slow">
        <HiCheckCircle className="text-emerald-600" size={40} />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Password Reset!</h2>
      <p className="text-gray-500 text-sm max-w-xs">
        Your password has been updated successfully. You can now sign in with
        your new password.
      </p>
      <Link
        href="/login"
        className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Back to Sign In
      </Link>
    </div>
  );
}

export default SuccessStep;
