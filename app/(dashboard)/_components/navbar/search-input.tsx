'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useDebounceValue('', 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search
        }
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [router, search]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
        onChange={handleChange}
      />
    </div>
  );
};
