'use client';

import { Suspense, useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-intl/navigation';

import { submitContactForm, type ContactFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('Contact.form');
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('sending')}
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          {t('submit')}
        </>
      )}
    </Button>
  );
}

function ContactFormComponent() {
  const t = useTranslations('Contact.form');
  const { toast } = useToast();
  const initialState: ContactFormState = { message: null, status: null };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const searchParams = useSearchParams();
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(2, { message: t('validation.name.min') }),
    email: z.string().email({ message: t('validation.email.invalid') }),
    message: z.string().min(10, { message: t('validation.message.min') }),
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      form.setValue('message', message);
    }
  }, [searchParams, form]);

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: t('toast.success.title'),
        description: t('toast.success.description'),
      });
      form.reset();
      const newUrl = window.location.pathname + window.location.hash.replace(/\?.*$/, '');
      window.history.replaceState({}, '', newUrl);

    } else if (state.status === 'error') {
      toast({
        title: t('toast.error.title'),
        description: state.message,
        variant: 'destructive',
      });
      state.fieldErrors?.name && form.setError('name', { message: state.fieldErrors.name[0] });
      state.fieldErrors?.email && form.setError('email', { message: state.fieldErrors.email[0] });
      state.fieldErrors?.message && form.setError('message', { message: state.fieldErrors.message[0] });
    }
  }, [state, toast, form, t]);

  return (
    <Form {...form}>
        <form action={formAction} className="space-y-6">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t('name.label')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('name.placeholder')} {...field} />
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
                        <FormLabel>{t('email.label')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('email.placeholder')} {...field} />
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
                        <FormLabel>{t('message.label')}</FormLabel>
                        <FormControl>
                            <Textarea placeholder={t('message.placeholder')} {...field} rows={5} />
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


export function ContactForm() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContactFormComponent />
        </Suspense>
    )
}
