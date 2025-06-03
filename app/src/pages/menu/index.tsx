import { BiPlus, BiEdit } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";
import { useState } from "react";
import type { Product } from "../../types/product.type";
import type { Category } from "../../types/category.type"
import pizza from "../../assets/marguerita.png";
import { formatPrice } from "../../utils/formatPrice";

export const Menu = () => {
	const [showProductModal, setShowProductModal] = useState(false);
	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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
			description: "Pizza tradicional italiana com tomate, muçarela e manjericão",
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

	const handleOpenProductModal = (product?: Product) => {
		if (product) {
			setEditingProduct(product);
		} else {
			setEditingProduct(null);
		}
		setShowProductModal(true);
	};

	const handleOpenCategoryModal = (category?: Category) => {
		if (category) {
			setEditingCategory(category);
		} else {
			setEditingCategory(null);
		}
		setShowCategoryModal(true);
	};

	return (
		<>
			<div className="flex flex-wrap gap-4 mb-6">
				<div
					className="flex items-center border rounded-2xl border-gray-200 shadow-lg p-4 hover:bg-gray-200 cursor-pointer duration-300"
					onClick={() => handleOpenCategoryModal()}
				>
					<span>
						<BiPlus size={35} className="text-green-600" />
					</span>
				</div>
				{categorys.map((category) => (
					<div
						key={category.id}
						className={`flex items-center border rounded-2xl border-gray-200 shadow-lg p-4 hover:bg-gray-200 cursor-pointer duration-300 gap-2 ${!category.active ? 'opacity-60' : ''}`}
						onClick={() => handleOpenCategoryModal(category)}
					>
						<h1 className="font-medium">{category.name}</h1>
						<span>{category.icon}</span>
						{!category.active && (
							<span className="ml-1">
								<FaCircle size={10} className="text-red-500" />
							</span>
						)}
					</div>
				))}
			</div>
			<div className="p-4 border-b border-gray-200"></div>
			<div>
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
				<ul className="space-y-4">
					{products.map((product) => (
						<li
							key={product.id}
							className={`flex items-center gap-4 border rounded-2xl border-gray-200 hover:bg-gray-100 cursor-pointer duration-300 relative ${!product.active ? 'opacity-60' : ''}`}
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
										<h1 className="font-semibold text-lg capitalize">{product.name}</h1>
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

								<p className="text-[14px] text-gray-700 mt-1">{product.description}</p>
								{product.ingredients && product.ingredients.length > 0 && (
									<div className="flex gap-1 flex-wrap mt-2">
										<span className="font-semibold text-[13px]">
											Ingredientes:
										</span>
										{product.ingredients.map((ingredient, index) => (
											<p key={index} className="text-[13px] text-gray-600">
												{ingredient.name}{index < product.ingredients!.length - 1 ? ',' : ''}
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
			</div>

			{/* Modal de Produto */}
			{showProductModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-2xl">
						<h2 className="text-xl font-bold mb-4">
							{editingProduct ? 'Editar Produto' : 'Novo Produto'}
						</h2>
						<form className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Nome</label>
								<input
									type="text"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
									defaultValue={editingProduct?.name || ''}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Descrição</label>
								<textarea
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
									rows={3}
									defaultValue={editingProduct?.description || ''}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
									<input
										type="number"
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
										defaultValue={editingProduct?.price || ''}
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">Categoria</label>
									<select
										className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
										defaultValue={editingProduct?.category || ''}
									>
										{categorys.map(category => (
											<option key={category.id} value={category.name}>{category.name}</option>
										))}
									</select>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Imagem</label>
								<div className="mt-1 flex items-center">
									<span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
										{editingProduct ? (
											<img src={pizza} alt="Preview" className="h-full w-full object-cover" />
										) : (
											<svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
												<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
											</svg>
										)}
									</span>
									<button
										type="button"
										className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
									>
										Alterar
									</button>
								</div>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
									defaultChecked={editingProduct?.active ?? true}
								/>
								<label className="ml-2 block text-sm text-gray-900">
									Produto ativo
								</label>
							</div>
							<div className="flex justify-end gap-2 pt-4">
								<button
									type="button"
									className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
									onClick={() => setShowProductModal(false)}
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600"
								>
									{editingProduct ? 'Atualizar' : 'Criar'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Modal de Categoria */}
			{showCategoryModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<h2 className="text-xl font-bold mb-4">
							{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
						</h2>
						<form className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">Nome</label>
								<input
									type="text"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
									defaultValue={editingCategory?.name || ''}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">Ícone</label>
								<div className="mt-1 grid grid-cols-8 gap-2">
									{['🍕', '🍔', '🍟', '🌭', '🍗', '🥗', '🍰', '🍦', '🍩', '🍺', '🍷', '🍹', '🥤', '🧃', '🍵', '☕'].map((icon) => (
										<button
											key={icon}
											type="button"
											className={`h-10 w-10 flex items-center justify-center text-xl border rounded-md ${editingCategory?.icon === icon ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:bg-gray-50'}`}
										>
											{icon}
										</button>
									))}
								</div>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
									defaultChecked={editingCategory?.active ?? true}
								/>
								<label className="ml-2 block text-sm text-gray-900">
									Categoria ativa
								</label>
							</div>
							<div className="flex justify-end gap-2 pt-4">
								<button
									type="button"
									className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
									onClick={() => setShowCategoryModal(false)}
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600"
								>
									{editingCategory ? 'Atualizar' : 'Criar'}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
