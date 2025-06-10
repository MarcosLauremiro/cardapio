import type { Pagination, Product } from "../../types/product.type";
import { FaCircle } from "react-icons/fa";
import { formatPrice } from "../../utils/formatPrice";
import { BiEdit, BiPlus, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useGetProductsQuery } from "../../slices/product";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import {
	listCategories,
	useGetProductsByCategoryQuery,
} from "../../slices/category";

interface CardProductProps {
	handleOpenProductModal: (product?: Product) => void;
}

export function CardProduct({ handleOpenProductModal }: CardProductProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

	const {
		data: allProductsResult,
		isLoading: isLoadingAllProducts,
		isError: isErrorAllProducts,
	} = useGetProductsQuery(
		{
			page: currentPage,
			limit: itemsPerPage,
		},
		{
			skip: !!selectedCategoryId,
		}
	);

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

	const categories = useAppSelector(listCategories);

	const isLoading = selectedCategoryId
		? isLoadingCategoryProducts
		: isLoadingAllProducts;

	const isError = selectedCategoryId
		? isErrorCategoryProducts
		: isErrorAllProducts;

	let products: Product[] = [];
	let pagination: Pagination | null = null;

	if (selectedCategoryId) {
		products = categoryProducts || [];
		pagination = {
			currentPage: 1,
			totalPages: 1,
			totalItems: products.length,
			itemsPerPage: products.length,
			hasNextPage: false,
			hasPrevPage: false,
		};
	} else {
		products = allProductsResult?.data || [];
		pagination = allProductsResult?.pagination ?? null;
	}

	const handleCategoryChange = (categoryId: string) => {
		setSelectedCategoryId(categoryId);
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleItemsPerPageChange = (limit: number) => {
		setItemsPerPage(limit);
		setCurrentPage(1);
	};

	const renderPaginationButtons = () => {
		if (!pagination || selectedCategoryId) return null;

		const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;
		const buttons = [];

		buttons.push(
			<button
				key="prev"
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={!hasPrevPage}
				className={`
					flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
					${
						hasPrevPage
							? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
							: "bg-gray-100 text-gray-400 cursor-not-allowed"
					}
				`}
			>
				<BiChevronLeft size={16} />
				Anterior
			</button>
		);

		const startPage = Math.max(1, currentPage - 2);
		const endPage = Math.min(totalPages, currentPage + 2);

		if (startPage > 1) {
			buttons.push(
				<button
					key={1}
					onClick={() => handlePageChange(1)}
					className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
				>
					1
				</button>
			);
			if (startPage > 2) {
				buttons.push(
					<span key="ellipsis1" className="px-2 text-gray-500">
						...
					</span>
				);
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={`
						px-3 py-2 rounded-lg text-sm font-medium
						${
							i === currentPage
								? "bg-green-700 text-white"
								: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
						}
					`}
				>
					{i}
				</button>
			);
		}

		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				buttons.push(
					<span key="ellipsis2" className="px-2 text-gray-500">
						...
					</span>
				);
			}
			buttons.push(
				<button
					key={totalPages}
					onClick={() => handlePageChange(totalPages)}
					className="px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
				>
					{totalPages}
				</button>
			);
		}

		buttons.push(
			<button
				key="next"
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={!hasNextPage}
				className={`
					flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
					${
						hasNextPage
							? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
							: "bg-gray-100 text-gray-400 cursor-not-allowed"
					}
				`}
			>
				Próximo
				<BiChevronRight size={16} />
			</button>
		);

		return buttons;
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-8">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
				<p className="ml-2">Carregando produtos...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="text-center py-8">
				<p className="text-red-500">Ocorreu um erro ao carregar os produtos.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col max-w-screen">
			<div className="flex justify-between py-4">
				<div className="flex items-center gap-4">
					<p className="text-[16px] font-medium">Produtos</p>
					{pagination && (
						<p className="text-sm text-gray-600">
							{pagination.totalItems} produtos encontrados
						</p>
					)}
					<select
						value={selectedCategoryId}
						onChange={(e) => handleCategoryChange(e.target.value)}
						className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
					>
						<option value="">Todas as categorias</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.icon} {category.name}
							</option>
						))}
					</select>
				</div>
				<button
					className="bg-green-700 hover:bg-green-600 duration-300 text-white px-4 py-1 rounded-2xl flex items-center gap-1"
					onClick={() => handleOpenProductModal()}
				>
					<BiPlus size={20} />
					Novo produto
				</button>
			</div>

			{/* Controle de itens por página - só mostrar se não houver filtro por categoria */}
			{!selectedCategoryId && (
				<div className="flex justify-between items-center mb-4">
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-600">Mostrar:</span>
						<select
							value={itemsPerPage}
							onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
							className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>
						<span className="text-sm text-gray-600">por página</span>
					</div>

					{pagination && (
						<div className="text-sm text-gray-600">
							Página {pagination.currentPage} de {pagination.totalPages}
						</div>
					)}
				</div>
			)}

			{products.length === 0 ? (
				<div className="text-center py-8">
					<p className="text-gray-500">
						{selectedCategoryId
							? "Nenhum produto encontrado nesta categoria."
							: "Nenhum produto encontrado."}
					</p>
				</div>
			) : (
				<>
					<ul className="space-y-2">
						{products.map((product) => (
							<li
								key={product._id}
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
										src={product.imagePath}
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
											<span className="font-semibold text-sm">
												Ingredientes:
											</span>
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

					{/* Paginação - só mostrar se não houver filtro por categoria */}
					{!selectedCategoryId && pagination && pagination.totalPages > 1 && (
						<div className="flex justify-center items-center gap-2 mt-6 py-4">
							{renderPaginationButtons()}
						</div>
					)}

					{/* Informações da paginação */}
					{pagination && (
						<div className="text-center text-sm text-gray-600 mt-4">
							{selectedCategoryId ? (
								`${products.length} produtos encontrados nesta categoria`
							) : (
								<>
									Mostrando{" "}
									{(pagination.currentPage - 1) * pagination.itemsPerPage + 1} -{" "}
									{Math.min(
										pagination.currentPage * pagination.itemsPerPage,
										pagination.totalItems
									)}{" "}
									de {pagination.totalItems} produtos
								</>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
}
