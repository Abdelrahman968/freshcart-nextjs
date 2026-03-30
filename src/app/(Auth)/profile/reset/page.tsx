import ChangePassword from '../info/_Components/ChangePassword';

function ResetPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-500 text-sm mt-1">Reset your password</p>
      </div>
      <ChangePassword />
    </div>
  );
}

export default ResetPage;
