import Stepper from '../Stepper';
import VariantSelector from './VariantSelector';
import { cx, currency, lineKey } from '../../utils/builder';
import { useBundle } from '../../context/BundleContext';

export default function ProductCard({ product }) {
  const { activeVariants, setActiveVariants, onVariantChange, quantities, setQty, getActiveKey } = useBundle();
  const activeVariant = product.variants?.find((variant) => variant.id === activeVariants[product.id]) || product.variants?.[0];
  const activeKey = getActiveKey(product);
  const qty = quantities[activeKey] || 0;
  const isSelected = product.variants?.length
    ? product.variants.some((variant) => (quantities[lineKey(product, variant.id)] || 0) > 0)
    : qty > 0;

  function handleVariantSelect(variantId) {
    onVariantChange();
    setActiveVariants((current) => ({ ...current, [product.id]: variantId }));
  }

  const learnMoreLink = product.learnMore && (
    <button type="button" className="inline border-0 bg-transparent p-0 font-bold text-[#5a25df] underline">
      Learn More
    </button>
  );

  return (
    <article
      className={cx(
        'relative flex flex-col overflow-hidden rounded-[10px] border border-[#e3e7ef] bg-white min-h-[248px] max-[980px]:min-h-[280px] max-[640px]:min-h-[250px]',
        'min-[641px]:max-[980px]:min-h-0',
        isSelected && 'border-[#6735e8] shadow-[0_0_0_1px_#6735e8]',
      )}
    >
      {product.badge && (
        <span className="absolute left-[12px] top-3 z-[2] rounded-full bg-[#6b4cff] px-[10px] py-[4px] text-[11px] font-black text-white">
          {product.badge}
        </span>
      )}

      {/* Desktop / mobile layout: image on top, content below, footer at bottom */}
      <div className="flex flex-1 flex-col min-[641px]:max-[980px]:hidden">
        <div className="h-[130px] overflow-hidden bg-white p-4 pb-1">
          <img src={product.image} alt="" className="block h-full w-full object-contain" />
        </div>
        <div className="flex flex-1 flex-col gap-[6px] px-[16px]">
          <h3 className="m-0 text-[19px] font-black leading-[1.1] text-[#1c1d29]">{product.title}</h3>
          <p className="m-0 text-[13px] leading-[1.35] text-[#5f6b7a]">
            {product.description} {learnMoreLink}
          </p>
          <VariantSelector product={product} activeVariant={activeVariant} onVariantSelect={handleVariantSelect} />
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-2 px-[16px] pb-[16px] pt-3">
          <Stepper size="lg" value={qty} onChange={(value) => setQty(activeKey, value)} />
          <div className="flex min-w-0 items-baseline justify-end gap-2">
            <span className="text-[14px] font-semibold text-[#e0532c] line-through">{currency.format(product.compareAt)}</span>
            <strong className="text-[16px] font-black leading-none text-[#1c1d29]">
              {currency.format(product.price)}{product.recurring || ''}
            </strong>
          </div>
        </div>
      </div>

      {/* Tablet layout: small image + content side by side, stepper/price below */}
      <div className="hidden min-[641px]:max-[980px]:flex min-[641px]:max-[980px]:flex-col min-[641px]:max-[980px]:gap-2 min-[641px]:max-[980px]:p-3">
        <div className="flex items-start gap-3">
          <div className="h-[64px] w-[64px] flex-none overflow-hidden bg-white">
            <img src={product.image} alt="" className="block h-full w-full object-contain" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
            <h3 className="m-0 text-[15px] font-black leading-[1.15] text-[#1c1d29]">{product.title}</h3>
            <p className="m-0 text-[12px] leading-[1.3] text-[#5f6b7a]">
              {product.description} {learnMoreLink}
            </p>
          </div>
        </div>

        <VariantSelector product={product} activeVariant={activeVariant} onVariantSelect={handleVariantSelect} />

        <div className="mt-1 flex items-center justify-between">
          <Stepper size="md" value={qty} onChange={(value) => setQty(activeKey, value)} />
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="text-[13px] font-semibold text-[#e0532c] line-through">{currency.format(product.compareAt)}</span>
            <strong className="text-[15px] font-black leading-none text-[#1c1d29]">
              {currency.format(product.price)}{product.recurring || ''}
            </strong>
          </div>
        </div>
      </div>
    </article>
  );
}