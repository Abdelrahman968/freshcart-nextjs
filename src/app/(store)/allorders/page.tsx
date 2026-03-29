import { redirect } from 'next/navigation';

function AllOrdersPage() {
  redirect('/orders?payment=card&operation=success');
}

export default AllOrdersPage;
