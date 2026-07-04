import { createContext, useContext, useState, useMemo } from 'react';
import catalogData from '../data/products.json';
import { lineKey, icons } from '../utils/builder';

const catalog = catalogData;
const storageKey = 'wyze-bundle-builder-config-v2';
const storageVersion = 'v3'; // Increment to force localStorage reset

const defaultConfig = {
  activeVariants: {
    'cam-v4': 'white',
    'cam-pan-v3': 'white',
    'cam-floodlight': 'white',
    'battery-cam-pro': 'white',
  },
  quantities: {},
};

function loadInitialConfig() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Clear old saved config if version doesn't match
      if (parsed.version !== storageVersion) {
        localStorage.removeItem(storageKey);
        return defaultConfig;
      }
      return parsed;
    }
    return defaultConfig;
  } catch {
    return defaultConfig;
  }
}

const BundleContext = createContext(null);

export function BundleProvider({ children }) {
  const [activeVariants, setActiveVariants] = useState(() => loadInitialConfig().activeVariants || {});
  const [quantities, setQuantities] = useState(() => loadInitialConfig().quantities || {});
  const [saved, setSaved] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const selectedLines = useMemo(() => {
    return catalog.flatMap((product) => {
      if (product.variants?.length) {
        return product.variants
          .map((variant) => ({
            key: lineKey(product, variant.id),
            product,
            variant,
            qty: quantities[lineKey(product, variant.id)] || 0,
          }))
          .filter((item) => item.qty > 0);
      }
      const qty = quantities[product.id] || 0;
      return qty > 0 ? [{ key: product.id, product, qty }] : [];
    });
  }, [quantities]);

  const totals = useMemo(() => {
    const subtotal = selectedLines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
    const compare = selectedLines.reduce((sum, line) => sum + line.product.compareAt * line.qty, 0);
    return { subtotal, compare, savings: Math.max(compare - subtotal, 0) };
  }, [selectedLines]);

  const groupedReviewItems = useMemo(() => {
    return ['Cameras', 'Sensors', 'Accessories', 'Plan', 'Shipping'].map((category) => ({
      category,
      lines: selectedLines.filter((line) => line.product.category === category),
    }));
  }, [selectedLines]);

  function getActiveKey(product) {
    const variantId = product.variants?.length ? activeVariants[product.id] || product.variants[0].id : undefined;
    return lineKey(product, variantId);
  }

  function setQty(key, value) {
    setCheckedOut(false);
    setSaved(false);
    setQuantities((current) => ({ ...current, [key]: Math.max(0, value) }));
  }

  function saveSystem() {
    localStorage.setItem(storageKey, JSON.stringify({ 
      version: storageVersion,
      activeVariants, 
      quantities 
    }));
    setSaved(true);
  }

  function selectedCountForStep(stepId) {
    return new Set(selectedLines.filter((line) => line.product.stepId === stepId).map((line) => line.product.id)).size;
  }

  const value = {
    catalog,
    icons,
    activeVariants,
    setActiveVariants,
    quantities,
    setQty,
    getActiveKey,
    selectedLines,
    totals,
    groupedReviewItems,
    selectedCountForStep,
    saved,
    checkedOut,
    setCheckedOut,
    saveSystem,
    onVariantChange: () => {
      setCheckedOut(false);
      setSaved(false);
    },
  };

  return <BundleContext.Provider value={value}>{children}</BundleContext.Provider>;
}

export function useBundle() {
  const context = useContext(BundleContext);
  if (!context) {
    throw new Error('useBundle must be used within a BundleProvider');
  }
  return context;
}
