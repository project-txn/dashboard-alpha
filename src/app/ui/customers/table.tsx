import Image from 'next/image';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <main>
      <h1>Customers</h1>
      <Search placeholder="Search customers..." />

      {/* Mobile view */}
      <section>
        {customers?.map((customer) => (
          <article key={customer.id}>
            <header>
              <Image
                src={customer.image_url}
                alt={`${customer.name}'s profile picture`}
                width={28}
                height={28}
              />
              <p>{customer.name}</p>
              <p>{customer.email}</p>
            </header>

            <section>
              <div>
                <p>Pending</p>
                <p>{customer.total_pending}</p>
              </div>
              <div>
                <p>Paid</p>
                <p>{customer.total_paid}</p>
              </div>
            </section>

            <footer>
              <p>{customer.total_invoices} invoices</p>
            </footer>
          </article>
        ))}
      </section>

      {/* Desktop view */}
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Total Invoices</th>
            <th scope="col">Total Pending</th>
            <th scope="col">Total Paid</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr key={customer.id}>
              <td>
                <Image
                  src={customer.image_url}
                  alt={`${customer.name}'s profile picture`}
                  width={28}
                  height={28}
                />
                <span>{customer.name}</span>
              </td>
              <td>{customer.email}</td>
              <td>{customer.total_invoices}</td>
              <td>{customer.total_pending}</td>
              <td>{customer.total_paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}