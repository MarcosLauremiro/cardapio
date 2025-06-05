import { FaCircle } from "react-icons/fa";
import type { Category } from "../../types/category.type";
import { useGetCategoriesQuery } from "../../slices/category";

interface CardCategoryProps {
	handleOpenCategoryModal: (category: Category) => void;
}

export function CardCategory({ handleOpenCategoryModal }: CardCategoryProps) {
	const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

	console.log(useGetCategoriesQuery());

	if (isLoading) {
		return <p>Carregando categorias...</p>;
	}
	if (isError) {
		return <p>Ocorreu um erro ao carregar as categorias.</p>;
	}

	return (
		<ul className="flex items-center gap-4">
			{categories.map((category) => (
				<li
					key={category.id}
					className={`flex items-center border rounded-2xl border-gray-200 shadow-lg p-4 hover:bg-gray-200 cursor-pointer duration-300 gap-2 ${
						!category.isActive ? "opacity-60" : ""
					}`}
					onClick={() => handleOpenCategoryModal(category)}
				>
					<h1>{category.name}</h1>
					<span>{category.icon}</span>
					{!category.isActive && (
						<span className="ml-1">
							<FaCircle size={10} className="text-red-500" />
						</span>
					)}
				</li>
			))}
		</ul>
	);
}
