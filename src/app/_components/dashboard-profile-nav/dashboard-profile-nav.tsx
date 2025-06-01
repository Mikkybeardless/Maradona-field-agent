import Image from 'next/image';
import logo from '@/app/_assets/images/logo.png';
import { ArrowDown2, Star, Notification } from 'iconsax-react';

export const DashboardProfileNav = () => {
	return (
		<>
			<section className='flex items-center justify-between w-full mx-auto py-4'>
				<div className='flex items-center gap-10'>
					<Image src={logo} width={85} height={33} alt='logo' className='' />
				</div>
				<div className='flex items-center gap-7'>
					<div className='flex items-center text-orange gap-2'>
						<Star size={24} variant='Bold' />
						<p>Quick Actions</p>
					</div>
					<Notification size={24} />
					<div className='flex items-center gap-1.5'>
						<div className='size-9 rounded-full bg-gray-400'></div>
						<p className='text-sm'>Rosemary</p>
						<ArrowDown2 size={12} />
					</div>
				</div>
			</section>
		</>
	);
};
