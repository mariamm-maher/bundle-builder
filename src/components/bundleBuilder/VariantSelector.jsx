import { cx } from '../../utils/builder';

export default function VariantSelector({ product, activeVariant, onVariantSelect }) {
  if (!product.variants?.length) return null;

  return (
    <div className="mt-1 flex flex-wrap gap-[8px]" aria-label={`${product.title} colors`}>
      {product.variants.map((variant) => (
        <button
          key={variant.id}
          className={cx(
            'inline-flex h-[34px] items-center gap-[6px] rounded-[7px] border border-[#d7dbe4] bg-white px-[10px] text-[13px] font-bold text-[#1c1d29]',
            activeVariant?.id === variant.id && 'border-[#00a78a] bg-[#eafbf6]',
          )}
          onClick={() => onVariantSelect(variant.id)}
        >
          <span className="h-4 w-4 rounded-full border border-black/15" style={{ background: variant.swatch }} />
          {variant.label}
        </button>
      ))}
    </div>
  );
}