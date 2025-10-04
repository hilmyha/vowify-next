"use client";

import { useForm } from "react-hook-form";
import { createInvitation } from "@/actions/invitation-action";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3),
});

export default function CreateInvitationDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("name", values.name);

      const res = await createInvitation(formData);

      if (res?.error) {
        toast.error(res?.error as string);
      } else {
        toast.success(res.message as string);
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild suppressHydrationWarning>
        <Button variant={"outline"}>Buat Undangan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Undangan Baru</DialogTitle>
          <DialogDescription>
            Aksi ini akan mengurangi kuota kamu setelah disubmit. Pastikan kamu
            memiliki kuota yang cukup.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nama Undangan</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Undangan Baru"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Buat</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
