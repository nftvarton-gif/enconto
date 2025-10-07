'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { submitContactForm, type ContactFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Send } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

export function ContactForm({ prefillMessage }: { prefillMessage?: string }) {
    const { toast } = useToast();
    const initialState: ContactFormState = { message: null, status: null };
    const [state, formAction] = useActionState(submitContactForm, initialState);

    const formSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        email: z.string().email({ message: "Please enter a valid email address." }),
        message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
    });

    type ContactFormValues = z.infer<typeof formSchema>;

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: '',
        email: '',
        message: '',
        },
    });

    useEffect(() => {
        if (prefillMessage) {
            form.setValue('message', prefillMessage);
        }
    }, [prefillMessage, form]);

    useEffect(() => {
        if (state.status === 'success') {
        toast({
            title: "Message Sent!",
            description: "Thank you for your message! We will get back to you soon.",
        });
        form.reset();
        } else if (state.status === 'error') {
        toast({
            title: "Error",
            description: state.message,
            variant: 'destructive',
        });
        state.fieldErrors?.name && form.setError('name', { message: state.fieldErrors.name[0] });
        state.fieldErrors?.email && form.setError('email', { message: state.fieldErrors.email[0] });
        state.fieldErrors?.message && form.setError('message', { message: state.fieldErrors.message[0] });
        }
    }, [state, toast, form]);

    return (
        <Form {...form}>
            <form action={formAction} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us how we can help..." {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton />
            </form>
        </Form>
    );
}
