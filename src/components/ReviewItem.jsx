import Stepper from './Stepper';
import { currency } from '../utils/builder';

export default function ReviewItem({ line, setQty }) {
  return (
    <div className="grid min-h-[38px] grid-cols-[32px_minmax(150px,1fr)_62px_56px_58px] items-center gap-2 max-[640px]:grid-cols-[32px_1fr_62px]">
      <img src={line.product.image} alt="" className="block h-8 w-8 rounded-[3px] bg-white object-contain" />
      <div className="min-w-0">
        <strong className="block truncate text-[12px] leading-[1.1] text-[#252638]">{line.product.title}{line.variant ? ` ${line.variant.label}` : ''}</strong>
      </div>
      <div className="justify-self-end max-[640px]:col-start-2 max-[640px]:col-end-4">
        <Stepper value={line.qty} onChange={(value) => setQty(line.key, value)} />
      </div>
      <span className="justify-self-end text-[10px] text-[#8f95a5] line-through max-[640px]:col-start-2 max-[640px]:col-end-4">
        {line.product.compareAt ? currency.format(line.product.compareAt * line.qty) : ''}
      </span>
      <strong className="justify-self-end text-[10px] text-[#5a25df] max-[640px]:col-start-2 max-[640px]:col-end-4">
        {line.product.price === 0 ? 'FREE' : `${currency.format(line.product.price * line.qty)}${line.product.recurring || ''}`}
      </strong>
    </div>
  );
}
