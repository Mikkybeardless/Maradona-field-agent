import styles from './styles.module.css';
import Link from 'next/link';

export const EnterOTPCard = () => {
    return (
        <>
            <div className={styles.card}>
                <header className='mb-8 space-y-4 text-center mx-auto w-11/12'>
                    <h5 className='font-medium text-black text-2xl'>Enter OTP</h5>
                    <h6 className='text-grey text-sm leading-tight'>Please enter the 4 digit code that was sent to you.</h6>
                </header>
                <h6 className='text-grey text-sm mb-4 w-fit mx-auto'>Didn&apos;t get a code? send again</h6>
                <Link href=''>
                    <button type='button' className='bg-orange w-full p-4 rounded-md text-white font-medium'>
                        Verify
                    </button>
                </Link>
            </div>

            <Link href='/authentication/login' className='mx-auto w-fit gap-2 flex items-center'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M8.33333 15.8333L2.5 9.99996M2.5 9.99996L8.33333 4.16663M2.5 9.99996H17.5' stroke='#1F0E1C' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />
                </svg>
                Back to Login
            </Link>
        </>
    );
};
