"use client";

import { useForm } from "react-hook-form";
import { setPassword } from "@/actions/user-action";
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

type ProfileFormProps = {
  id: string;
  password: string | null;
};

const formSchema = z.object({
  password: z.string().min(6),
});

export default function SetPasswordForm({ data }: { data: ProfileFormProps }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("password", values.password);

      const res = await setPassword(formData);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password baru</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  placeholder="********"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Set Password</Button>
      </form>
    </Form>
  );
}
