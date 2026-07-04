import {
  Minus,
  Plus,
  Save,
  ShieldCheck,
} from 'lucide-react';

import WebcamAlt from '../assets/icons/webcam-alt-1-svgrepo-com.svg';
import ShieldMinimalistic from '../assets/icons/shield-minimalistic-svgrepo-com.svg';
import SensorIcon from '../assets/icons/sensor-svgrepo-com.svg';
import KeypadIcon from '../assets/icons/keypad-svgrepo-com.svg';
import ChevronDown from '../assets/icons/down.svg';
import ChevronUp from '../assets/icons/up.svg';
export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const steps = [
  {
    id: 'cameras',
    order: 1,
    title: 'Choose your cameras',
    icon: WebcamAlt,
  },
  {
    id: 'plan',
    order: 2,
    title: 'Choose your plan',
    icon: ShieldMinimalistic,
  },
  {
    id: 'sensors',
    order: 3,
    title: 'Choose your sensors',
    icon: SensorIcon,
  },
  {
    id: 'protection',
    order: 4,
    title: 'Add extra protection',
    icon: KeypadIcon,
  },
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