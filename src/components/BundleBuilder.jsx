import { useState } from 'react';
import { steps } from '../utils/builder';
import StepPanel from './StepPanel';
import { useBundle } from '../context/BundleContext';

export default function BundleBuilder() {
  const [openStep, setOpenStep] = useState('cameras');
  const { catalog, selectedCountForStep, activeVariants, setActiveVariants, onVariantChange, quantities, setQty, getActiveKey, icons } = useBundle();

  return (
    <section aria-label="Bundle builder" className="min-w-0">
      <h1 className="hidden text-center text-[38px] font-black leading-none text-[#171820] max-[640px]:mx-[18px] max-[640px]:mt-[16px] max-[640px]:mb-[36px] max-[640px]:block">
        Let's get started!
      </h1>
      <div className="grid gap-0 max-[640px]:block max-[640px]:border-b max-[640px]:border-[#8e9299]">
        {steps.map((step, index) => (
          <StepPanel
            key={step.id}
            step={step}
            isOpen={openStep === step.id}
            selectedCount={selectedCountForStep(step.id)}
            isHighlighted={index === 2}
            onToggle={() => setOpenStep(openStep === step.id ? '' : step.id)}
            onNext={() => setOpenStep(steps[Math.min(index + 1, steps.length - 1)].id)}
            catalog={catalog}
            activeVariants={activeVariants}
            setActiveVariants={setActiveVariants}
            onVariantChange={onVariantChange}
            quantities={quantities}
            setQty={setQty}
            getActiveKey={getActiveKey}
            icons={icons}
          />
        ))}
      </div>
    </section>
  );
}
