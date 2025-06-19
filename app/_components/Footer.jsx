import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className='py-5 bg-black text-white/60 border-t border-white/20'>
      <div className="">
        <div className='flex flex-col gap-5 sm:flex-row sm:justify-between'>
          <div className="text-center"> 2024 Eldora UI All rights are reserved</div>
          <ul className='flex justify-center gap-2.5'>
            <li><Twitter size={24} /></li>  {/* Replace with Twitter icon */}
            <li><Linkedin size={24} /></li>  {/* Replace with LinkedIn icon */}
            <li><Instagram size={24} /></li>  {/* Replace with Instagram icon */}
            <li><Youtube size={24} /></li>  {/* Replace with YouTube icon */}
          </ul>
        </div>
      </div>
    </footer>
  )
};
