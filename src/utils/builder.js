import { ChevronDown, ChevronUp, Grip, Minus, Plus, Radar, Save, Shield, ShieldCheck, Webcam } from 'lucide-react';

export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const steps = [
  { id: 'cameras', order: 1, title: 'Choose your cameras', icon: Webcam },
  { id: 'plan', order: 2, title: 'Choose your plan', icon: Shield },
  { id: 'sensors', order: 3, title: 'Choose your sensors', icon: Radar },
  { id: 'protection', order: 4, title: 'Add extra protection', icon: Grip },
];

export const icons = {
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Save,
  ShieldCheck,
};

export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function lineKey(product, variantId) {
  return variantId ? `${product.id}:${variantId}` : product.id;
}