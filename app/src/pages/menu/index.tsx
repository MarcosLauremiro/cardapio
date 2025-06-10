import { useState } from "react";
import type { Product } from "../../types/product.type";
import type { Category } from "../../types/category.type";
import { CategoryModal } from "../../components/ModalCategoryComponent";
import { ProductModal } from "../../components/ModalProductComponent";
import { CardCategory } from "../../components/CardCategoryComponent";
import { CardProduct } from "../../components/CardProductComponent";

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
				<CardCategory handleOpenCategoryModal={handleOpenCategoryModal} />
			</div>
			<div className="p-4 border-b border-gray-200"></div>
			<CardProduct handleOpenProductModal={handleOpenProductModal} />

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
