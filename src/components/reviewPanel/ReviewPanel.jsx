import { useMemo } from 'react';
import ReviewCategory from './ReviewCategory';
import Summary from './Summary';
import { useBundle } from '../../context/BundleContext';

export default function ReviewPanel() {
  const { groupedReviewItems, totals, setQty, saveSystem, saved, checkedOut, setCheckedOut } = useBundle();

  // "Plan" and "Shipping" are two categories in the data, but the design
  // shows them under a single "PLAN" header. Merge them here for display
  // only — the underlying grouping/data is untouched.
  const displayGroups = useMemo(() => {
    const order = [];
    const map = new Map();

    groupedReviewItems.forEach((group) => {
      const label =
        group.category === 'Plan' || group.category === 'Shipping'
          ? 'Plan'
          : group.category;

      if (!map.has(label)) {
        map.set(label, []);
        order.push(label);
      }
      map.get(label).push(...group.lines);
    });

    return order.map((label) => ({ category: label, lines: map.get(label) }));
  }, [groupedReviewItems]);

  return (
    <aside className="overflow-hidden rounded-none bg-[#edf4ff] px-[52px] py-[34px] max-[980px]:px-6 max-[980px]:py-6 max-[640px]:px-4 max-[640px]:py-6" aria-label="Your security system">
      <div className="block p-0 text-[#242535]">
        <p className="m-0 mb-[6px] text-[10px] font-black uppercase leading-none tracking-normal text-[#b8c1d1]">Review</p>
        <div>
          <h2 className="m-0 text-[24px] font-black leading-[1.05]">Your security system</h2>
          <p className="mb-[22px] mt-[7px] w-[420px] max-w-full text-[11px] leading-[1.25] text-[#5d6474]">Review your personalized protection system designed to keep what matters most safe.</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_430px] items-start gap-[46px] max-[980px]:grid-cols-1 max-[980px]:gap-6">
        <div className="grid gap-2">
          {displayGroups.map((group) => (
            <ReviewCategory key={group.category} category={group.category} lines={group.lines} setQty={setQty} />
          ))}
        </div>

        <Summary
          totals={totals}
          checkedOut={checkedOut}
          onCheckout={() => setCheckedOut(true)}
          onSave={saveSystem}
          saved={saved}
        />
      </div>
    </aside>
  );
}