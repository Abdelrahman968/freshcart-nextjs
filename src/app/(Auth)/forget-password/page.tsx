import ForgotPasswordForm from './components/Forgotpasswordform';
import ForgotPassImage from './components/ForgotPassImage';

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <section className="container py-16 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <ForgotPassImage />
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}
