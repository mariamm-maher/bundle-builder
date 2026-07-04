import ReviewItem from './ReviewItem';

export default function ReviewCategory({ category, lines, setQty }) {
  if (!lines.length) return null;

  return (
    <section className="border-b border-[#d8e0ef] pb-[7px]">
      <h3 className="mb-1 mt-0 text-[9px] font-black uppercase leading-none tracking-normal text-[#b8c1d1]">{category}</h3>
      {lines.map((line) => (
        <ReviewItem key={line.key} line={line} setQty={setQty} />
      ))}
    </section>
  );
}
