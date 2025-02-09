'use client';
import Link from 'next/link';
import { Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header>
       <motion.div 
        className="p-4 bg-black px-24 border-b-[1.5px] border-[#818181] text-white flex flex-col sm:flex-row items-center justify-between gap-1 w-full text-center shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        <Link href="/" className="text-3xl font-bold tracking-wider">SPOTIFINY</Link>
        <nav>
          <ul className="flex space-x-5 font-semibold">

            <li>
              <Link href="/" className='mr-4'>
                Accueil
              </Link>
            </li>

            <li>
              <Menu as="div" className="relative inline-block text-left tracking-wide">
                <div>
                  <MenuButton className="flex gap-1 items-end">Services
                    <ChevronDownIcon className="size-4 fill-white/60 pb-1" />
                  </MenuButton>
                </div>

                <MenuItems anchor="bottom end" transition className="w-full sm:w-52 origin-top-right border-y mt-1 sm:rounded-lg sm:border border-[#818181] bg-black p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">

                  <MenuItem>
                    <Link href="/upgrade" className="block rounded-md data-[focus]:bg-[#121212] w-full py-1.5 px-3">
                      Upgrade
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <Link href="/renew" className="block rounded-md data-[focus]:bg-[#121212] w-full py-1.5 px-3">
                      Renew
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <Link href="/key-info" className="block rounded-md data-[focus]:bg-[#121212] w-full py-1.5 px-3">
                      Key Info
                    </Link>
                  </MenuItem>

                </MenuItems>
              </Menu>
            </li>

            {/* Assistance Dropdown */}
            <li>
              <Menu as="div" className="relative inline-block text-left">
                <div >
                  <MenuButton className='flex items-end gap-1' >Assistance
                  <ChevronDownIcon className="size-4 fill-white/60 pb-1" />
                  </MenuButton>
                </div>
                
                <MenuItems anchor="bottom end" transition className="w-full sm:w-52 origin-top-right border-y mt-1 sm:rounded-lg sm:border border-[#818181] bg-black p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                  <div className="py-1">
                    <MenuItem>
                      <Link href="/faq" className="block data-[focus]:bg-[#121212] rounded-md w-full py-1.5 px-3">
                        FAQ
                      </Link>
                      </MenuItem>
                      
                    <MenuItem>
                      <Link
                        href="/contact-us"
                        className="block data-[focus]:bg-[#121212] rounded-md w-full py-1.5 px-3"
                        >
                        Contactez-nous
                      </Link>
                    </MenuItem>

                  </div>
                </MenuItems>
              </Menu>
            </li>
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}
