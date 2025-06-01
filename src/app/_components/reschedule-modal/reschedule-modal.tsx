'use client';

import { Add } from 'iconsax-react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const RescheduleModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div onClick={handleBackgroundClick} className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
			<div className='bg-white space-y-11 p-6 rounded-lg shadow-lg w-[32rem]'>
				<header className='w-full flex items-center justify-between'>
					<h5 className='text-3xl text-[#1F0E1C] font-semibold'>Reschedule</h5>
					<button type='button' onClick={onClose} className='bg-[#F4F1F3] rounded-full size-12 grid place-items-center'>
						<Add size={32} className='rotate-45' />
					</button>
				</header>
				<section className='space-y-5'>
					<div className='space-y-1.5'>
						<label htmlFor='date' className='text-gray-800 font-medium'>
							Date
						</label>
						<input type='date' id='date' placeholder='First Name' value='Rosemary' className='w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange' />
					</div>
					<div className='space-y-1.5'>
						<label htmlFor='time' className='text-gray-800 font-medium'>
							Time
						</label>
						<input type='time' id='time' placeholder='Last Name' value='Sunday' className='w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange' />
					</div>
				</section>
				<div className='flex items-center gap-3 ml-auto w-fit'>
					<button onClick={onClose} className='px-10 py-2.5 rounded-lg border-orange bg-orange text-white border focus:outline-none'>
						Reschedule
					</button>
				</div>
			</div>
		</div>
	);
};
