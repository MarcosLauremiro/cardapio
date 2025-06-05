import type { Category } from "../../types/category.type";

interface CategoryModalProps {
	editingCategory: Category | null;
	setShowCategoryModalClose: () => void;
}

export const CategoryModal = ({
	editingCategory,
	setShowCategoryModalClose,
}: CategoryModalProps) => {

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">
					{editingCategory ? "Editar Categoria" : "Nova Categoria"}
				</h2>
				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Nome
						</label>
						<input
							type="text"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
							defaultValue={editingCategory?.name || ""}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Ícone
						</label>
						<div className="mt-1 grid grid-cols-8 gap-2">
							{[
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
							].map((icon) => (
								<button
									key={icon}
									type="button"
									className={`h-10 w-10 flex items-center justify-center text-xl border rounded-md ${
										editingCategory?.icon === icon
											? "border-green-500 bg-green-50"
											: "border-gray-300 hover:bg-gray-50"
									}`}
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
				</form>
			</div>
		</div>
	);
};
