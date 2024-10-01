import { InspectionRequestsTable } from '@/app/_components/inspection-requests-table/inspection-requests-table';
import { ArrowDown2, Edit2, SearchNormal1 } from 'iconsax-react';

export default function Page() {
	return (
		<section>
			<header className='mt-40 flex items-end justify-between mb-32'>
				<div className='space-y-2.5'>
					<p className='text-3xl font-semibold'>
						Welcome, <span className='text-lg font-normal'>Rosemary Sunday</span>
					</p>
					<div className='flex items-center gap-2'>
						<p className='text-[#5C4D58] text-xs'>
							Last login: <span className='text-[#150A13]'>Sept 25, 2024</span>
						</p>
						<div className='size-[2px] bg-green-950'></div>
						<p className='text-xs'>12:30pm</p>
					</div>
					<div className='flex items-center gap-2'>
						<p className='px-2 rounded-full py-1 text-sm text-[#4A1E11] bg-[#FCDFD7]'>Agent</p>
						<p className='px-2 rounded-full py-1 text-sm text-[#008000] bg-[#E8F7E8]'>Active</p>
						<p className='px-2 rounded-full py-1 text-sm text-[#68305B] bg-[#F2E8F0]'>Online</p>
					</div>
				</div>
				<button type='button' className='rounded-md px-5 py-2 flex items-center gap-2 bg-orange text-white'>
					<Edit2 size={24} />
					Edit
				</button>
			</header>
			<section className='mb-16'>
				<h6 className='text-black font-medium mb-5'>Overview Statistics</h6>
				<div className='w-full px-10 py-7 bg-white rounded-lg'>
					<div className='w-fit mx-auto flex items-center *:text-center *:px-12'>
						<div className='space-y-3 text-orange border-r border-light-grey'>
							<h6 className='text-sm'>
								Total Inspections Completed
							</h6>
							<p className='text-lg'>230</p>
						</div>
						<div className='space-y-3 text-[#A6A619] border-r border-light-grey'>
							<h6 className='text-sm'>
								Pending Inspections
							</h6>
							<p className='text-lg'>53</p>
						</div>
						<div className='space-y-3 text-[#008000] border-r border-light-grey'>
							<h6 className='text-sm'>
								Upcoming Inspections
							</h6>
							<p className='text-lg'>530</p>
						</div>
						<div className='space-y-3 text-[#121488]'>
							<h6 className='text-sm'>
								Recent Verifications
							</h6>
							<p className='text-lg'>1,200</p>
						</div>

					</div>
				</div>
			</section>
			<section>
				<h6 className='text-black font-medium mb-5'>Inspection Requests</h6>
				<div className='bg-white rounded-lg p-6'>
					<header className='w-full flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<button className='text-sm px-4 py-2 border border-grey/40 rounded-lg flex items-center gap-2'>
								Pending
								<ArrowDown2 size={16} />
							</button>
							<button className='text-sm px-4 py-2 border border-grey/40 rounded-lg flex items-center gap-2'>
								Completed
								<ArrowDown2 size={16} />
							</button>
							<button className='text-sm px-4 py-2 border border-grey/40 rounded-lg flex items-center gap-2'>
								Upcoming
								<ArrowDown2 size={16} />
							</button>
						</div>
						<div className='flex items-center gap-2.5 w-[18.75rem] border border-grey/70 rounded-lg px-4 py-2'>
							<SearchNormal1 size={20} />
							<input type='search' className='w-full text-sm' placeholder='Search agents' />
						</div>
					</header>
					<InspectionRequestsTable />
				</div>
			</section>
		</section>
	);
}
