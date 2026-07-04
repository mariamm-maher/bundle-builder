import { currency, icons } from '../utils/builder';
import badgeImage from '../assets/images/BADGE.png';

export default function Summary({ totals, checkedOut, onCheckout, onSave, saved }) {
  return (
    <div className="relative grid grid-cols-[112px_1fr] items-start gap-x-5 gap-y-2 pt-1 max-[980px]:mx-auto max-[980px]:max-w-[430px] max-[640px]:grid-cols-1">
      <img
        src={badgeImage}
        alt="Wyze satisfaction guarantee badge"
        className="h-[86px] w-[86px] justify-self-center rotate-[-12deg] object-contain"
      />
      <div className="pt-4">
        <strong className="text-[14px]">30-day hassle-free returns</strong>
        <p className="mt-[14px] mb-0 text-[12px] leading-[1.35] text-[#4f5668]">If you're not totally in love with the product, we will refund you 100%.</p>
      </div>
      <div className="col-start-2 mt-2 flex items-baseline justify-end max-[640px]:col-start-1">
        <div>
          <span className="text-[#8f95a5] line-through">{currency.format(totals.compare)}</span>
          <strong className="ml-2 inline-block text-[24px] font-black leading-none text-[#5a25df]">{currency.format(totals.subtotal)}</strong>
        </div>
      </div>
      <div className="col-span-full justify-self-center rounded-[4px] bg-[#5a25df] px-3 py-[5px] text-[10px] font-black text-white">as low as {currency.format(Math.ceil(totals.subtotal / 12))}/mo</div>
      <div className="col-span-full justify-self-center text-[10px] font-black text-[#00a78a]">Congrats! You're saving {currency.format(totals.savings)} on your security bundle!</div>
      <button className="col-span-full h-[38px] w-full rounded-[4px] border-0 bg-[#5a25df] text-[12px] font-black text-white" onClick={onCheckout}>Checkout</button>
      {checkedOut && <p className="col-span-full -mt-1 text-center text-[10px] font-black text-[#00a78a]">Your prototype checkout is ready.</p>}
      <button className="col-span-full inline-flex items-center justify-center gap-[5px] justify-self-center text-[10px] font-semibold text-[#6d6f7b] underline" onClick={onSave}><icons.Save size={14} /> Save my system for later</button>
      {saved && <p className="col-span-full -mt-1 text-center text-[10px] font-black text-[#00a78a]">Saved. Your system will restore after reload.</p>}
    </div>
  );
}
