"use client";

import { useForm } from "react-hook-form";
import { updateProfile } from "@/actions/user-action";
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
  name: string | null;
  email: string | null;
  password: string | null;
};

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
});

export default function EditProfileForm({ data }: { data: ProfileFormProps }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name as string,
      email: data.email as string,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);

      const res = await updateProfile(formData);

      if (res?.error) {
        toast.error(res?.error as string);
      } else {
        toast.success("User updated successfully");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Enter your name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">New Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  placeholder="Enter your new password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
}
