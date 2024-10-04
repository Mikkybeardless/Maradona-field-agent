import Image from 'next/image';
import logo from '@/app/_assets/images/logo.png';
import { Chart1, Home2, Setting, Notification, SearchNormal1 } from 'iconsax-react';
import Link from 'next/link';

export const DashboardNav = () => {
	return (
		<>
			<section className='flex items-center justify-between w-full mx-auto py-4'>
				<div className='flex items-center gap-10'>
					<Image src={logo} width={85} height={33} alt='logo' className='' />
					<div className='w-[40rem] flex gap-3 items-center px-4 py-[0.5rem] bg-white rounded-full'>
						<SearchNormal1 size={24} />
						<input className='w-full outline-none text-sm' />
					</div>
				</div>
				<div className='flex items-center gap-7'>
					<Home2 size={24} color='#E65800' />
					<Setting size={24} color='#000000' />
					<Link href='/dashboard/inspection-requests'>
						<Chart1 size={24} color='#000000' />
					</Link>
					<Notification size={24} color='#000000' />
					<Link href='/dashboard/profile'>
						<div className='size-9 rounded-full bg-gray-400'></div>
					</Link>
				</div>
			</section>
		</>
	);
};
