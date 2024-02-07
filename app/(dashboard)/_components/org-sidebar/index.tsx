'use client';

import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600']
});

export const OrgSidebar = () => {
  return (
    <div className="hidden w-[206px] flex-col space-y-6 pl-5 pt-5 lg:flex">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.svg" alt="Logo" height={60} width={60} />
          <span className={cn('text-2xl font-semibold', font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              justifyContent: 'space-between',
              backgroundColor: 'white'
            }
          }
        }}
      />
    </div>
  );
};
