export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="">
      <h1>Hello World!</h1>
    </div>
  );
}
