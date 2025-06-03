import { FiX } from "react-icons/fi";
import { LuRefreshCcw } from "react-icons/lu";

interface RefreshModalProps {
	closeModal: () => void;
}

export const RefreshModal = ({ closeModal }: RefreshModalProps) => {
	const handleRefresh = () => {
		//logica
		closeModal();
	};

	return (
		<div className="fixed inset-0 bg-[#00000062] bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-11/12 max-w-md p-6 relative flex flex-col gap-10">
				{/* Cabeçalho do modal */}
				<div className="flex justify-between items-center">
					<h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
						<LuRefreshCcw /> Reiniciar o dia
					</h3>
					<button
						onClick={closeModal}
						className="text-gray-500 hover:text-gray-700"
					>
						<FiX size={20} />
					</button>
				</div>
				{/* Corpo do modal */}
				<div className="text-center flex flex-col gap-6">
					<p className="text-gray-700">
						Ao reiniciar o dia, todos os pedidos serão arquivados no status
						atual.
					</p>
					<span className="text-red-700 text-[14px]">
						Deseja reiniciar o dia?
					</span>
				</div>

				{/* Rodapé do modal (botões) */}
				<div className="flex justify-between">
					<button
						onClick={closeModal}
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-[32px] hover:bg-gray-300"
					>
						Não
					</button>
					<button
						onClick={handleRefresh}
						className="px-4 py-2 bg-red-500 text-white rounded-[32px] hover:bg-red-600"
					>
						Sim, reiniciar dia
					</button>
				</div>
			</div>
		</div>
	);
};
