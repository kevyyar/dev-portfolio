export default function ProjectsLoading() {
  return (
    <section className="my-20">
      <div className="grid gap-8 place-items-center md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full sm:w-[calc(80%-8px)] md:w-[calc(100%-10px)] lg:w-[calc(90%-12px)] aspect-square relative rounded-xl overflow-hidden border border-carbon animate-pulse bg-gray-200"
          />
        ))}
      </div>
    </section>
  );
}
