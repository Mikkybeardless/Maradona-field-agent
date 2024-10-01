'use client'

import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useState } from "react";

export const InspectionRequestsTable = () => {
	const requests = [
		{ id: 1, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 2, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 3, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 4, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Pending" },
		{ id: 5, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Pending" },
		{ id: 6, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Pending" },
		{ id: 7, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Completed" },
		{ id: 8, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Completed" },
		{ id: 9, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Completed" },
		{ id: 10, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 11, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 12, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 13, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 14, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Pending" },
		{ id: 15, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Pending" },
		{ id: 16, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Pending" },
		{ id: 17, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Completed" },
		{ id: 18, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Completed" },
		{ id: 19, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Completed" },
		{ id: 20, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 21, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 22, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 23, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Active" },
		{ id: 24, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Pending" },
		{ id: 25, requestId: "1234DSFA", itemName: "2 bedroom duplex in Maitama", category: "House", date: "July 1st, 2024 | 2pm", status: "Pending" },
	];

	// Pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	// Logic for displaying current items
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const getStatusClass = (status: string) => {
		switch (status) {
			case "Active":
				return "text-red-500";
			case "Pending":
				return "text-yellow-500";
			case "Completed":
				return "text-green-500";
			default:
				return "";
		}
	};
	// Total number of pages
	const totalPages = Math.ceil(requests.length / itemsPerPage);

	return (
		<div className="container mx-auto p-4">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-100">
					<tr>
						<th className="py-2 px-4">No Request ID</th>
						<th className="py-2 px-4">Item Name</th>
						<th className="py-2 px-4">Category</th>
						<th className="py-2 px-4">Request Date</th>
						<th className="py-2 px-4">Status</th>
						<th className="py-2 px-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentItems.map((request) => (
						<tr key={request.id}>
							<td className="py-4 px-4 border-b">{request.requestId}</td>
							<td className="py-2 px-4 border-b">{request.itemName}</td>
							<td className="py-2 px-4 border-b">{request.category}</td>
							<td className="py-2 px-4 border-b">{request.date}</td>
							<td className={`py-2 px-4 border-b ${getStatusClass(request.status)}`}>
								{request.status}
							</td>
							<td className="py-2 px-4 border-b">
								<a href="#" className="text-blue-500 hover:underline">
									View
								</a>{" "}
								|{" "}
								<a href="#" className="text-yellow-500 hover:underline">
									Mark as completed
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className="flex justify-between items-center mt-4">
				<div className="text-sm text-gray-700">
					Showing {indexOfFirstItem + 1} - {indexOfLastItem} of {requests.length}
				</div>
				<div className="flex items-center space-x-6">
					{/* Previous Button */}
					<button
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
						className={`px-3 py-3 rounded-lg border ${currentPage === 1 ? "opacity-70 border-grey/50 " : "border-orange text-black"}`}
					>
						<ArrowLeft2 size={14} />
					</button>
					{/* Page Numbers */}
					<div className="flex items-center gap-3">
						{[...Array(totalPages)].map((_, i) => (
							<button
								key={i}
								onClick={() => paginate(i + 1)}
								className={`size-8 grid place-items-center rounded-full ${currentPage === i + 1
									? "bg-orange text-white"
									: "hover:bg-gray-100"
									}`}
							>
								{i + 1}
							</button>
						))}
					</div>
					{/* Next Button */}
					<button
						onClick={() => paginate(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={`px-3 py-3 rounded-lg border ${currentPage === totalPages ? "opacity-70 border-grey/50 " : "border-orange text-black"}`}
					>
						<ArrowRight2 size={14} />
					</button>
				</div>
			</div>
		</div>
	);
}
