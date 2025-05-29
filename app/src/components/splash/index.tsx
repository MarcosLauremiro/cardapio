import { useEffect, useState } from "react";
import waiter from "../../assets/ilustrawaiter.svg";

export const SplashScream = () => {
  const [visible, setVisible] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(() => setVisible(false), 600); // espera a animação
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-primary)] overflow-hidden ${
        exit ? "animate-lensZoomOut" : "animate-lensZoomIn"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={waiter} alt="garçom" className="w-24 h-24" />
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold uppercase">
            Digi<span className="font-normal">prato</span>
          </h1>
          <h2 className="text-lg">O App do seu restaurante.</h2>
        </div>
      </div>
    </div>
  );
};
