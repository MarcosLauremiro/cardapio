import { FaCircle } from "react-icons/fa";
import type { Category } from "../../types/category.type";

interface CardCategoryProps {
	handleOpenCategoryModal: (category: Category) => void;
}

export function CardCategory({ handleOpenCategoryModal }: CardCategoryProps) {
	const categorys: Category[] = [
		{
			id: "1",
			name: "Pizza",
			icon: "🍕",
			active: true,
		},
		{
			id: "2",
			name: "Sobremesa",
			icon: "🍩",
			active: true,
		},
		{
			id: "3",
			name: "Saladas",
			icon: "🥗",
			active: true,
		},
		{
			id: "4",
			name: "Bebidas",
			icon: "🍻",
			active: false,
		},
	];
	return (
		<ul className="flex items-center">
			{categorys.map((category) => (
				<div
					key={category.id}
					className={`flex items-center border rounded-2xl border-gray-200 shadow-lg p-4 hover:bg-gray-200 cursor-pointer duration-300 gap-2 ${
						!category.active ? "opacity-60" : ""
					}`}
					onClick={() => handleOpenCategoryModal(category)}
				>
					<h1 className="font-medium">{category.name}</h1>
					<span>{category.icon}</span>
					{!category.active && (
						<span className="ml-1" key={category.id}>
							<FaCircle size={10} className="text-red-500" />
						</span>
					)}
				</div>
			))}
		</ul>
	);
}
