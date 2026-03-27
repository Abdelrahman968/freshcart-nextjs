import {
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineShieldCheck,
} from 'react-icons/hi';

const trustBadges = [
  { icon: <HiOutlineMail />, label: 'Email Verification' },
  { icon: <HiOutlineShieldCheck />, label: 'Secure Reset' },
  { icon: <HiOutlineLockClosed />, label: 'Encrypted' },
];

function ForgotPassImage() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center space-y-6 h-full">
      <div className="w-full h-96 bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-emerald-100/50" />
        <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50" />
        <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-teal-100/50" />

        <div className="relative flex flex-col items-center gap-6 z-10">
          <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <HiOutlineLockClosed className="text-emerald-600 text-4xl" />
            </div>
          </div>

          <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
            <HiOutlineMail className="text-emerald-500 text-xl" />
          </div>
          <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
            <HiOutlineShieldCheck className="text-green-500 text-xl" />
          </div>

          <div className="flex gap-3 mt-4">
            {[0, 150, 300].map(delay => (
              <div
                key={delay}
                className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center space-y-4 max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800">
          Reset Your Password
        </h2>
        <p className="text-base text-gray-500 leading-relaxed">
          Don&apos;t worry, it happens to the best of us. We&apos;ll help you
          get back into your account in no time.
        </p>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-400 pt-2">
          {trustBadges.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-emerald-600">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassImage;
