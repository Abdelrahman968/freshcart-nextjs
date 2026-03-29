'use client';
import {
  addToast,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';
import { FaPaperPlane } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { RxAvatar } from 'react-icons/rx';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    // console.log(data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    addToast({
      title: 'Message sent successfully',
      description: 'We will get back to you as soon as possible',
      color: 'success',
      closeIcon: true,
      shouldShowTimeoutProgress: true,
    });
    reset();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Input
            label="Full Name"
            id="name"
            required
            placeholder="John Doe"
            type="text"
            defaultValue={session?.user?.name || ''}
            endContent={
              session?.user?.name && <RxAvatar size={20} color="#16A34A" />
            }
            {...register('name', {
              required: 'Name is required',
            })}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
        </div>
        <div>
          <Input
            label="Email Address"
            id="email"
            required
            placeholder="john@example.com"
            type="email"
            defaultValue={session?.user?.email || ''}
            endContent={
              session?.user?.email && <RxAvatar size={20} color="#16A34A" />
            }
            {...register('email', {
              required: 'Email is required',
            })}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        </div>
      </div>
      <div>
        <Select
          label="Subject"
          placeholder="Select a subject"
          {...register('subject', {
            required: 'Subject is required',
          })}
          isInvalid={!!errors.subject}
          errorMessage={errors.subject?.message}
        >
          <SelectItem key="">Select a subject</SelectItem>
          <SelectItem key="general">General Inquiry</SelectItem>
          <SelectItem key="order">Order Support</SelectItem>
          <SelectItem key="shipping">Shipping Question</SelectItem>
          <SelectItem key="returns">Returns &amp; Refunds</SelectItem>
          <SelectItem key="product">Product Information</SelectItem>
          <SelectItem key="feedback">Feedback &amp; Suggestions</SelectItem>
          <SelectItem key="other">Other</SelectItem>
        </Select>
      </div>
      <div>
        <Textarea
          label="Message"
          id="message"
          required
          placeholder="How can we help you?"
          onClear={() => console.log('textarea cleared')}
          minRows={10}
          {...register('message', {
            required: 'Message is required',
          })}
          isInvalid={!!errors.message}
          errorMessage={errors.message?.message}
        />
      </div>
      <Button
        type="submit"
        color="success"
        variant="solid"
        startContent={
          <FaPaperPlane className={`${isSubmitting ? 'hidden' : 'block'}`} />
        }
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm shadow-green-600/20"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex gap-2">
            <p>Sending Message</p>
            <div className="flex gap-1">
              <span className="animate-bounce font-bold">.</span>
              <span className="animate-bounce delay-200 font-bold">.</span>
              <span className="animate-bounce delay-400 font-bold">.</span>
            </div>
          </span>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}

export default ContactForm;
