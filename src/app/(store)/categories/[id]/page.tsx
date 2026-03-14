import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Sub Categories Page - ${id} | FreshCart`,
    description: `${id} | FreshCart`,
    keywords: [id],
    authors: [{ name: 'Abdelrahman Ayman' }],
    creator: 'Abdelrahman Ayman',
    publisher: 'Abdelrahman Ayman',
  };
}

async function SubCategoriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-250px)] flex flex-col gap-6 justify-center items-center">
      <h1 className="text-4xl font-bold text-center leading-relaxed">
        Sub Categories Page
        <br />[{id}]
        <br />
        Coming Soon
      </h1>
    </div>
  );
}

export default SubCategoriesPage;
