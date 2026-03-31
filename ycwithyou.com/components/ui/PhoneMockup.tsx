import Image from "next/image";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function PhoneMockup({ src, alt, className = "", priority }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone frame */}
      <div className="relative w-[220px] mx-auto">
        <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-full z-10" />
          {/* Screen */}
          <div className="bg-black rounded-[2rem] overflow-hidden aspect-[9/19.5]">
            <Image
              src={src}
              alt={alt}
              width={216}
              height={468}
              className="w-full h-full object-cover"
              priority={priority}
            />
          </div>
        </div>
        {/* Reflection */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gray-900/20 blur-xl rounded-full" />
      </div>
    </div>
  );
}
