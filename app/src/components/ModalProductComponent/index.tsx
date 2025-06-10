import type { Product } from "../../types/product.type";
import { listCategories } from "../../slices/category";
import { useState, type FormEvent, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import {
	useCreateProductMutation,
	useUpdateProductMutation,
} from "../../slices/product";
import { useAppSelector } from "../../store/hooks";

interface ProductModalProps {
	editingProduct: Product | null;
	setShowProductModalClose: () => void;
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
		id: editingProduct?.id,
		imagePath: editingProduct?.imagePath || "",
	});
	const [preview, setPreview] = useState<string>(
		editingProduct?.imagePath || ""
	);
	const [submitting, setSubmitting] = useState(false);
	const categories = useAppSelector(listCategories);
	const [createProduct] = useCreateProductMutation();
	const [updateProduct] = useUpdateProductMutation();

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

	const buildFormData = () => {
		const fd = new FormData();
		fd.append("name", product.name ?? "");
		fd.append("description", product.description ?? "");
		fd.append("price", (product.price ?? 0).toString());
		fd.append("ingredients", JSON.stringify(product.ingredients ?? []));
		fd.append("category", product.category ?? "");
		fd.append("establishment", product.establishment ?? "");
		fd.append("active", product.active ? "true" : "false");
		if (product.imageFile) {
			fd.append("image", product.imageFile);
		}
		return fd;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!product.name?.trim()) {
			toast.error("Por favor, informe o nome do produto");
			return;
		}

		setSubmitting(true);
		const fd = buildFormData();

		try {
			if (editingProduct) {
				// endpoint de update deve aceitar FormData
				await updateProduct({ id: editingProduct.id!, data: fd }).unwrap();
				toast.success("Produto editado com sucesso");
			} else {
				await createProduct(fd).unwrap();
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
			<div className="bg-white rounded-lg p-6 w-full max-w-2xl">
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
				</form>
			</div>
		</div>
	);
};
