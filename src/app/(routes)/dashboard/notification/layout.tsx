export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="">
      <main className="my-20 ">{children}</main>
    </section>
  );
}
