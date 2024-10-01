import Image from 'next/image';
import logo from '@/app/_assets/images/logo.png';

export const DashboardNav = () => {
    return (
        <>
            <section className='flex items-center justify-between w-full mx-auto py-4'>
                <div className='flex items-center gap-10'>
                    <Image src={logo} width={85} height={33} alt='logo' className='' />
                    <input className='w-[40rem] px-[0.625rem] py-[0.5rem] bg-white rounded-full' />
                </div>
                <div className='flex items-center gap-7'>
                    <div>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" transform="translate(0 0.5)" fill="white" />
                            <path d="M9.02 3.33992L3.63 7.53992C2.73 8.23992 2 9.72992 2 10.8599V18.2699C2 20.5899 3.89 22.4899 6.21 22.4899H17.79C20.11 22.4899 22 20.5899 22 18.2799V10.9999C22 9.78992 21.19 8.23992 20.2 7.54992L14.02 3.21992C12.62 2.23992 10.37 2.28992 9.02 3.33992Z" stroke="#E65800" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18.49V15.49" stroke="#E65800" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" transform="translate(0 0.5)" fill="white" />
                            <path d="M9.02 3.33992L3.63 7.53992C2.73 8.23992 2 9.72992 2 10.8599V18.2699C2 20.5899 3.89 22.4899 6.21 22.4899H17.79C20.11 22.4899 22 20.5899 22 18.2799V10.9999C22 9.78992 21.19 8.23992 20.2 7.54992L14.02 3.21992C12.62 2.23992 10.37 2.28992 9.02 3.33992Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18.49V15.49" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" transform="translate(0 0.5)" fill="white" />
                            <path d="M9.02 3.33992L3.63 7.53992C2.73 8.23992 2 9.72992 2 10.8599V18.2699C2 20.5899 3.89 22.4899 6.21 22.4899H17.79C20.11 22.4899 22 20.5899 22 18.2799V10.9999C22 9.78992 21.19 8.23992 20.2 7.54992L14.02 3.21992C12.62 2.23992 10.37 2.28992 9.02 3.33992Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18.49V15.49" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" transform="translate(0 0.5)" fill="white" />
                            <path d="M9.02 3.33992L3.63 7.53992C2.73 8.23992 2 9.72992 2 10.8599V18.2699C2 20.5899 3.89 22.4899 6.21 22.4899H17.79C20.11 22.4899 22 20.5899 22 18.2799V10.9999C22 9.78992 21.19 8.23992 20.2 7.54992L14.02 3.21992C12.62 2.23992 10.37 2.28992 9.02 3.33992Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18.49V15.49" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className='size-9 rounded-full bg-gray-400'>

                    </div>
                </div>
            </section>
        </>
    )
}