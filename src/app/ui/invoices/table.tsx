import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <section>
      {/* Mobile view */}
      <section>
        {invoices?.map((invoice) => (
          <article key={invoice.id}>
            <header>
              <Image
                src={invoice.image_url}
                width={28}
                height={28}
                alt={`${invoice.name}'s profile picture`}
              />
              <p>{invoice.name}</p>
              <p>{invoice.email}</p>
              <InvoiceStatus status={invoice.status} />
            </header>

            <footer>
              <p>{formatCurrency(invoice.amount)}</p>
              <p>{formatDateToLocal(invoice.date)}</p>
              <div>
                <UpdateInvoice id={invoice.id} />
                <DeleteInvoice id={invoice.id} />
              </div>
            </footer>
          </article>
        ))}
      </section>

      {/* Desktop view */}
      <table>
        <thead>
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">Email</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">
              <span>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((invoice) => (
            <tr key={invoice.id}>
              <td>
                <Image
                  src={invoice.image_url}
                  width={28}
                  height={28}
                  alt={`${invoice.name}'s profile picture`}
                />
                <span>{invoice.name}</span>
              </td>
              <td>{invoice.email}</td>
              <td>{formatCurrency(invoice.amount)}</td>
              <td>{formatDateToLocal(invoice.date)}</td>
              <td>
                <InvoiceStatus status={invoice.status} />
              </td>
              <td>
                <div>
                  <UpdateInvoice id={invoice.id} />
                  <DeleteInvoice id={invoice.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}