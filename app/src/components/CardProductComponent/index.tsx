import type { Product } from "../../types/product.type";
import {
	FaCircle,
	FaEdit,
	FaPlus,
	FaEye,
	FaEyeSlash,
	FaSearch,
	FaTimes,
} from "react-icons/fa";
import { formatPrice } from "../../utils/formatPrice";
import { useGetProductsQuery } from "../../slices/product";
import { useCallback, useMemo, useState } from "react";
import {
	useGetCategoriesQuery,
	useGetProductsByCategoryQuery,
} from "../../slices/category";
import type { Category } from "../../types/category.type";

interface CardProductProps {
	handleOpenProductModal: (product?: Product) => void;
	handleOpenCategoryModal: (category?: Category) => void;
}

export function CardProduct({
	handleOpenProductModal,
	handleOpenCategoryModal,
}: CardProductProps) {
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState<string>("");

	const {
		data: allProducts,
		isLoading: isLoadingAllProducts,
		isError: isErrorAllProducts,
	} = useGetProductsQuery();

	const {
		data: categoryProducts,
		isLoading: isLoadingCategoryProducts,
		isError: isErrorCategoryProducts,
	} = useGetProductsByCategoryQuery(
		{ id: selectedCategoryId },
		{
			skip: !selectedCategoryId,
		}
	);

	const { data: categories = [] } = useGetCategoriesQuery();

	// Função para filtrar produtos por busca
	const filterProductsBySearch = useCallback(
		(products: Product[], term: string) => {
			if (!term.trim()) return products;

			const searchLower = term.toLowerCase().trim();

			return products.filter((product) => {
				// Busca por nome do produto
				const nameMatch = product?.name
					? product.name.toLowerCase().includes(searchLower)
					: false;

				// Busca por ingredientes
				const ingredientsMatch = product.ingredients?.some((ingredient) =>
					ingredient.name.toLowerCase().includes(searchLower)
				);

				// Busca por categoria
				const category = categories.find((cat) => cat._id === product.category);
				const categoryMatch = category?.name
					.toLowerCase()
					.includes(searchLower);

				return nameMatch || ingredientsMatch || categoryMatch;
			});
		},
		[categories]
	);

	const products = useMemo(() => {
		let baseProducts = [];

		if (selectedCategoryId && categoryProducts) {
			baseProducts = categoryProducts;
		} else {
			baseProducts = allProducts || [];
		}

		// Aplica o filtro de busca
		return filterProductsBySearch(baseProducts, searchTerm);
	}, [
		selectedCategoryId,
		categoryProducts,
		allProducts,
		searchTerm,
		filterProductsBySearch,
	]);

	const handleNewProduct = useCallback(() => {
		handleOpenProductModal();
	}, [handleOpenProductModal]);

	const hadleNewCategory = useCallback(() => {
		handleOpenCategoryModal();
	}, [handleOpenCategoryModal]);

	const handleCategoryChange = useCallback((categoryId: string) => {
		setSelectedCategoryId(categoryId);
	}, []);

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value);
		},
		[]
	);

	const clearSearch = useCallback(() => {
		setSearchTerm("");
	}, []);

	const clearAllFilters = useCallback(() => {
		setSearchTerm("");
		setSelectedCategoryId("");
	}, []);

	const isLoading = useMemo(() => {
		return selectedCategoryId
			? isLoadingCategoryProducts
			: isLoadingAllProducts;
	}, [selectedCategoryId, isLoadingCategoryProducts, isLoadingAllProducts]);

	const isError = useMemo(() => {
		return selectedCategoryId ? isErrorCategoryProducts : isErrorAllProducts;
	}, [selectedCategoryId, isErrorCategoryProducts, isErrorAllProducts]);

	// Contadores para exibir resultados
	const totalProducts = useMemo(() => {
		if (selectedCategoryId && categoryProducts) {
			return categoryProducts.length;
		}
		return allProducts?.length || 0;
	}, [selectedCategoryId, categoryProducts, allProducts]);

	const filteredCount = products?.length || 0;
	const hasActiveFilters = searchTerm.trim() || selectedCategoryId;

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center py-16 space-y-4">
				<div className="relative">
					<div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-emerald-600"></div>
					<div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-emerald-400"></div>
				</div>
				<p className="text-gray-600 font-medium">
					Carregando produtos deliciosos...
				</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center py-16 space-y-4">
				<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
					<FaCircle className="w-8 h-8 text-red-500" />
				</div>
				<div className="text-center">
					<p className="text-red-600 font-semibold text-lg">
						Ops! Algo deu errado
					</p>
					<p className="text-gray-600">
						Não foi possível carregar os produtos. Tente novamente.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Header */}
			<div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 mb-8 shadow-lg">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
					<div>
						<h1 className="text-2xl font-bold text-white mb-2">
							Gerenciar Cardápio
						</h1>
						<p className="text-emerald-100">
							Organize e edite os produtos do seu restaurante
						</p>
					</div>
					<button
						className="bg-white hover:bg-gray-50 text-emerald-700 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
						onClick={handleNewProduct}
					>
						<FaPlus className="w-4 h-4" />
						Novo Produto
					</button>
				</div>
			</div>

			{/* Barra de Pesquisa */}
			<div className="mb-8">
				<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
					<h2 className="text-lg font-semibold text-gray-800">
						Buscar produtos
					</h2>
					{hasActiveFilters && (
						<button
							onClick={clearAllFilters}
							className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors duration-200"
						>
							Limpar todos os filtros
						</button>
					)}
				</div>

				<div className="relative max-w-md">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<FaSearch className="h-4 w-4 text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Buscar por nome, ingrediente ou categoria..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
					/>
					{searchTerm && (
						<button
							onClick={clearSearch}
							className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors duration-200"
						>
							<FaTimes className="h-4 w-4 text-gray-400" />
						</button>
					)}
				</div>

				{/* Contador de resultados */}
				<div className="mt-3 text-sm text-gray-600">
					{searchTerm.trim() ? (
						<span>
							Mostrando <strong>{filteredCount}</strong> de{" "}
							<strong>{totalProducts}</strong> produtos
							{searchTerm && (
								<span>
									{" "}
									para "<strong>{searchTerm}</strong>"
								</span>
							)}
						</span>
					) : (
						<span>
							<strong>{totalProducts}</strong> produtos{" "}
							{selectedCategoryId ? "nesta categoria" : "no total"}
						</span>
					)}
				</div>
			</div>

			{/* Filtros de Categoria */}
			<div className="mb-8">
				<h2 className="text-lg font-semibold text-gray-800 mb-4">
					Filtrar por categoria
				</h2>
				<div className="flex flex-wrap gap-3">
					<button
						className="rounded-full border border-gray-400 w-10 h-10 flex items-center justify-center hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200"
						onClick={hadleNewCategory}
						title="Adicionar nova categoria"
					>
						<FaPlus className="text-gray-600" size={22} />
					</button>
					<button
						onClick={() => handleCategoryChange("")}
						className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
							selectedCategoryId === ""
								? "bg-emerald-600 text-white shadow-md"
								: "bg-gray-100 text-gray-700 hover:bg-gray-200"
						}`}
					>
						🍽️ Todas as categorias
					</button>
					{categories.map((category) => (
						<button
							key={category._id}
							onClick={() => handleCategoryChange(category._id)}
							className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
								selectedCategoryId === category._id
									? "bg-emerald-600 text-white shadow-md"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{category.icon} {category.name}
						</button>
					))}
				</div>
			</div>

			{/* Grid de Produtos */}
			{products && products.length > 0 ? (
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
					{products.map((product) => (
						<div
							key={product._id}
							className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 ${
								!product.active ? "opacity-75" : ""
							}`}
							onClick={() => handleOpenProductModal(product)}
						>
							<div className="relative h-48 overflow-hidden">
								<img
									src={product.imagePath}
									alt={product.name}
									className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
									onError={(e) => {
										e.currentTarget.src = "/placeholder-food.jpg";
									}}
								/>
								<div className="absolute top-3 left-3">
									{product.active ? (
										<span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
											<FaEye className="w-3 h-3" />
											Disponível
										</span>
									) : (
										<span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
											<FaEyeSlash className="w-3 h-3" />
											Indisponível
										</span>
									)}
								</div>

								<div className="absolute top-3 right-3">
									<button
										className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
										onClick={(e) => {
											e.stopPropagation();
											handleOpenProductModal(product);
										}}
									>
										<FaEdit className="w-4 h-4" />
									</button>
								</div>

								<div className="absolute bottom-3 right-3">
									<span className="bg-emerald-600 text-white px-3 py-1 rounded-full font-bold text-lg">
										{formatPrice(product.price!)}
									</span>
								</div>
							</div>

							<div className="p-5">
								<div className="flex items-start justify-between mb-3">
									<h3 className="text-xl font-bold text-gray-800 capitalize leading-tight">
										{product.name}
									</h3>
								</div>

								<p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
									{product.description}
								</p>

								{product.ingredients && product.ingredients.length > 0 && (
									<div className="mb-4">
										<p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
											Ingredientes
										</p>
										<div className="flex flex-wrap gap-1">
											{product.ingredients
												.slice(0, 3)
												.map((ingredient, index) => (
													<span
														key={index}
														className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
													>
														{ingredient.name}
													</span>
												))}
											{product.ingredients.length > 3 && (
												<span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs">
													+{product.ingredients.length - 3} mais
												</span>
											)}
										</div>
									</div>
								)}

								<div className="flex items-center justify-between">
									<span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
										{
											categories.find(
												(category) => category._id === product.category
											)?.name
										}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-16">
					<div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
						{hasActiveFilters ? (
							<FaSearch className="w-8 h-8 text-gray-400" />
						) : (
							<FaPlus className="w-8 h-8 text-gray-400" />
						)}
					</div>
					<h3 className="text-xl font-semibold text-gray-800 mb-2">
						{hasActiveFilters
							? "Nenhum produto encontrado"
							: "Nenhum produto encontrado"}
					</h3>
					<p className="text-gray-600 mb-6">
						{hasActiveFilters ? (
							<>
								Não encontramos produtos que correspondam aos seus filtros.
								<br />
								Tente ajustar os termos de busca ou categoria.
							</>
						) : selectedCategoryId ? (
							"Não há produtos nesta categoria. Que tal adicionar alguns?"
						) : (
							"Comece adicionando seus primeiros produtos ao cardápio!"
						)}
					</p>
					{hasActiveFilters ? (
						<button
							className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition-all duration-200 mb-4"
							onClick={clearAllFilters}
						>
							<FaTimes className="w-4 h-4" />
							Limpar Filtros
						</button>
					) : null}
					<button
						className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition-all duration-200"
						onClick={handleNewProduct}
					>
						<FaPlus className="w-4 h-4" />
						Adicionar Produto
					</button>
				</div>
			)}
		</div>
	);
}
