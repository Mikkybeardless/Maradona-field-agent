'use client';

import { DashboardProfileNav } from '@/app/_components/dashboard-profile-nav/dashboard-profile-nav';
import { ArrowRight2, Calendar2, Clock, Location } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import house from '@/app/_assets/images/house.png';
import { RescheduleModal } from '@/app/_components/reschedule-modal/reschedule-modal';
import { useState } from 'react';

export default function Page() {
	const items = [
		{ title: 'Bedrooms', text: '2 spacious bedrooms with built-in wardrobes.' },
		{ title: 'Bathrooms', text: '2.5 bathrooms, including an ensuite in the master bedroom.' },
		{ title: 'Living Area', text: 'Open-plan living and dining area with high ceilings and plenty of natural light.' },
		{ title: 'Kitchen', text: 'Fully equipped modern kitchen with stainless steel appliances, granite countertops, and ample storage space.' },
		{ title: 'Outdoor Space', text: 'Private backyard with a patio area, perfect for entertaining or relaxing.' },
		{ title: 'Parking', text: 'Attached garage with space for two cars and additional storage.' },
		{ title: 'Additional Amenities', text: 'Central air conditioning, heating, laundry room, and smart home features.' },
	];
	const [isModalOpen, setModalOpen] = useState<boolean>(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<div className='pb-24'>
			<RescheduleModal isOpen={isModalOpen} onClose={closeModal} />
			<DashboardProfileNav />
			<section className='mt-11'>
				<div className='flex items-center gap-2.5 mb-20'>
					<Link className='text-xs' href='/dashboard/overview'>
						Home
					</Link>
					<ArrowRight2 size={20} color='#5C4D58' />
					<Link className='text-xs' href='/dashboard/inspection-requests'>
						Inspection Requests
					</Link>
					<ArrowRight2 size={20} color='#5C4D58' />
					<Link className='text-xs' href='/dashboard/inspection-details'>
						Inspection Details
					</Link>
				</div>
				<section>
					<header className='flex items-center justify-between mb-16'>
						<h6 className='text-black text-2xl font-semibold mb-5'>Inspection Detail</h6>
						<div className='flex items-center gap-2'>
							<button className='bg-orange text-white px-10 rounded-lg py-3'>Start Inspection</button>
							<button className='bg-transparent text-orange px-10 rounded-lg py-3'>Mark as Completed</button>
						</div>
					</header>
					<section>
						<div className='flex items-start gap-7'>
							<section>
								<header className='flex items-center gap-12 text-orange text-sm mb-9'>
									<p>Request ID:</p>
									<p>1234DSFA</p>
								</header>
								<section>
									<h4 className='font-medium text-2xl'>Item Details:</h4>
									<div className='space-y-1 mb-2'>
										<h5 className='font-medium'>Name</h5>
										<p className='text-sm'>2-Bedroom Duplex with Modern Amenities</p>
									</div>
									<div className='space-y-1 mb-3'>
										<h5 className='font-medium'>Category</h5>
										<p className='text-sm'>Houses</p>
									</div>
									<div className='space-y-1.5 mb-3'>
										<h5 className='font-medium'>Description</h5>
										<p className='text-sm text-[#585858]'>A stunning 2-bedroom duplex located in the heart of the city. This property offers a perfect blend of modern design and comfortable living, ideal for families or professionals looking for a convenient and stylish home.</p>
										<p className='text-sm text-[#585858]'>Key Features:</p>
										<ul className='list-disc text-sm pl-5 text-[#585858]'>
											{items.map((item, index) => (
												<li key={index} className='mb-2'>
													<span className='font-medium'>{item.title}:</span> <span className='font-normal'>{item.text}</span>
												</li>
											))}
										</ul>
									</div>
									<div className='space-y-1 text-sm text-[#585858] mb-3'>
										<h5 className='font-medium'>Location</h5>
										<p>Lagos, Nigeria</p>
									</div>
								</section>
							</section>
							<section>
								<div>
									<div className='size-[30.5rem] mb-5 rounded-[32px] overflow-clip'>
										<Image src={house} width={430} height={430} alt='house' className='size-full' />
									</div>
									<section className='w-fit mx-auto flex items-center gap-3'>
										<div className='size-16 rounded-lg overflow-clip'>
											<Image src={house} width={430} height={430} alt='house' className='size-full' />
										</div>
										<div className='size-16 rounded-lg overflow-clip transform scale-x-[-1]'>
											<Image src={house} width={430} height={430} alt='house' className='size-full' />
										</div>
										<div className='size-16 rounded-lg overflow-clip'>
											<Image src={house} width={430} height={430} alt='house' className='size-full' />
										</div>
										<div className='size-16 rounded-lg overflow-clip transform scale-x-[-1]'>
											<Image src={house} width={430} height={430} alt='house' className='size-full' />
										</div>
									</section>
								</div>
							</section>
						</div>
						<section className='mb-32'>
							<header className='mb-6'>
								<h5 className='font-medium text-2xl'>Inspection Schedule:</h5>
							</header>
							<section className='flex items-center gap-2.5'>
								<div className='space-y-1.5'>
									<label htmlFor='date' className='text-gray-800 font-medium'>
										Date
									</label>
									<div className='w-[21rem] h-12 flex gap-3 items-center px-4 py-[0.5rem] border border-[#B0B0B0] bg-white rounded-lg'>
										<input id='date' type='date' className='w-full outline-none text-sm' />
									</div>
								</div>
								<div className='space-y-1.5'>
									<label htmlFor='time' className='text-gray-800 font-medium'>
										Time
									</label>
									<div className='w-[21rem] flex h-12 gap-3 items-center px-4 py-[0.5rem] border border-[#B0B0B0] bg-white rounded-lg'>
										<input id='time' type='time' className='w-full outline-none text-sm' />
										<Clock size={24} />
									</div>
								</div>
								<p onClick={openModal} className='underline text-orange'>
									Reschedule
								</p>
							</section>
						</section>
						<section className='bg-white w-full p-7'>
							<header className='mb-7'>
								<h5 className='font-medium text-lg'>About seller</h5>
							</header>
							<section className='flex mb-8 items-center justify-between'>
								<div className='flex items-center gap-4'>
									<div className='size-32 rounded-full bg-gray-400'></div>
									<div>
										<p className='font-medium text-2xl text-[#040421]'>Rosemary Sunday</p>
										<p className='text-[#585858] font-medium'>
											6.4K <span>items sold</span>{' '}
										</p>
									</div>
								</div>
								<div className='flex flex-col gap-3'>
									<button className='bg-[#B44500] rounded-xl text-white py-5 px-11'>Contact</button>
									<button className='bg-[#FFEEE3] rounded-xl grid place-items-center py-5 px-11'>
										<Location size={24} color='#E65800' />
									</button>
								</div>
							</section>
							<section className='space-y-1.5 mb-5'>
								<div className='flex items-center gap-2'>
									<Calendar2 size={24} color='#E65800' />
									<p className='text-[#585858] font-medium'>Joined Aug, 2023</p>
								</div>
								<div className='flex items-center gap-2'>
									<Clock size={24} color='#E65800' />
									<p className='text-[#585858] font-medium'>Usually responds within 24 hours</p>
								</div>
								<div className='flex items-center gap-2'>
									<Location size={24} color='#E65800' />
									<p className='text-[#585858] font-medium'>No2 Aminu Kano crescent, Lagos, Nigeria</p>
								</div>
							</section>
							<section className='flex items-center gap-60'>
								<div className='space-y-1 mb-3'>
									<h5 className='font-medium text-lg'>Detailed seller ratings</h5>
									<p className='text-[#585858]'>Average for the last 12 hours</p>
								</div>
								<div className='grid grid-cols-3 items-center gap-x-7 gap-y-3'>
									<p className='text-[#585858]'>Accurate description</p>
									<div className='w-36 h-1 rounded-full bg-[#585858]'></div>
									<p className='text-[#8B3500]'>4.9</p>
									<p className='text-[#585858]'>Reasonable Shipping cost</p>
									<div className='w-36 h-1 rounded-full bg-[#585858]'></div>
									<p className='text-[#8B3500]'>4.9</p>
									<p className='text-[#585858]'>Shipping speed</p>
									<div className='w-36 h-1 rounded-full bg-[#585858]'></div>
									<p className='text-[#8B3500]'>4.9</p>
									<p className='text-[#585858]'>Communication</p>
									<div className='w-36 h-1 rounded-full bg-[#585858]'></div>
									<p className='text-[#8B3500]'>4.9</p>
								</div>
							</section>
						</section>
					</section>
				</section>
			</section>
		</div>
	);
}
