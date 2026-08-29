'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Context } from '../../helper/Context'
import { CiMenuBurger, CiMenuFries } from 'react-icons/ci'

const Navbar = () => {
  const { sidebar, setSidebar } = useContext(Context)

  const links = [
    { label: 'Products', href: '/products' },
    { label: 'Career', href: '/career' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className='w-full px-3 pt-3 z-50'>
      <nav
        className='w-full  flex items-center justify-between h-12 px-4 rounded-2xl'
      >
        <Link
          href='/'
          className='text-3xl font-jersey -tracking-tighter font-semibold text-primary hover:text-primary-dark transition-colors duration-300'
        >
          Disibin
        </Link>

        <div className='hidden sm:flex flex-row items-center gap-1'>
          {links.map((l) => (
            <Link
              key={l.href}
              className='px-4 py-2 rounded-xl text-sm font-medium text-primary hover:text-primary-dark hover:bg-primary/10 transition-all duration-200'
              href={l.href}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setSidebar(!sidebar)}
          className='sm:hidden p-2 cursor-pointer rounded-xl text-slate-700 hover:bg-slate-100 transition-colors'
          aria-label='Toggle menu'
        >
          {sidebar ? <CiMenuFries size={20} /> : <CiMenuBurger size={20} />}
        </button>
      </nav>
    </header>
  )
}

export default Navbar

