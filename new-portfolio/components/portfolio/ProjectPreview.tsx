import { useState } from "react";
import { Terminal } from "lucide-react";
import Image from "next/image";

export function ProjectPreview({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-t-[12px] border-b-2 border-[#1A3B32] bg-[#1A3B32]">
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#F4FFF9]">
          <Terminal className="h-8 w-8" aria-hidden="true" />
          <span className="text-mono text-xs uppercase tracking-[0.2em]">Project Preview</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      {!failed ? <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" /> : null}
    </div>
  );
}
