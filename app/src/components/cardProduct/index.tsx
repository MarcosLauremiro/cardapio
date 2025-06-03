import type { Product } from "../../types/product.type";
import pizza from "../../assets/marguerita.png";
import { FaCircle } from "react-icons/fa";
import { formatPrice } from "../../utils/formatPrice";
import { BiEdit } from "react-icons/bi";

interface CardProductProps {
	handleOpenProductModal: (product: Product) => void;
}

export function CardProduct({ handleOpenProductModal }: CardProductProps) {
	const products: Product[] = [
		{
			name: "Pizza de Calabresa",
			active: true,
			description: "Pizza de calabresa com queijo",
			ingredients: [
				{
					name: "Calabresa",
					icon: "🍕",
				},
				{
					name: "Queijo",
					icon: "🧀",
				},
				{
					name: "Molho de tomate",
					icon: "🍅",
				},
			],
			category: "Pizza",
			imagePath: "image",
			price: 200,
			establishment: "casa",
			id: "1",
		},
		{
			name: "Pizza Margherita",
			active: false,
			description:
				"Pizza tradicional italiana com tomate, muçarela e manjericão",
			ingredients: [
				{
					name: "Muçarela",
					icon: "🧀",
				},
				{
					name: "Tomate",
					icon: "🍅",
				},
				{
					name: "Manjericão",
					icon: "🌿",
				},
			],
			category: "Pizza",
			imagePath: "image",
			price: 180,
			establishment: "casa",
			id: "2",
		},
		{
			name: "Refrigerante Cola",
			active: true,
			description: "Refrigerante de cola gelado 350ml",
			ingredients: [],
			category: "Bebidas",
			imagePath: "image",
			price: 50,
			establishment: "casa",
			id: "3",
		},
	];

	return (
		<ul className="space-y-4">
			{products.map((product) => (
				<li
					key={product.id}
					className={`flex items-center gap-4 border rounded-2xl border-gray-200 hover:bg-gray-100 cursor-pointer duration-300 relative ${
						!product.active ? "opacity-60" : ""
					}`}
					onClick={() => handleOpenProductModal(product)}
				>
					<div className="w-32 h-37">
						<img
							src={pizza}
							alt={product.name}
							className="rounded-l-2xl object-cover w-full h-full"
						/>
					</div>

					<div className="flex flex-col w-full p-4">
						<div className="flex justify-between w-full items-center">
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
							<div className="flex items-center gap-2">
								<span className="font-semibold text-green-700">
									{formatPrice(product.price!)}
								</span>
								<BiEdit size={20} className="text-blue-600" />
							</div>
						</div>

						<p className="text-[14px] text-gray-700 mt-1">
							{product.description}
						</p>
						{product.ingredients && product.ingredients.length > 0 && (
							<div className="flex gap-1 flex-wrap mt-2">
								<span className="font-semibold text-[13px]">Ingredientes:</span>
								{product.ingredients.map((ingredient, index) => (
									<p key={index} className="text-[13px] text-gray-600">
										{ingredient.name}
										{index < product.ingredients!.length - 1 ? "," : ""}
									</p>
								))}
							</div>
						)}
						<div className="mt-2">
							<span className="text-[12px] bg-gray-200 px-2 py-1 rounded-full">
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
	);
}
