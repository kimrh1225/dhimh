import Link from "next/link";

type Props = {
  title: string;
  description: string;
  action?: { href: string; label: string };
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-white p-8" aria-label={title}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-3 leading-7 text-slate-700">{description}</p>
      {action && <Link href={action.href} className="mt-5 inline-block rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">{action.label}</Link>}
    </section>
  );
}
