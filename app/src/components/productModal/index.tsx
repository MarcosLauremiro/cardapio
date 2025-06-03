import type { Category } from "../../types/category.type";
import type { Product } from "../../types/product.type";
import pizza from "../../assets/marguerita.png";

interface ProductModalProps {
	editingProduct: Product | null;
	setShowProductModalClose: () => void;
}

export const ProductModal = ({
	editingProduct,
	setShowProductModalClose,
}: ProductModalProps) => {
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
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-2xl">
				<h2 className="text-xl font-bold mb-4">
					{editingProduct ? "Editar Produto" : "Novo Produto"}
				</h2>
				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Nome
						</label>
						<input
							type="text"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
							defaultValue={editingProduct?.name || ""}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Descrição
						</label>
						<textarea
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
							rows={3}
							defaultValue={editingProduct?.description || ""}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Preço (R$)
							</label>
							<input
								type="number"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
								defaultValue={editingProduct?.price || ""}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Categoria
							</label>
							<select
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
								defaultValue={editingProduct?.category || ""}
							>
								{categorys.map((category) => (
									<option key={category.id} value={category.name}>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Imagem
						</label>
						<div className="mt-1 flex items-center">
							<span className="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100">
								{editingProduct ? (
									<img
										src={pizza}
										alt="Preview"
										className="h-full w-full object-cover"
									/>
								) : (
									<svg
										className="h-full w-full text-gray-300"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
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
							onClick={setShowProductModalClose}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600"
						>
							{editingProduct ? "Atualizar" : "Criar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
