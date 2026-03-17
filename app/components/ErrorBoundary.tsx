"use client";

import { useEffect, useState, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Error caught by boundary:", error);
      setHasError(true);
      setError(error.error);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-3xl mb-6">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          เกิดข้อผิดพลาด
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          ขออภัย มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition"
        >
          โหลดหน้าใหม่
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
