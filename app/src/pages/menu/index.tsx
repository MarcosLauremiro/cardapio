import { useState } from "react";
import type { Product } from "../../types/product.type";
import type { Category } from "../../types/category.type";
import { CategoryModal } from "../../components/ModalCategoryComponent";
import { ProductModal } from "../../components/ModalProductComponent";
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
			<CardProduct
				handleOpenProductModal={handleOpenProductModal}
				handleOpenCategoryModal={handleOpenCategoryModal}
			/>

			{showProductModal && (
				<ProductModal
					editingProduct={editingProduct}
					setShowProductModalClose={handleCloseProductModal}
					handleOpenCategoryModal={handleOpenCategoryModal}
				/>
			)}

			{showCategoryModal && (
				<CategoryModal
					editingCategory={editingCategory}
					setShowCategoryModalClose={handleCloseCategoryModal}
				/>
			)}
		</>
	);
};
