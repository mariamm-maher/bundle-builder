import Stepper from './Stepper';
import VariantSelector from './VariantSelector';
import { cx, currency, lineKey } from '../utils/builder';
import { useBundle } from '../context/BundleContext';

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

  return (
    <article
      className={cx(
        'relative flex min-h-[248px] flex-col overflow-hidden rounded-[7px] border border-transparent bg-white max-[980px]:min-h-[280px] max-[640px]:min-h-[250px]',
        isSelected && 'border-[#6735e8] shadow-[0_0_0_1px_#6735e8]',
      )}
    >
      {product.badge && <span className="absolute left-[9px] top-3 z-[2] rounded-full bg-[#6b4cff] px-2 py-[3px] text-[9px] font-black text-white">{product.badge}</span>}
      <div className="h-[118px] overflow-hidden bg-white p-4 pb-1">
        <img src={product.image} alt="" className="block h-full w-full object-contain" />
      </div>
      <div className="flex flex-1 flex-col gap-[3px] px-[10px]">
        <h3 className="m-0 text-[14px] font-black leading-[1.08] text-[#252638]">{product.title}</h3>
        <p className="m-0 text-[10px] leading-[1.18] text-[#646b7c]">{product.description}</p>
        {product.learnMore && <button className="w-fit cursor-pointer border-0 bg-transparent p-0 text-[10px] font-black text-[#5a25df] underline">Learn More</button>}

        <VariantSelector product={product} activeVariant={activeVariant} onVariantSelect={handleVariantSelect} />
      </div>

      <div className="grid grid-cols-[auto_1fr] items-center gap-[5px] px-[9px] pb-[10px] pt-2">
        <Stepper value={qty} onChange={(value) => setQty(activeKey, value)} />
        <div className="flex min-w-0 items-baseline justify-end gap-1">
          <span className="text-[10px] text-[#8f95a5] line-through">{currency.format(product.compareAt)}</span>
          <strong className="text-[11px] leading-none text-[#5a25df]">
            {currency.format(product.price)}{product.recurring || ''}
          </strong>
        </div>
      </div>
    </article>
  );
}