'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      {/* Customer Name */}
      <div>
        <label htmlFor="customer">Choose customer</label>
        <UserCircleIcon />
        <select
          id="customer"
          name="customerId"
          defaultValue=""
          aria-describedby="customer-error"
        >
          <option value="" disabled>
            Select a customer
          </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.customerId?.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Invoice Amount */}
      <div>
        <label htmlFor="amount">Choose an amount</label>
        <CurrencyDollarIcon />
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          placeholder="Enter USD amount"
          aria-describedby="amount-error"
        />

        <div id="amount-error" aria-live="polite" aria-atomic="true">
          {state.errors?.amount?.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </div>

      {/* Invoice Status */}
      <fieldset>
        <legend>Set the invoice status</legend>

        <input id="pending" name="status" type="radio" value="pending" />
        <label htmlFor="pending">
          Pending <ClockIcon />
        </label>

        <input id="paid" name="status" type="radio" value="paid" />
        <label htmlFor="paid">
          Paid <CheckIcon />
        </label>

        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.errors?.status?.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" aria-atomic="true">
        {state.message ? <p>{state.message}</p> : null}
      </div>

      <div>
        <Link href="/dashboard/invoices">Cancel</Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}