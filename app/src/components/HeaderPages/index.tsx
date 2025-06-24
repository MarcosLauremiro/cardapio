interface HeaderPageProps {
	title: string;
	description: string;
	profile?: string;
}

export const HeaderPage = ({
	title,
	description,
	profile,
}: HeaderPageProps) => {
	return (
		<div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 shadow-lg text-white flex items-center space-x-4">
			{profile ? (
				<div className="h-13 w-13 rounded-full bg-green-950 flex items-center justify-center text-white font-bold text-xl uppercase">
					{profile}
				</div>
			) : (
				""
			)}

			<div className="text-sm/3">
				<h1 className="text-3xl font-bold mb-2 capitalize">{title}</h1>
				<p className="text-emerald-100">{description}</p>
			</div>
		</div>
	);
};
