import ReviewCategory from './ReviewCategory';
import Summary from './Summary';
import { useBundle } from '../context/BundleContext';

export default function ReviewPanel() {
  const { groupedReviewItems, totals, setQty, saveSystem, saved, checkedOut, setCheckedOut } = useBundle();

  return (
    <aside className="overflow-hidden rounded-none bg-[#edf4ff] px-[52px] py-[34px] max-[980px]:px-6 max-[980px]:py-6 max-[640px]:px-4 max-[640px]:py-6" aria-label="Your security system">
      <div className="block p-0 text-[#242535]">
        <div>
          <h2 className="m-0 text-[24px] font-black leading-[1.05]">Your security system</h2>
          <p className="mb-[22px] mt-[7px] w-[420px] max-w-full text-[11px] leading-[1.25] text-[#5d6474]">Review your personalized protection system designed to keep what matters most safe.</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_430px] items-start gap-[46px] max-[980px]:grid-cols-1 max-[980px]:gap-6">
        <div className="grid gap-2">
          {groupedReviewItems.map((group) => (
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