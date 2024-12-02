"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";

interface ModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function PokemonDetailModal({
  title,
  description,
  children,
}: ModalProps) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogContent>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
