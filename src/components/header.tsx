import Link from 'next/link';

import { AccountButton } from './account-button';
import { Button } from './ui/button';

export const Header: React.FC = () => {
  return (
    <header className="flex w-full justify-between gap-5 p-5">
      <div className="flex gap-5">
        <Button variant="link" size="sm" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="link" size="sm" asChild>
          <Link href="/me">Me</Link>
        </Button>
        <Button variant="link" size="sm" asChild>
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
      <div className="flex justify-end">
        <AccountButton />
      </div>
    </header>
  );
};
