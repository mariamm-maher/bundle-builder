import { cx } from '../utils/builder';

export default function VariantSelector({ product, activeVariant, onVariantSelect }) {
  if (!product.variants?.length) return null;

  return (
    <div className="mt-[5px] flex flex-wrap gap-1" aria-label={`${product.title} colors`}>
      {product.variants.map((variant) => (
        <button
          key={variant.id}
          className={cx(
            'inline-flex min-h-[17px] items-center gap-[3px] rounded-[2px] border border-[#c9cfdb] bg-[#f8fbff] px-[5px] py-[2px] text-[8px] font-extrabold text-[#2b3041]',
            activeVariant?.id === variant.id && 'border-[#6f42ed] bg-[#f0ebff]',
          )}
          onClick={() => onVariantSelect(variant.id)}
        >
          <span className="h-2 w-2 rounded-full border border-black/20" style={{ background: variant.swatch }} />
          {variant.label}
        </button>
      ))}
    </div>
  );
}
