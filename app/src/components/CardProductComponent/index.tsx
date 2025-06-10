import type { Product } from "../../types/product.type";
import pizza from "../../assets/marguerita.png";
import { FaCircle } from "react-icons/fa";
import { formatPrice } from "../../utils/formatPrice";
import { BiEdit, BiPlus } from "react-icons/bi";
import { useGetProductsQuery } from "../../slices/product";

interface CardProductProps {
	handleOpenProductModal: (product?: Product) => void;
}

export function CardProduct({ handleOpenProductModal }: CardProductProps) {
	const { data: products = [], isLoading, isError } = useGetProductsQuery();

	if (isLoading) {
		return <p>Carregando categorias...</p>;
	}
	if (isError) {
		return <p>Ocorreu um erro ao carregar as categorias.</p>;
	}

	return (
		<div className="flex flex-col max-w-screen">
			<div className="flex justify-between py-4">
				<p className="text-[16px] font-medium">Produtos</p>
				<button
					className="bg-green-700 hover:bg-green-600 duration-300 text-white px-4 py-1 rounded-2xl flex items-center gap-1"
					onClick={() => handleOpenProductModal()}
				>
					<BiPlus size={20} />
					Novo produto
				</button>
			</div>
			<ul className="space-y-2">
				{products.map((product) => (
					<li
						key={product.id}
						className={`
            flex flex-col md:flex-row
            items-start md:items-center
            gap-4
            border rounded-2xl border-gray-200
            hover:bg-gray-100 cursor-pointer
            duration-300
            relative
            ${!product.active ? "opacity-60" : ""}
          `}
						onClick={() => handleOpenProductModal(product)}
					>
						<div className="w-full h-48 md:w-32 md:h-32 flex-shrink-0">
							<img
								src={pizza}
								alt={product.name}
								className="rounded-t-2xl md:rounded-l-2xl object-cover w-full h-full"
							/>
						</div>

						<div className="flex flex-col w-full p-4">
							<div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center">
								<div className="flex items-center gap-2">
									<h1 className="font-semibold text-lg capitalize">
										{product.name}
									</h1>
									{!product.active && (
										<span>
											<FaCircle size={10} className="text-red-500" />
										</span>
									)}
								</div>

								<div className="flex items-center gap-2 mt-2 sm:mt-0">
									<span className="font-semibold text-green-700">
										{formatPrice(product.price!)}
									</span>
									<BiEdit size={20} className="text-blue-600" />
								</div>
							</div>

							<p className="text-sm text-gray-700 mt-2 line-clamp-2">
								{product.description}
							</p>

							{product.ingredients && product.ingredients.length > 0 && (
								<div className="flex gap-1 flex-wrap mt-2">
									<span className="font-semibold text-sm">Ingredientes:</span>
									{product.ingredients.map((ingredient, index) => (
										<p key={index} className="text-sm text-gray-600">
											{ingredient.name}
											{index < product?.ingredients.length - 1 ? ", " : ""}
										</p>
									))}
								</div>
							)}

							<div className="mt-2">
								<span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
									{product.category}
								</span>
							</div>
						</div>

						{!product.active && (
							<div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
								Desativado
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
