import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../components/ui/utils";

export type DSImageDialogVariant = "artifact" | "plain";

export function DSImageDialog({
  src,
  caption,
  variant = "plain",
  fullWidth = true,
  aspectClass,
  imageClassName,
  className,
  disableHoverScale,
  onImageClick,
}: {
  src: string;
  caption: string;
  variant?: DSImageDialogVariant;
  fullWidth?: boolean;
  aspectClass?: string;
  imageClassName?: string;
  className?: string;
  disableHoverScale?: boolean;
  onImageClick?: (src: string, caption: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => {
    if (onImageClick) {
      onImageClick(src, caption);
      return;
    }
    setIsOpen(true);
  };

  const renderImage = () => (
    <img
      src={src}
      alt={caption}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      className={cn(
        variant === "artifact"
          ? "w-full h-full opacity-90 transition-all duration-500 group-hover:opacity-100"
          : "w-full h-auto transition-opacity duration-300 group-hover:opacity-95",
        variant === "artifact" && !disableHoverScale ? "group-hover:scale-[1.02]" : "",
        imageClassName ?? "object-contain"
      )}
    />
  );

  const renderZoomHint = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
        <ZoomIn size={16} className="text-foreground" />
      </div>
    </div>
  );

  return (
    <>
      {variant === "artifact" ? (
        <motion.button
          type="button"
          className={cn("group relative overflow-hidden bg-background w-full text-left", aspectClass, className)}
          onClick={handleOpen}
          aria-label={`View full image: ${caption}`}
        >
          {renderImage()}
          {renderZoomHint()}
        </motion.button>
      ) : (
        <button
          type="button"
          className={cn(
            "group relative text-left overflow-hidden p-0 m-0 border-0 bg-transparent leading-none appearance-none",
            fullWidth ? "block w-full" : "block w-fit max-w-full",
            className
          )}
          onClick={handleOpen}
          aria-label={`View full image: ${caption}`}
        >
          {renderImage()}
          {renderZoomHint()}
        </button>
      )}

      {!onImageClick && isOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            aria-label="Close image"
          >
            <span className="hidden sm:inline tracking-wide">Close</span>
            <X size={18} />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={src}
              alt={caption}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="max-w-full max-h-[75vh] object-contain"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

type BaseImageViewProps = {
  src: string;
  caption: string;
  onImageClick?: (src: string, caption: string) => void;
};

export function DSArtifactImageView({
  src,
  caption,
  onImageClick,
  aspectClass = "aspect-[16/9]",
  imageClassName,
  className,
  disableHoverScale,
}: BaseImageViewProps & {
  aspectClass?: string;
  imageClassName?: string;
  className?: string;
  disableHoverScale?: boolean;
}) {
  return (
    <DSImageDialog
      src={src}
      caption={caption}
      variant="artifact"
      onImageClick={onImageClick}
      aspectClass={aspectClass}
      imageClassName={imageClassName}
      className={className}
      disableHoverScale={disableHoverScale}
    />
  );
}

export function DSCaptionImageView({
  src,
  caption,
  onImageClick,
}: BaseImageViewProps) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/20 overflow-hidden text-left transition-all hover:-translate-y-0.5 hover:border-foreground/20">
      <div className="aspect-[16/9] bg-background/50">
        <DSImageDialog
          src={src}
          caption={caption}
          variant="plain"
          onImageClick={onImageClick}
          className="h-full"
          imageClassName="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-foreground/85 leading-relaxed">{caption}</p>
      </div>
    </div>
  );
}

export function DSStaticImageView({
  src,
  caption,
  onImageClick,
  className,
  imageClassName,
}: BaseImageViewProps & {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <DSImageDialog
      src={src}
      caption={caption}
      variant="plain"
      fullWidth={false}
      onImageClick={onImageClick}
      className={cn("inline-block self-start h-fit shrink-0 border border-border leading-none", className)}
      imageClassName={cn("block align-top w-auto h-auto max-w-full", imageClassName)}
    />
  );
}
