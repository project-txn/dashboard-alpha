import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <section>
      <h2>Latest Invoices</h2>
      
      <ul>
        {latestInvoices.map((invoice) => (
          <li key={invoice.id}>
            <Image
              src={invoice.image_url}
              alt={`${invoice.name}'s profile picture`}
              width={32}
              height={32}
            />
            <div>
              <p>{invoice.name}</p>
              <p>{invoice.email}</p>
            </div>
            <p>{invoice.amount}</p>
          </li>
        ))}
      </ul>

      <footer>
        <ArrowPathIcon />
        <p>Updated just now</p>
      </footer>
    </section>
  );
}