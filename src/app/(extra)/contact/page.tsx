import {
  FaClock,
  FaFacebookF,
  FaHeadset,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitter,
} from 'react-icons/fa';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { MdEmail } from 'react-icons/md';
import { FaCircleQuestion, FaLocationDot } from 'react-icons/fa6';
import ContactForm from '../../../components/ContactForm/ContactForm';

function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subTitle="We'd love to hear from you. Get in touch with our team."
        subTitle2="Contact Us"
        icon={<FaHeadset size={40} />}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Mon-Fri from 8am to 6pm
                  </p>
                  <a
                    href="tel:+18001234567"
                    className="text-green-600 font-medium hover:underline"
                  >
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <MdEmail className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    We&apos;ll respond within 24 hours
                  </p>
                  <a
                    href="mailto:support@freshcart.com"
                    className="text-green-600 font-medium hover:underline"
                  >
                    support@freshcart.com
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaLocationDot className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                  <p className="text-gray-500 text-sm">
                    123 Commerce Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaClock className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Business Hours
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Monday - Friday: 8am - 6pm
                    <br />
                    Saturday: 9am - 4pm
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-colors group duration-300 ease-in-out"
                >
                  <FaFacebookF className="text-green-600 group-hover:text-white text-lg" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-colors group duration-300 ease-in-out"
                >
                  <FaTwitter className="text-green-600 group-hover:text-white text-lg" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-colors group duration-300 ease-in-out"
                >
                  <FaInstagram className="text-green-600 group-hover:text-white text-lg" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-green-600 hover:text-white transition-colors group duration-300 ease-in-out"
                >
                  <FaLinkedinIn className="text-green-600 group-hover:text-white text-lg" />
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <FaHeadset size={24} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Fill out the form and we&apos;ll get back to you
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
            <div className="mt-6 bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaCircleQuestion className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Looking for quick answers?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Check out our Help Center for frequently asked questions
                    about orders, shipping, returns, and more.
                  </p>
                  <a
                    className="text-green-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                    href="/help"
                  >
                    Visit Help Center →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
