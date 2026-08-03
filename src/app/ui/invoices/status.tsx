import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span>
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon />
        </>
      ) : null}
    </span>
  );
}