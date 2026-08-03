import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <aside>
      <Link href="/">
        <AcmeLogo />
      </Link>
      
      <NavLinks />

      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button type="submit">
          <PowerIcon />
          <span>Sign Out</span>
        </button>
      </form>
    </aside>
  );
}