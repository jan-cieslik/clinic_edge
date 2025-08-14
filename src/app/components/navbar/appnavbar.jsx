'use client'
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
} from '@heroicons/react/20/solid'
import {  XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { UserButton } from '@clerk/nextjs'
import LanguageSelector from '../elements/flagselector'
import { CEconfig } from '@/utils/logic/config'

export default function AppNavBar({dict, lang, children, isAdmin = false}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: dict.app.navigation.allcases, href: '#' },
    { name: dict.app.navigation.feedback, href: '#' },
    { name: dict.app.navigation.contact, href: '#' }
  ]
  if (isAdmin){
    navigation.push({ name: dict.app.navigation.admin, href: '/'+lang+'/admin/' })
  }

  return (
    <>
      <header className="inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10 bg-keyA-500">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            <button type="button" className="-m-3 p-3 md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
            { <img
              className="h-8 w-auto"
              src="/logo_01.png"
              alt="Clinic Edge"
            /> }
          </div>
          <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6  ">
            {navigation.map((item, itemIdx) => (
              <a key={itemIdx} href={item.href} className='text-keyA-100 hover:text-white'>
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-1 items-center justify-end gap-x-8">
            <LanguageSelector languages={CEconfig.lang.supported} selectedLang={lang} />
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your profile</span>
              <UserButton />
            </a>
          </div>
        </div>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-keyA-500 px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIconOutline className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="-ml-0.5">
                <a href="#" className="-m-1.5 block p-1.5">
                  {/* <span className="sr-only">Your Company</span> */}
                  <img
                    className="h-8 w-auto"
                    src="/logo_01.png"
                    alt="Clinic Edge"
                  />
                </a>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-keyA-100 hover:text-white hover:bg-keyA-700"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        {children}
      </main>
    </>
  )
}
