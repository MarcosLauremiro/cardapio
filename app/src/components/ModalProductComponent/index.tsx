import type { Product } from "../../types/product.type";
import { listCategories } from "../../slices/category";
import { useState, type FormEvent, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import {
	useCreateProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
} from "../../slices/product";
import { useAppSelector } from "../../store/hooks";
import { FaRegTrashAlt, FaPlus, FaTimes } from "react-icons/fa";

interface ProductModalProps {
	editingProduct: Product | null;
	setShowProductModalClose: () => void;
}

export interface Ingredients {
	name: string;
	icon: string;
}

type ProductFormState = Omit<Product, "imagePath"> & {
	imageFile?: File;
	imagePath?: string;
};

export const ProductModal = ({
	editingProduct,
	setShowProductModalClose,
}: ProductModalProps) => {
	const [product, setProduct] = useState<ProductFormState>({
		name: editingProduct?.name || "",
		description: editingProduct?.description || "",
		price: editingProduct?.price || 0,
		ingredients: editingProduct?.ingredients || [],
		category: editingProduct?.category || "",
		establishment: editingProduct?.establishment || "",
		active: editingProduct?.active ?? true,
		_id: editingProduct?._id,
		imagePath: editingProduct?.imagePath || "",
	});
	const [preview, setPreview] = useState<string>(
		editingProduct?.imagePath || ""
	);
	const [submitting, setSubmitting] = useState(false);

	// Estados para o formulário de ingredientes
	const [newIngredient, setNewIngredient] = useState<Ingredients>({
		name: "",
		icon: "",
	});

	const categories = useAppSelector(listCategories);
	const [createProduct] = useCreateProductMutation();
	const [updateProduct] = useUpdateProductMutation();
	const [deleteProduct] = useDeleteProductMutation();

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target;
		if (type === "file") {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				setProduct((prev) => ({ ...prev, imageFile: file }));
				setPreview(URL.createObjectURL(file));
			}
		} else {
			setProduct((prev) => ({
				...prev,
				[name]:
					type === "checkbox"
						? (e.target as HTMLInputElement).checked
						: type === "number"
						? Number(value)
						: value,
			}));
		}
	};

	// Função para adicionar ingrediente
	const handleAddIngredient = () => {
		if (!newIngredient.name.trim()) {
			toast.error("Por favor, informe o nome do ingrediente");
			return;
		}

		const ingredient: Ingredients = {
			name: newIngredient.name.trim(),
			icon: newIngredient.icon.trim() || "🥄",
		};

		setProduct((prev) => ({
			...prev,
			ingredients: [...(prev.ingredients || []), ingredient],
		}));

		// Limpar o formulário
		setNewIngredient({ name: "", icon: "" });
	};

	// Função para remover ingrediente
	const handleRemoveIngredient = (index: number) => {
		setProduct((prev) => ({
			...prev,
			ingredients: prev.ingredients?.filter((_, i) => i !== index) || [],
		}));
	};

	const handleIngredientChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: keyof Ingredients
	) => {
		setNewIngredient((prev) => ({
			...prev,
			[field]: e.target.value,
		}));
	};

	const handleDeleteProduct = async () => {
		console.log("establi id", editingProduct);
		await deleteProduct({ id: editingProduct?._id as string });
		setShowProductModalClose();
	};

	const buildFormData = () => {
		const formData = new FormData();
		formData.append("name", product.name ?? "");
		formData.append("description", product.description ?? "");
		formData.append("price", (product.price ?? 0).toString());

		if (product.ingredients && product.ingredients.length > 0) {
			formData.append("ingredients", JSON.stringify(product.ingredients));
		}

		formData.append("category", product.category ?? "");
		formData.append("establishment", product.establishment ?? "");
		formData.append("active", product.active ? "true" : "false");
		if (product.imageFile) {
			formData.append("image", product.imageFile);
		}
		return formData;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!product.name?.trim()) {
			toast.error("Por favor, informe o nome do produto");
			return;
		}

		setSubmitting(true);
		const formData = buildFormData();

		try {
			if (editingProduct) {
				console.log(Array.from(formData.entries()));
				await updateProduct({
					id: editingProduct._id!,
					data: formData,
				}).unwrap();
				toast.success("Produto editado com sucesso");
			} else {
				await createProduct(formData).unwrap();
				toast.success("Produto criado com sucesso");
			}
			setShowProductModalClose();
		} catch (err) {
			console.error(err);
			toast.error("Erro ao salvar o produto.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
				<h2 className="text-xl font-bold mb-4">
					{editingProduct ? "Editar Produto" : "Novo Produto"}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Nome */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Nome
						</label>
						<input
							name="name"
							value={product.name}
							onChange={handleChange}
							type="text"
							className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
						/>
					</div>

					{/* Descrição */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Descrição
						</label>
						<textarea
							name="description"
							value={product.description}
							onChange={handleChange}
							rows={3}
							className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
						/>
					</div>

					{/* Preço e Categoria */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Preço (R$)
							</label>
							<input
								name="price"
								value={product.price}
								onChange={handleChange}
								type="number"
								step="0.01"
								min="0"
								className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Categoria
							</label>
							<select
								name="category"
								value={product.category}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
							>
								<option value="">Selecione</option>
								{categories.map((cat) => (
									<option key={cat._id} value={cat._id}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Ingredientes */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Ingredientes
						</label>

						{/* Lista de ingredientes existentes */}
						{product.ingredients && product.ingredients.length > 0 && (
							<div className="mb-3">
								<div className="flex flex-wrap gap-2">
									{product.ingredients.map((ingredient, index) => (
										<div
											key={index}
											className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
										>
											<span>{ingredient.icon || "🥄"}</span>
											<span>{ingredient.name}</span>
											<button
												type="button"
												onClick={() => handleRemoveIngredient(index)}
												className="text-red-500 hover:text-red-700"
											>
												<FaTimes size={12} />
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Formulário para adicionar novo ingrediente */}
						<div className="border rounded-md p-3 bg-gray-50">
							<div className="grid grid-cols-3 gap-2 mb-2">
								<div className="col-span-2">
									<input
										type="text"
										placeholder="Nome do ingrediente"
										value={newIngredient.name}
										onChange={(e) => handleIngredientChange(e, "name")}
										className="w-full px-2 py-1 border rounded text-sm focus:ring-green-500 focus:border-green-500"
									/>
								</div>
								<div>
									<input
										type="text"
										placeholder="Ícone (emoji)"
										value={newIngredient.icon}
										onChange={(e) => handleIngredientChange(e, "icon")}
										className="w-full px-2 py-1 border rounded text-sm text-center focus:ring-green-500 focus:border-green-500"
									/>
								</div>
							</div>
							<button
								type="button"
								onClick={handleAddIngredient}
								className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
							>
								<FaPlus size={12} />
								Adicionar Ingrediente
							</button>
						</div>
					</div>

					{/* Imagem */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Imagem
						</label>
						<div className="mt-1 flex items-center gap-4">
							{preview ? (
								<img
									src={preview}
									alt="Preview"
									className="h-24 w-24 object-cover rounded"
								/>
							) : (
								<div className="h-24 w-24 bg-gray-100 rounded flex items-center justify-center">
									+ Escolher
								</div>
							)}
							<input
								name="image"
								type="file"
								accept="image/*"
								onChange={handleChange}
							/>
						</div>
					</div>

					{/* Ativo */}
					<div className="flex items-center">
						<input
							name="active"
							type="checkbox"
							checked={product.active}
							onChange={handleChange}
							className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
						/>
						<label className="ml-2 block text-sm text-gray-900">
							Produto ativo
						</label>
					</div>

					{/* Botões */}
					<div className="flex justify-between">
						{editingProduct ? (
							<div className="flex justify-start gap-2 pt-4">
								<button
									className="bg-red-600 text-gray-50 rounded-md px-4 py-2 hover:bg-red-700"
									type="button"
									onClick={(e) => {
										e.preventDefault();
										handleDeleteProduct();
									}}
								>
									<FaRegTrashAlt />
								</button>
							</div>
						) : (
							<div></div>
						)}

						<div className="flex justify-end gap-2 pt-4">
							<button
								type="button"
								className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
								onClick={setShowProductModalClose}
								disabled={submitting}
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
								disabled={submitting}
							>
								{editingProduct ? "Atualizar" : "Criar"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
