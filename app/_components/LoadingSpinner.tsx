import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "lg";
  ref?: React.Ref<SVGSVGElement>;
}

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export default function LoadingSpinner({
  size,
  ref,
}: LoadingSpinnerProps): React.ReactElement<any> {
  return (
    <div
      aria-live="polite"
      role="status"
      className="flex grow h-full w-full items-center justify-center p-6"
    >
      <Loader ref={ref} className={cn(spinnerVariants({ size }))} />
    </div>
  );
}
