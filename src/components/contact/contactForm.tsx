'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { MAX_MESSAGE_LENGTH, sendContactMessage } from '@/server/contact';

interface ContactFormProps {
  defaultExpanded?: boolean;
}

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm({ defaultExpanded = false }: ContactFormProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const messageValue = watch('message');

  const mutation = useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      reset();
    }
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ data });
  };

  return (
    <div className={cn(
      "max-w-2xl mx-auto transition-all",
      { "border p-2 rounded-lg bg-gray-50": isExpanded }
    )}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer text-blue-600 underline hover:text-blue-800 transition-colors font-medium">
        {isExpanded ? 'Hide Contact Form' : 'Contact Us'}
      </button>

      <div
        className={`px-1 transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-netlify="true"
          method="POST"
          className="space-y-6 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                id="name"
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-700 focus:border-transparent"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                id="email"
                className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-700 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              id="message"
              rows={6}
              maxLength={MAX_MESSAGE_LENGTH}
              className="w-full bg-white px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-700 focus:border-transparent"
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
            )}
            <p className={cn("text-sm text-gray-500 mt-1", {
              "text-red-600": messageValue && messageValue.length > MAX_MESSAGE_LENGTH
            }
            )}>
              {messageValue ? messageValue.length : 0}/{MAX_MESSAGE_LENGTH} characters
            </p>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-sky-700 text-white py-3 px-6 rounded-md hover:bg-sky-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">
            {mutation.isPending ? 'Sending...' : 'Send Message'}
          </button>

          {mutation.isSuccess && (
            <p className="text-green-600 text-center">
              Thank you! Your message has been sent successfully.
            </p>
          )}

          {mutation.isError && (
            <p className="text-red-600 text-center">
              Oops! Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
