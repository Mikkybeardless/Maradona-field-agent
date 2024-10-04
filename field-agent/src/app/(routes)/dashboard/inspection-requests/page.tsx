import { DashboardProfileNav } from '@/app/_components/dashboard-profile-nav/dashboard-profile-nav';
import { InspectionRequestsTable } from '@/app/_components/inspection-requests-table/inspection-requests-table';
import { ArrowRight2, ArrowDown2, SearchNormal1 } from 'iconsax-react';
import Link from 'next/link';

export default function Page() {
	return (
		<>
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
				</div>
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
								<input type='search' className='w-full text-sm outline-none' placeholder='Search agents' />
							</div>
						</header>
						<InspectionRequestsTable />
					</div>
				</section>
			</section>
		</>
	);
}
