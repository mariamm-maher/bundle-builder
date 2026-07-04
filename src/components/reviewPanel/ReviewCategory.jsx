import ReviewItem from './ReviewItem';

export default function ReviewCategory({ category, lines, setQty }) {
  if (!lines.length) return null;

  return (
    <section className="border-b border-[#d8e0ef] pb-[12px] last:border-b-0">
      <h3 className="mb-2 mt-0 text-[10px] font-black uppercase tracking-[1px] text-[#b8c1d1]">
        {category}
      </h3>
      <div className="flex flex-col gap-2.5">
        {lines.map((line) => (
          <ReviewItem key={line.key} line={line} setQty={setQty} />
        ))}
      </div>
    </section>
  );
}