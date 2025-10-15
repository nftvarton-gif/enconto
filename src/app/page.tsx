// This is the root page, which is not internationalized.
// It will redirect to the default locale.
// The actual home page is in src/app/[locale]/page.tsx
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en');
}
