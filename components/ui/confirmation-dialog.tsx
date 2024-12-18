import React, { useState } from "react";
import CustomDialog from "./custom-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Spinner } from "./spinner";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => Promise<void>;
}

export default function ConfirmationDialog({ open, setOpen, callback }: Props) {
  const [loading, setLoading] = useState(false);
  async function handleConfirm() {
    setLoading(true);
    await callback();
    setLoading(false);
    setOpen(false);
  }

  function handleCancel() {
    setOpen(false);
  }
  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <Card>
        <CardHeader className="">
          <CardTitle className="text-[.85rem]">Are you sure?</CardTitle>
          <CardDescription className="text-xs">This action cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-x-4">
          <Button variant={"default"} onClick={handleConfirm} className="text-xs h-8 min-w-[5rem]">
            {loading ? <Spinner /> : "Confirm"}
          </Button>
          <Button variant={"outline"} onClick={handleCancel} className="text-xs h-8">
            Cancel
          </Button>
        </CardContent>
      </Card>
    </CustomDialog>
  );
}
