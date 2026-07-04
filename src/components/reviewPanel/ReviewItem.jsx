import Stepper from '../Stepper';
import { currency } from '../../utils/builder';

export default function ReviewItem({ line, setQty }) {
  const isPlanOrShipping = line.product.category === 'Plan' || line.product.category === 'Shipping';

  return (
    <div 
      className={cx(
        
        "grid items-center gap-4 grid-cols-[36px_1fr_auto_70px_60px]",
      
        "max-[640px]:grid-cols-[36px_1fr_auto_80px] max-[640px]:gap-x-2"
      )}
    >
      {/* 1. Thumbnail Product Image */}
      <div className="h-9 w-9 overflow-hidden rounded-[6px] bg-white p-0.5 border border-black/5 flex items-center justify-center">
        <img src={line.product.image} alt="" className="h-full w-full object-contain" />
      </div>

      {/* 2. Product Name Label */}
      <div className="min-w-0">
        <span className="block truncate text-[13px] font-bold text-[#1c1d29]">
          {line.product.title}{line.variant ? ` ${line.variant.label}` : ''}
        </span>
      </div>

      <div className="flex justify-end min-w-[70px]">
        {!isPlanOrShipping && (
          <Stepper value={line.qty} onChange={(value) => setQty(line.key, value)} size="sm" />
        )}
      </div>

      {isPlanOrShipping ? (
   
        <div className="col-span-2 flex flex-col items-end justify-self-end leading-none max-[640px]:col-span-1">
          {line.product.compareAt && (
            <span className="text-[11px] text-[#8f95a5] line-through mb-[2px]">
              {currency.format(line.product.compareAt * line.qty)}{line.product.recurring || ''}
            </span>
          )}
          <strong className="text-[12px] font-black text-[#5a25df]">
            {line.product.price === 0 ? 'FREE' : `${currency.format(line.product.price * line.qty)}${line.product.recurring || ''}`}
          </strong>
        </div>
      ) : (
        <>
  
          <div className="justify-self-end text-right max-[640px]:col-start-4 max-[640px]:row-start-1 max-[640px]:self-end leading-none">
            <span className="text-[11px] text-[#8f95a5] line-through">
              {line.product.compareAt ? currency.format(line.product.compareAt * line.qty) : ''}
            </span>
          </div>
          

          <div className="justify-self-end text-right max-[640px]:col-start-4 max-[640px]:row-start-1 max-[640px]:self-end max-[640px]:pt-[14px] leading-none">
            <strong className="text-[12px] font-black text-[#5a25df]">
              {line.product.price === 0 ? 'FREE' : currency.format(line.product.price * line.qty)}
            </strong>
          </div>
        </>
      )}
    </div>
  );
}