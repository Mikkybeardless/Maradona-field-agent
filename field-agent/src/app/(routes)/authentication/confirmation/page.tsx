import confirmation from '@/app/_assets/icons/confirm.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
	return (
		<section className='grid place-items-center h-screen'>
			<div className='space-y-8'>
				<Image src={confirmation} width={208} height={160} alt='logo' className='mx-auto' />
				<p className='font-medium text-xl'>Your password has been updated successfully</p>
				<Link href='/' className='block'>
					<button type='button' className='bg-orange w-full p-4 rounded-md text-white font-medium'>
						Login
					</button>
				</Link>
			</div>
		</section>
	);
}
