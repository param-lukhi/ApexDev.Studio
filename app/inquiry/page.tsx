import { redirect } from 'next/navigation';

export default function InquiryRedirect({ searchParams }: { searchParams: Record<string, string> }) {
  const query = new URLSearchParams(searchParams).toString();
  redirect(query ? `/start?${query}` : '/start');
}
