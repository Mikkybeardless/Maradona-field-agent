'use client'

import styles from './styles.module.css'
import Image from 'next/image'
import logo from '@/app/_assets/images/logo.png'
import Link from 'next/link'

export const ResetPasswordCard = () => {
    return (
        <section className='space-y-3'>
            <Image src={logo} width={265} height={103} alt='logo' className='mx-auto' />
            <div className={styles.card}>
                <header className='mb-8 space-y-2 text-center mx-auto w-11/12'>
                    <h5 className='font-medium text-black text-2xl'>Reset your password</h5>
                    <h6 className='text-grey text-sm leading-tight'>Enter the email address you used to sign up and we’ll send you instructions to reset your password</h6>
                </header>
                <form>
                    <div className="space-y-1 mb-8">
                        <label htmlFor="email" className='font-work-sans'>Email</label>
                        <input type="email" id="email" name="email" className='w-full p-4 border border-[#ccc] rounded-md' placeholder="Email" />
                    </div>

                    <button type="submit" className='bg-orange w-full p-4 rounded-md text-white font-medium'>Reset Password</button>
                </form>
                <section className='flex items-center gap-2 my-5'>
                    <div className='h-[1px] w-full bg-light-grey'>
                    </div>
                    <p className='text-grey'>Or</p>
                    <div className='h-[1px] w-full bg-light-grey'>
                    </div>
                </section>
                <button type="button" className='text-orange w-full p-4 rounded-md border border-orange bg-white font-medium text-sm mb-4'>Verify using Whatsapp</button>
                <button type="button" className='text-orange w-full p-4 rounded-md border border-orange bg-white font-medium text-sm'>Send SMS</button>
            </div>

            <Link href="/authentication/login" className='mx-auto w-fit gap-2 flex items-center'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.33333 15.8333L2.5 9.99996M2.5 9.99996L8.33333 4.16663M2.5 9.99996H17.5" stroke="#1F0E1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Back to Login
            </Link>
        </section>
    )
}
