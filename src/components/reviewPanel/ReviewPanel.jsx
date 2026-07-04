import { useMemo } from 'react';
import ReviewCategory from './ReviewCategory';
import Summary from './Summary';
import { useBundle } from '../../context/BundleContext';

export default function ReviewPanel() {
  const {
    groupedReviewItems,
    totals,
    setQty,
    saveSystem,
    saved,
    checkedOut,
    setCheckedOut,
    icons
  } = useBundle();

  const displayGroups = useMemo(() => {
    const order = [];
    const map = new Map();

    groupedReviewItems.forEach((group) => {
      // Map category labels accurately to match design headers
      let label = group.category;
      if (group.category === 'Plan') label = 'HOME MONITORING PLAN';
      if (group.category === 'Shipping') label = 'SHIPPING'; // Kept in same block area if needed, or mapped cleanly

      if (!map.has(label)) {
        map.set(label, []);
        order.push(label);
      }
      map.get(label).push(...group.lines);
    });

    return order.map((label) => ({
      category: label,
      lines: map.get(label),
    }));
  }, [groupedReviewItems]);

  return (
    <aside
      className="overflow-hidden bg-[#edf4ff] px-6 py-8 md:px-[52px] md:py-[40px] w-full"
      aria-label="Your security system"
    >
      <div className="text-[#242535] max-w-[480px]">
        <p className="mb-[6px] text-[10px] font-black uppercase tracking-[1px] text-[#b8c1d1] max-[640px]:block">
          Review
        </p>
        <h2 className="text-[24px] font-black leading-[1.05] tracking-tight text-[#171820]">
          Your security system
        </h2>
        <p className="mt-[7px] mb-[28px] text-[11px] leading-[1.35] text-[#5d6474]">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {/* Main layout container splitting list and metrics */}
      <div className="grid gap-[40px] lg:grid-cols-[1fr_420px] items-start">
        {/* Left Area: Line Items */}
        <div className="flex flex-col gap-5">
          {displayGroups.map((group) => (
            <ReviewCategory
              key={group.category}
              category={group.category}
              lines={group.lines}
              setQty={setQty}
            />
          ))}
        </div>

        {/* Right Area: Checkout Action Card Summary */}
        <div className="w-full">
          <Summary
            totals={totals}
            checkedOut={checkedOut}
            onCheckout={() => setCheckedOut(true)}
            onSave={saveSystem}
            saved={saved}
            icons={icons}
          />
        </div>
      </div>
    </aside>
  );
}