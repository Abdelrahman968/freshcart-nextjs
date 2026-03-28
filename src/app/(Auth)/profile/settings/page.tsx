import { FaEye } from 'react-icons/fa';
import ProfileInfo from './_Components/ProfileInfo';
import ChangePassword from './_Components/ChangePassword';

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 text-sm mt-1">
          Update your profile information and change your password
        </p>
      </div>
      <ProfileInfo />
      <ChangePassword />
    </div>
  );
}

export default SettingsPage;
