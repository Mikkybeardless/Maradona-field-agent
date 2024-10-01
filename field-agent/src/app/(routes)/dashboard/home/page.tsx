export default function Page() {
	return (
		<section>
			<div className='mt-40'>
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
			</div>
		</section>
	);
}
