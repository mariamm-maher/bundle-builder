import { Minus, Plus } from 'lucide-react';

export default function Stepper({ value, onChange, size = 'sm' }) {
  if (size === 'md') {
    return (
      <div className="flex items-center gap-3" aria-label="Quantity selector">
        <button
          aria-label="Decrease quantity"
          className="grid h-7 w-7 place-items-center rounded-[6px] border border-[#d7dbe4] bg-white p-0 text-[#33394a] disabled:cursor-not-allowed disabled:text-[#c8ceda]"
          disabled={value === 0}
          onClick={() => onChange(value - 1)}
        >
          <Minus size={15} />
        </button>
        <span className="min-w-[14px] text-center text-[15px] font-black text-[#1c1d29]">{value}</span>
        <button
          aria-label="Increase quantity"
          className="grid h-7 w-7 place-items-center rounded-[6px] border border-[#d7dbe4] bg-white p-0 text-[#33394a]"
          onClick={() => onChange(value + 1)}
        >
          <Plus size={15} />
        </button>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div
        className="grid h-[34px] w-[96px] grid-cols-[32px_1fr_32px] items-center overflow-hidden rounded-[7px] border border-[#d7dbe4] bg-white"
        aria-label="Quantity selector"
      >
        <button
          aria-label="Decrease quantity"
          className="grid h-full place-items-center border-0 bg-transparent p-0 text-[#1c1d29] disabled:cursor-not-allowed disabled:text-[#c8ceda]"
          disabled={value === 0}
          onClick={() => onChange(value - 1)}
        >
          <Minus size={16} />
        </button>
        <span className="text-center text-[15px] font-black text-[#1c1d29]">{value}</span>
        <button
          aria-label="Increase quantity"
          className="grid h-full place-items-center border-0 bg-transparent p-0 text-[#1c1d29]"
          onClick={() => onChange(value + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
    );
  }

  // Default "sm" — used in the review panel rows.
  return (
    <div className="grid h-[18px] w-[58px] grid-cols-[18px_1fr_18px] items-center overflow-hidden" aria-label="Quantity selector">
      <button
        aria-label="Decrease quantity"
        className="grid h-[15px] w-[15px] place-items-center rounded-[4px] border border-[#d5dae7] bg-white p-0 text-[#5a25df] disabled:cursor-not-allowed disabled:text-[#c8ceda]"
        disabled={value === 0}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={16} />
      </button>
      <span className="text-center text-[10px] font-black text-[#4a5060]">{value}</span>
      <button
        aria-label="Increase quantity"
        className="grid h-[15px] w-[15px] place-items-center rounded-[4px] border border-[#d5dae7] bg-white p-0 text-[#5a25df]"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}