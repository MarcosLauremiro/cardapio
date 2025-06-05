import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import type { Product } from "../../types/product.type";
import type { Category } from "../../types/category.type";
import { CategoryModal } from "../../components/categoryModal";
import { ProductModal } from "../../components/productModal";
import { CardCategory } from "../../components/cardCategory";
import { CardProduct } from "../../components/cardProduct";

export const Menu = () => {
	const [showProductModal, setShowProductModal] = useState(false);
	const [showCategoryModal, setShowCategoryModal] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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

	const handleCloseCategoryModal = () => {
		setShowCategoryModal(false);
	};

	const handleCloseProductModal = () => {
		setShowProductModal(false);
	};

	return (
		<>
			<div className="flex flex-wrap gap-4 mb-6">
				<div
					className="flex items-center border rounded-2xl border-gray-200 shadow-lg p-4 hover:bg-gray-200 cursor-pointer duration-300"
					onClick={() => handleOpenCategoryModal()}
				>
					<span>
						<BiPlus size={27} className="text-green-600" />
					</span>
				</div>
				<CardCategory handleOpenCategoryModal={handleOpenCategoryModal} />
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
				<CardProduct handleOpenProductModal={handleOpenProductModal} />
			</div>

			{/* Modal de Produto */}
			{showProductModal && (
				<ProductModal
					editingProduct={editingProduct}
					setShowProductModalClose={handleCloseProductModal}
				/>
			)}

			{/* Modal de Categoria */}
			{showCategoryModal && (
				<CategoryModal
					editingCategory={editingCategory}
					setShowCategoryModalClose={handleCloseCategoryModal}
				/>
			)}
		</>
	);
};
