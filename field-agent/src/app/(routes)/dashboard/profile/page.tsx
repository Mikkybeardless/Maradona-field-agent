'use client';

import { DashboardProfileNav } from '@/app/_components/dashboard-profile-nav/dashboard-profile-nav';
import { EditProfileModal } from '@/app/_components/edit-profile-modal/edit-profile-modal';
import { ArrowRight2, Camera, Copy, Edit2, LogoutCurve } from 'iconsax-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
	const [isModalOpen, setModalOpen] = useState<boolean>(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<>
			<DashboardProfileNav />
			<section className='mt-11'>
				<EditProfileModal isOpen={isModalOpen} onClose={closeModal} />
				<div className='flex items-center gap-2.5 mb-20'>
					<Link className='text-xs' href='/dashboard/overview'>
						Home
					</Link>
					<ArrowRight2 size={20} color='#5C4D58' />
					<Link className='text-xs' href='/dashboard/profile'>
						Profile
					</Link>
				</div>
				<section className='flex items-start gap-3 w-3/5 mx-auto'>
					<div className='w-80 className bg-white border border-[#EAE6E9] rounded-lg px-6 py-4'>
						<div className='mx-auto mb-4 grid place-items-center w-fit relative'>
							<div className='size-24 bg-gray-300 rounded-full'></div>
							<button type='button' className='size-6 bg-gray-100 shadow-md rounded-full grid place-items-center absolute bottom-0 right-1.5'>
								<Camera size={16} color='#000000' />
							</button>
						</div>

						<div className='w-fit text-center mx-auto mt-4'>
							<h2 className='text-xl font-semibold'>Rosemary Sunday</h2>
							<div className='text-center text-gray-600 flex items-center gap-2'>
								<p className='text-sm'>rosiesunday20.aj@gmail.com</p>
								<Copy size={16} color='#ACA0A9' />
							</div>
						</div>

						<div className='w-fit mx-auto text-center flex items-center gap-2 text-gray-600'>
							<p>Field Agent</p>
							<div className='size-2 bg-gray-200 rounded-full'></div>
							<p>Lagos, Nigeria</p>
						</div>

						<div className='mt-4 flex flex-col space-y-3'>
							<button type='button' onClick={openModal} className='flex justify-center bg-orange gap-2 text-white py-2 px-4 rounded-lg'>
								<Edit2 size={24} />
								Edit profile
							</button>
							<button className='text-orange flex justify-center gap-2 py-2 px-4 rounded-lg hover:bg-orange/80 hover:text-white transition duration-300 border border-orange'>
								<LogoutCurve size={24} />
								Logout
							</button>
						</div>
					</div>

					<section className='flex-grow w-full space-y-3'>
						<div className='bg-white border border-[#EAE6E9] rounded-lg'>
							<header className='px-5 py-3 border-b border-[#EAE6E9'>
								<h5 className='text-xl text-[#150A13] font-medium'>Basic Info</h5>
							</header>
							<section className='p-5 grid grid-cols-2 gap-4 text-sm'>
								<h6 className='text-[#5C4D58]'>Staff ID:</h6>
								<p className='text-[#150A13]'>DS12000000</p>
								<h6 className='text-[#5C4D58]'>Phone:</h6>
								<div className='flex items-center gap-2'>
									<p className='text-[#150A13]'>07056440321</p>
									<Copy size={16} color='#ACA0A9' />
								</div>
								<h6 className='text-[#5C4D58]'>Address:</h6>
								<p className='text-[#150A13]'>Lagos, Nigeria</p>
								<h6 className='text-[#5C4D58]'>Phone Number:</h6>
								<p className='text-[#150A13]'>0123456789</p>
							</section>
						</div>
						<div className='bg-white border border-[#EAE6E9] rounded-lg'>
							<header className='px-5 py-3 border-b border-[#EAE6E9'>
								<h5 className='text-xl text-[#150A13] font-medium'>Role</h5>
							</header>
							<section className='p-5 grid grid-cols-2 gap-4 text-sm'>
								<h6 className='text-[#5C4D58]'>User Type:</h6>
								<p className='text-[#150A13]'>Agent</p>
								<h6 className='text-[#5C4D58]'>Staff Type:</h6>
								<p className='text-[#150A13]'>Field Agent</p>
								<h6 className='text-[#5C4D58]'>Availability:</h6>
								<p className='text-[#150A13]'>Everyday</p>
							</section>
						</div>
						<div className='bg-white border border-[#EAE6E9] rounded-lg'>
							<header className='px-5 py-3 border-b border-[#EAE6E9'>
								<h5 className='text-xl text-[#150A13] font-medium'>Password</h5>
							</header>
							<section className='p-5 text-sm'>
								<div className='flex w-full items-end gap-4'>
									<div className='space-y-2 flex-grow'>
										<label htmlFor='password' className='text-gray-800 text-sm font-medium'>
											Password
										</label>
										<input type='password' id='password' placeholder='********' className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange' />
									</div>
									<button type='button' className='bg-orange whitespace-nowrap text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange'>
										Change password
									</button>
								</div>
							</section>
						</div>
					</section>
				</section>
			</section>
		</>
	);
}
