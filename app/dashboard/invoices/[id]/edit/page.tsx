import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { notFound } from 'next/navigation';

type GenerateMetaDataProps = {
  params: { id: string };
};
export const generateMetadata = async ({
  params: { id },
}: GenerateMetaDataProps) => {
  const invoice = await fetchInvoiceById(id);
  // Note: In the real world you wouldn't use the invoice id and would handle what happens if the invoice is not found
  return { title: `Edit invoice ${invoice.customer_id}` };
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const [customers, invoice] = await Promise.all([
    fetchCustomers(),
    fetchInvoiceById(id),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
