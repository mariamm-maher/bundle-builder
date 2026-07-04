import { Minus, Plus } from 'lucide-react';

export default function Stepper({ value, onChange }) {
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