import { decodeAuthUserToken } from '../../../../utils/decodeAuthUserToken';
import AddAddress from '../components/AddAddress';
import AddressCard from '../components/AddressCard';

export default async function AddressPage() {
  const token = await decodeAuthUserToken();

  if (!token) {
    return (
      <p className="text-center text-red-500 mt-10 font-bold text-lg">
        Please log in.
      </p>
    );
  }

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/address`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token,
    },
    cache: 'no-store',
  });

  const addresses = await res.json();

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your saved delivery addresses
            </p>
          </div>
          <AddAddress top={true} />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
          <AddressCard addresses={addresses} />
        </div>
      </div>
    </>
  );
}
