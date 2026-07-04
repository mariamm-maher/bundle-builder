import { BundleProvider } from './context/BundleContext';
import BundleBuilder from './components/BundleBuilder/BundleBuilder';
import ReviewPanel from './components/ReviewPanel/ReviewPanel';


export default function App() {
  return (
    <BundleProvider>
    <main className="mx-auto mt-[38px] mb-[52px] grid w-[min(1080px,calc(100%-32px))] gap-[4px]
   max-[640px]:gap-0 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:m-0 max-[640px]:w-full max-[640px]:gap-[20px] max-[640px]:pt-[31px]">
           <BundleBuilder />
           <ReviewPanel />
         </main>
    </BundleProvider>
  
  );
}