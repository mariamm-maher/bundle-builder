import { cx } from '../utils/builder';

export default function StepHeader({ step, isOpen, selectedCount, onToggle, icons }) {
  const Icon = step.icon;

  return (
    <button
      className={cx(
        'grid w-full grid-cols-[28px_1fr_auto] items-center gap-2 border-0 bg-transparent px-0 py-1 text-left cursor-pointer min-h-[58px]',
        'max-[640px]:min-h-[74px] max-[640px]:grid-cols-[36px_minmax(0,1fr)_auto] max-[640px]:gap-0 max-[640px]:border-t max-[640px]:border-[#b9bcc2] max-[640px]:px-[18px]',
        !isOpen && 'min-h-[62px] px-3 py-[6px]',
      )}
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className={cx('grid h-6 w-6 place-items-center text-[#a3acbb]', 'max-[640px]:h-[26px] max-[640px]:w-[26px] max-[640px]:text-[#8e98a5]')}>
        <Icon size={22} className="max-[640px]:h-[25px] max-[640px]:w-[25px]" />
      </span>
      <span className={cx('grid gap-0.5 min-w-0', 'max-[640px]:block')}>
      <span className="block text-[22px] font-black leading-[1.05] text-[#242535] max-[640px]:text-[23px] max-[640px]:font-black max-[640px]:text-[#171820]">
    {step.title}
  </span>
      </span>
      <span className="inline-flex items-center gap-[5px] whitespace-nowrap text-[11px] font-black text-[#5a25df] max-[640px]:gap-[6px] max-[640px]:text-[18px] max-[640px]:font-medium max-[640px]:text-[#612be7]">
        <span className={cx(!isOpen && 'hidden', 'max-[640px]:inline')}>
          {selectedCount} selected
        </span>
        {isOpen ? <icons.ChevronUp size={20} className="max-[640px]:h-[17px] max-[640px]:w-[17px]" /> : <icons.ChevronDown size={20} className="max-[640px]:h-[17px] max-[640px]:w-[17px]" />}
      </span>
    </button>
  );
}
