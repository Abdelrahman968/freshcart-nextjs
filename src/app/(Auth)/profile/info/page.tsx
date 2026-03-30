import ProfileInfo from './_Components/ProfileInfo';
import ChangePassword from './_Components/ChangePassword';

function InfoPage() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
        <p className="text-gray-500 text-sm mt-1">
          Update your profile information
        </p>
      </div>
      <ProfileInfo />
    </div>
  );
}

export default InfoPage;
