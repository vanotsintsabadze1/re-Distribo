import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader } from "./dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function CustomDialog({ open, setOpen, children }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader className="hidden">
        <DialogTitle>Confirmation Dialog</DialogTitle>
        <DialogDescription>Are you sure?</DialogDescription>
      </DialogHeader>
      <DialogContent className="border-none h-fit flex items-center justify-center bg-transparent shadow-none">{children}</DialogContent>
    </Dialog>
  );
}
