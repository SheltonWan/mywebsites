import clsx from "clsx";
import { ReactNode } from "react";

interface PhoneMockupProps {
  children?: ReactNode;
  className?: string;
  placeholder?: string;
}

export default function PhoneMockup({
  children,
  className,
  placeholder = "小程序截图",
}: PhoneMockupProps) {
  return (
    <div
      className={clsx(
        "relative mx-auto w-[280px] sm:w-[300px]",
        className
      )}
    >
      {/* Phone Frame */}
      <div className="relative rounded-[2.5rem] border-[6px] border-gray-900 bg-gray-900 shadow-2xl shadow-black/30 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-gray-900 rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="relative w-full aspect-[9/19.5] bg-white rounded-[2rem] overflow-hidden">
          {children || (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-brand-50 to-white p-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-brand-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-sm text-brand-400 font-medium">
                {placeholder}
              </span>
              <span className="text-xs text-gray-400 mt-1">375 × 812</span>
            </div>
          )}
        </div>
      </div>

      {/* Reflection */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/5 to-white/10 pointer-events-none" />
    </div>
  );
}
