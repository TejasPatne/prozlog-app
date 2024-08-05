import React, { useRef, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import PublicIcon from '@mui/icons-material/Public';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import SEO from '../../utility/SEO';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();
  const form = useRef();

  const socials = [
    {
      name: "instagram",
      icon: <InstagramIcon />,
      url: "https://www.instagram.com/vesit_chembur/",
    },
    {
      name: "website",
      icon: <PublicIcon />,
      url: "https://vesit.ves.ac.in//",
    },
    {
      name: "linkedin",
      icon: <LinkedInIcon />,
      url: "https://www.linkedin.com/school/vesit-chembur/",
    },
  ]

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if(!authUser) {
      toast.error("Please login to continue");
      return;
    }

    // check if all fields are filled
    if(!form.current.user_name.value || !form.current.user_email.value || !form.current.message.value.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    emailjs
      .sendForm(import.meta.env.VITE_REACT_EMAILJS_SERVICE_ID, import.meta.env.VITE_REACT_EMAILJS_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_REACT_EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success("Feedback sent successfully");
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          toast.error("Something went wrong! Please try again");
          setLoading(false);
        },
      );
  }

  return (
    <section>
      {/* metadata */}
      <SEO title="Contact Us" description="Get in touch with us" name="Vivekanand Education Society's Institute of Technology, Chembur" type="website" />

      <div className='flex flex-col gap-10 m-5 md:m-10'>
      <div className='flex flex-col gap-5'>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-500 leading-5">Feel free to reach out to us <br/>For any queries, feedback, suggestions, or anything else</p>
        <div className="flex gap-5 mt-5">
          {socials.map((social) => (
            <a href={social.url} target="_blank" key={social.name}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-5'>
      <h1 className='text-3xl'>Your Feedback is important</h1>
        <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-2 justify-start'>
            <input readOnly hidden type="text" name="from_name" value={authUser?.userName}/>
            <input readOnly hidden type="text" name="user_name" value={authUser?.fullName} className='p-2 rounded-md border-2 w-full md:w-[50%]' />
            <input readOnly hidden type="email" name="user_email" value={authUser?.email} className='p-2 rounded-md border-2 w-full md:w-[50%]' />
            <textarea name="message" id="message" className='p-2 rounded-md border-2 w-full md:w-[50%] h-40' placeholder='Enter your feedback/suggestion.'></textarea>
            <button disabled={loading} type='submit' className='w-fit bg-gray-700 hover:opacity-90 text-white py-2 px-4 rounded-md disabled:opacity-75'>Submit</button>
        </form>
      </div>
    </div>
    </section>
  )
}

export default Contact