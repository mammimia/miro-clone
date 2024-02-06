'use client';

import { useOrganizationList } from '@clerk/nextjs';
import { SidebarListItem } from './sidebar-list-item';

export const SidebarList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  });

  if (!userMemberships?.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((membership) => (
        <SidebarListItem
          key={membership.organization.id}
          id={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
};
