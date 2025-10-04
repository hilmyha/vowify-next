"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { createBrides } from "@/actions/bride-action";

interface BrideGroom {
  brideName: string;
  groomName: string;
  brideParent: string | null;
  groomParent: string | null;
  invitationId: string;
}

interface BrideFormData {
  id: string;
  BrideGroom: BrideGroom[];
}

const formSchema = z.object({
  brideName: z.string().min(3),
  groomName: z.string().min(3),
  brideParent: z.string().min(3),
  groomParent: z.string().min(3),
  invitationId: z.string(),
});

export default function BrideForm({ data }: { data: BrideFormData }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brideName: data.BrideGroom[0]?.brideName || "",
      groomName: data.BrideGroom[0]?.groomName || "",
      brideParent: data.BrideGroom[0]?.brideParent || "",
      groomParent: data.BrideGroom[0]?.groomParent || "",
      invitationId: data?.id,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("brideName", values.brideName);
      formData.append("groomName", values.groomName);
      formData.append("brideParent", values.brideParent);
      formData.append("groomParent", values.groomParent);
      formData.append("invitationId", values.invitationId);

      const res = await createBrides(formData);

      if (res?.error) {
        toast.error(res?.error as string);
      } else {
        toast.success(res.message as string);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-4 mb-5">
          <div className="space-y-3">
            <h4 className="font-bold mb-4">Pengantin Pria</h4>
            <FormField
              control={form.control}
              name="brideName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="brideName">Nama</FormLabel>
                  <FormControl>
                    <Input
                      id="brideName"
                      placeholder="Nama"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brideParent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="brideParent">Nama Orang Tua</FormLabel>
                  <FormControl>
                    <Input
                      id="brideParent"
                      placeholder="Nama Orang Tua"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-3">
            <h4 className="font-bold mb-4">Pengantin Wanita</h4>
            <FormField
              control={form.control}
              name="groomName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="groomName">Nama</FormLabel>
                  <FormControl>
                    <Input
                      id="groomName"
                      placeholder="Nama"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groomParent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="groomParent">Nama Orang Tua</FormLabel>
                  <FormControl>
                    <Input
                      id="groomParent"
                      placeholder="Nama Orang Tua"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
