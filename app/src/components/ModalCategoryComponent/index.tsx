import { useEffect, useState, type FormEvent } from "react";
import type { Category } from "../../types/category.type";
import {
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} from "../../slices/category";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface CategoryModalProps {
	editingCategory: Category | null;
	setShowCategoryModalClose: () => void;
}

export const CategoryModal = ({
	editingCategory,
	setShowCategoryModalClose,
}: CategoryModalProps) => {
	const [name, setName] = useState<string>(editingCategory?.name || "");
	const [icon, setIcon] = useState<string>(editingCategory?.icon || "🍕");
	const [isActive, setIsActive] = useState<boolean>(
		editingCategory?.isActive ?? true
	);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const [createCategory] = useCreateCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();
	const [deleteCategory] = useDeleteCategoryMutation();

	useEffect(() => {
		setName(editingCategory?.name || "");
		setIcon(editingCategory?.icon || "🍕");
		setIsActive(editingCategory?.isActive ?? true);
	}, [editingCategory]);

	const icons = [
		"🍕",
		"🍔",
		"🍟",
		"🌭",
		"🍗",
		"🥗",
		"🍰",
		"🍦",
		"🍩",
		"🍺",
		"🍷",
		"🍹",
		"🥤",
		"🧃",
		"🍵",
		"☕",
	];

	const handleDeleteCategory = async () => {
		await deleteCategory({ id: editingCategory?._id as string });
		setShowCategoryModalClose();
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!name.trim()) {
			toast.error("Por favor, informe o nome da categoria.");
			return;
		}

		setSubmitting(true);
		const payload = { name: name.trim(), icon, isActive };

		try {
			if (editingCategory) {
				await updateCategory({
					id: editingCategory._id,
					data: payload,
				}).unwrap();
				toast.success("Categoria atualizada com sucesso");
			} else {
				await createCategory(payload).unwrap();
				toast.success("Categoria Criada com sucesso");
			}

			setShowCategoryModalClose();
		} catch (err) {
			console.error(err);
			toast.error("Erro ao salvar a categoria.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">
					{editingCategory ? "Editar Categoria" : "Nova Categoria"}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Nome
						</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
							defaultValue={editingCategory?.name || ""}
							disabled={submitting}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Ícone
						</label>
						<div className="mt-1 grid grid-cols-8 gap-2">
							{icons.map((ico) => (
								<button
									key={ico}
									type="button"
									onClick={() => setIcon(ico)}
									className={`h-10 w-10 flex items-center justify-center text-xl border rounded-md ${
										icon === ico
											? "border-green-500 bg-green-50"
											: "border-gray-300 hover:bg-gray-50"
									}`}
									disabled={submitting}
								>
									{ico}
								</button>
							))}
						</div>
					</div>

					<div className="flex items-center">
						<input
							type="checkbox"
							checked={isActive}
							className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
							onChange={(e) => setIsActive(e.target.checked)}
							defaultChecked={editingCategory?.isActive ?? true}
							disabled={submitting}
						/>
						<label className="ml-2 block text-sm text-gray-900">
							Categoria ativa
						</label>
					</div>
					<div className="flex justify-between">
						{editingCategory ? (
							<div className="flex justify-start gap-2 pt-4">
								<button
									onClick={(e) => {
										e.preventDefault();
										handleDeleteCategory();
									}}
									className="bg-red-600 text-gray-50 rounded-md px-4 py-2 hover:bg-red-700"
								>
									<FaRegTrashAlt size={22} />
								</button>
							</div>
						) : (
							<div></div>
						)}

						<div className="flex justify-end gap-2 pt-4">
							<button
								type="button"
								className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
								onClick={setShowCategoryModalClose}
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600"
							>
								{editingCategory ? "Atualizar" : "Criar"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
