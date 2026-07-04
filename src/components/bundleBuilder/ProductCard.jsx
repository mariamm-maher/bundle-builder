export default function Stepper({ size = 'md', value = 0, onChange }) {
  const handleDecrement = () => onChange(Math.max(0, value - 1));
  const handleIncrement = () => onChange(value + 1);

  // Size configurations for compact design
  const sizeConfig = {
    sm: {
      button: 'w-6 h-6 text-xs',
      input: 'w-8 text-xs',
      gap: 'gap-1'
    },
    md: {
      button: 'w-7 h-7 text-sm',
      input: 'w-10 text-sm',
      gap: 'gap-1.5'
    },
    lg: {
      button: 'w-8 h-8 text-base',
      input: 'w-12 text-base',
      gap: 'gap-2'
    }
  };

  const config = sizeConfig[size] || sizeConfig.md;

  return (
    <div className={`flex items-center ${config.gap}`}>
      {/* Minus Button */}
      <button
        type="button"
        onClick={handleDecrement}
        className={`${config.button} flex items-center justify-center border border-[#d0d5e0] bg-white text-[#1c1d29] font-bold rounded hover:border-[#6735e8] hover:bg-[#f5f3ff] transition-colors cursor-pointer`}
        aria-label="Decrease quantity"
      >
        −
      </button>

      {/* Quantity Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const num = parseInt(e.target.value) || 0;
          onChange(Math.max(0, num));
        }}
        className={`${config.input} flex items-center justify-center border border-[#d0d5e0] bg-white text-[#1c1d29] font-bold rounded text-center focus:outline-none focus:border-[#6735e8] focus:ring-1 focus:ring-[#6735e8]`}
        aria-label="Quantity"
      />

      {/* Plus Button */}
      <button
        type="button"
        onClick={handleIncrement}
        className={`${config.button} flex items-center justify-center border border-[#d0d5e0] bg-white text-[#1c1d29] font-bold rounded hover:border-[#6735e8] hover:bg-[#f5f3ff] transition-colors cursor-pointer`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}