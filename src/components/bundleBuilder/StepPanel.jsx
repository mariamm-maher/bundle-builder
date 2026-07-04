import { cx, steps } from '../../utils/builder';
import ProductCard from './ProductCard';
import StepHeader from './StepHeader';

export default function StepPanel( { step,
  isOpen,
  selectedCount,
  isHighlighted,
  onToggle,
  onNext,
  catalog,
  activeVariants,
  setActiveVariants,
  onVariantChange,
  quantities,
  setQty,
  getActiveKey,
  icons}) {
  const products = catalog.filter((product) => product.stepId === step.id);
  const nextStep = steps.find((s) => s.order === step.order + 1);

  return (
    <article
   className={cx(
    'relative overflow-hidden bg-white',

  // Desktop
  step.order !== 1 && 'border-t border-[#e0e4eb]',

  // Mobile
  'max-[640px]:m-0 max-[640px]:overflow-visible max-[640px]:rounded-none max-[640px]:bg-white',
  step.order !== 1 && 'max-[640px]:border-t max-[640px]:border-[#d1d5db]',

  isOpen && 'rounded-[8px] border-0 bg-[#EDF4FF] px-[14px] pb-[18px]',
  )}
    >
      <div className=" h-[26px] items-center px-[18px] text-[13px] font-extrabold leading-none tracking-[2px] text-[#6F7882] max-[640px]:flex text-[#484848]">
        STEP {step.order} OF 4
      </div>
      <div className=" max-[640px]:block h-[1px] bg-[#e0e4eb]"></div>
      <StepHeader step={step} isOpen={isOpen} selectedCount={selectedCount} onToggle={onToggle} icons={icons} />

      {isOpen && (
        <div className="p-0 max-[640px]:block max-[640px]:border-t max-[640px]:border-[#e0e4eb] max-[640px]:bg-[#EDF4FF] max-[640px]:px-[14px] max-[640px]:pt-3 max-[640px]:pb-[18px]">
          <div className="grid grid-cols-5 gap-3 max-[1024px]:grid-cols-3 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <button className="mx-auto mt-[14px] block h-[28px] w-[238px] rounded-[4px] border-2 border-[#8d72ff] bg-[#e0d9ff] text-[12px] font-black text-[#5a25df]" onClick={onNext}>
            {nextStep ? `Next: ${nextStep.title}` : 'Review your system'}
          </button>
        </div>
      )}
    </article>
  );
}