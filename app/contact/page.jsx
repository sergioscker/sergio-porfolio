'use client';

import { useState } from 'react';

// animations
import { motion } from 'framer-motion';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

//components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

//icons
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';

// notifications
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// api emailJS
import emailjs from 'emailjs-com';

// contact options
const info = [
  {
    icon: (
      <Link
        href="https://wa.link/up0k32"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaPhoneAlt />
      </Link>
    ),
    title: 'Phone',
    description: '(+351) 939274154',
  },
  {
    icon: (
      <Link
        href="mailto:sergiowallace11@hotmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaEnvelope />
      </Link>
    ),
    title: 'Email',
    description: 'sergiowallace11@hotmail.com',
  },
  {
    icon: <FaMapMarkedAlt />,
    title: 'Address',
    description: 'All places',
  },
];

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (data) => {
    setFormData({ ...formData, [data.target.name]: data.target.value });
  };

  const handleSubmit = async (data) => {
    data.preventDefault();
    setLoading(true);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

    const templateParams = {
      to_name: 'Sergio',
      from_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone_number: formData.phoneNumber,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      toast.success('Message sent successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });

      router.push('/');
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        position: 'top-right',
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
      }}
      className="py-6"
    >
      <ToastContainer />
      <div className="container mx-auto">
        <div className="flex flex-col pt-16 mt-8 xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[50%] order-2 xl:order-none">
            <form
              className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
              onSubmit={handleSubmit}
            >
              <h3 className="text-4xl text-accent">Let's work together</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here."
                value={formData.message}
                onChange={handleChange}
              />

              <Button
                type="submit"
                size="md"
                className="max-w-40"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          </div>

          {/* info */}
          <div
            className="flex-1 flex items-center justify-center xl:justify-end order-1 xl:order-none 
          mb-8 xl:mb-0 pt-5 overflow-x-hidden"
          >
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col xl:flex-row items-center gap-6"
                >
                  <div
                    className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c]
                     text-accent rounded-md flex items-center justify-center"
                  >
                    <div className="text-[28px]">{item.icon}</div>
                  </div>

                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
