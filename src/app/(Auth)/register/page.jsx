import Link from 'next/link';
import {
  FaStar,
  FaTruckFast,
  FaShieldHalved,
  FaGoogle,
  FaFacebook,
} from 'react-icons/fa6';
import AppImage from '../../../components/AppImage/AppImage';
import ReviewAuthor from '@assets/register/review-author.webp';
import RegisterForm from '../../../components/Register/RegisterForm';

function RegisterPage() {
  return (
    <main className="py-10">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 justify-center items-center  gap-12 p-4">
        <div className="hidden lg:flex flex-col justify-stretch">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h1>
          <p className="text-xl mt-2 mb-4">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>
          <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
            <li>
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaStar />
              </div>
              <div className="content">
                <h2 className="text-lg font-semibold">Premium Quality</h2>
                <p className="text-gray-600">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </li>
            <li>
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaTruckFast />
              </div>
              <div className="content">
                <h2 className="text-lg font-semibold">Fast Delivery</h2>
                <p className="text-gray-600">
                  Same-day delivery available in most areas
                </p>
              </div>
            </li>
            <li>
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center">
                <FaShieldHalved />
              </div>
              <div className="content">
                <h2 className="text-lg font-semibold">Secure Shopping</h2>
                <p className="text-gray-600">
                  Your data and payments are completely secure
                </p>
              </div>
            </li>
          </ul>
          <div className="review bg-white shadow-sm p-4 rounded-md">
            <div className="author flex items-center gap-4 mb-4">
              <AppImage
                alt="review-author"
                loading="lazy"
                width={512}
                height={512}
                src={ReviewAuthor}
                className="size-12 rounded-full"
                style={{ color: 'transparent' }}
              />
              <div>
                <h3>Sarah Johnson</h3>
                <div className="rating flex *:text-yellow-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <blockquote>
              <p className="italic text-gray-600">
                &quot;FreshCart has transformed my shopping experience. The
                quality of the products is outstanding, and the delivery is
                always on time. Highly recommend!&quot;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg  px-6 py-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center">Start your fresh journey with us today</p>
          <div className="register-options flex gap-2 *:grow my-10">
            <button
              type="button"
              disabled
              className="btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-md duration-300 transition-all ease-in-out disabled:hover:bg-transparent"
              aria-label="Sign up with Google"
            >
              <FaGoogle className="me-2 text-red-600" />
              <span>Google</span>
            </button>
            <button
              type="button"
              disabled
              className="btn bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer py-2 px-4 rounded-md duration-300 transition-all ease-in-out disabled:hover:bg-transparent"
              aria-label="Sign up with Facebook"
            >
              <FaFacebook className="me-2 text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>
          <div
            className="divider relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4"
            aria-hidden="true"
          >
            <span className="sr-only">or</span>
          </div>
          <RegisterForm />
          <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
            Already have an account?{' '}
            <Link
              className="text-green-600 hover:underline font-medium"
              href="/login"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
