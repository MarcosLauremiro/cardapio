// src/pages/PlanAccount.tsx
import { useState } from "react";

type PlanType = {
	name: string;
	iconColor: string;
	priceAnnual: string;
	priceMonthly: string;
	discountLabel?: string;
	features: string[];
	buttonText: string;
	isEnterprise?: boolean;
};

export function PlanAccount() {
	const [isAnnual, setIsAnnual] = useState(true);

	const plans: PlanType[] = [
		{
			name: "Plus",
			iconColor: "bg-yellow-400",
			priceAnnual: "€29",
			priceMonthly: "€34",
			discountLabel: "-15%",
			buttonText: "Upgrade to Plus",
			features: [
				"Enhanced email sending",
				"Permission settings",
				"Upgraded contact analysis",
			],
		},
		{
			name: "Pro",
			iconColor: "bg-blue-500",
			priceAnnual: "€59",
			priceMonthly: "€69",
			discountLabel: "-15%",
			buttonText: "Upgrade to Pro",
			features: [
				"Unlimited reporting",
				"Advanced data enrichment",
				"Priority support",
			],
		},
		{
			name: "Enterprise",
			iconColor: "bg-purple-600",
			priceAnnual: "€119",
			priceMonthly: "€140",
			buttonText: "Talk to sales",
			isEnterprise: true,
			features: ["Advanced admin tools", "SAML and SSO", "Custom billing"],
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 py-12">
			<div className="max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
				<div className="px-6 py-6 border-gray-200">
					<div className="flex items-center justify-center">
						<div className="inline-flex bg-gray-200 rounded-full p-1">
							<button
								onClick={() => setIsAnnual(true)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
										isAnnual
											? "bg-white text-blue-600 shadow"
											: "text-gray-600 hover:bg-gray-300"
									}`}
							>
								Annual
								{isAnnual && (
									<span className="ml-1 text-xs font-normal text-blue-600">
										–15%
									</span>
								)}
							</button>
							<button
								onClick={() => setIsAnnual(false)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
										!isAnnual
											? "bg-white text-blue-600 shadow"
											: "text-gray-600 hover:bg-gray-300"
									}`}
							>
								Monthly
							</button>
						</div>
					</div>
				</div>
				<div className="px-6 py-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{plans.map((plan) => {
							const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
							const subtitle = isAnnual
								? "per user/month, billed annually"
								: "per user/month, billed monthly";

							return (
								<div
									key={plan.name}
									className="border border-gray-200 rounded-lg shadow-sm flex flex-col"
								>
									<div className="px-6 pt-6 pb-4 flex-1 flex flex-col">
										<div className="flex items-center space-x-2 mb-4">
											<div
												className={`h-10 w-10 rounded-lg flex items-center justify-center ${plan.iconColor} text-white`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 7l9-4 9 4-9 4-9-4z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 17l9 4 9-4M4 11l8 4 8-4"
													/>
												</svg>
											</div>
											<h3 className="text-lg font-semibold text-gray-800">
												{plan.name}
											</h3>
										</div>
										<div className="flex items-baseline space-x-2">
											<span className="text-3xl font-bold text-gray-900">
												{price}
											</span>
											{plan.discountLabel && isAnnual && (
												<span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded">
													{plan.discountLabel} Discount
												</span>
											)}
										</div>
										<p className="mt-1 text-sm text-gray-500">{subtitle}</p>
										<button
											className={`mt-6 w-full py-2 rounded-lg text-white font-medium transition
                        ${
													plan.isEnterprise
														? "bg-blue-600 hover:bg-blue-500"
														: "bg-blue-600 hover:bg-blue-500"
												}`}
										>
											{plan.buttonText}
										</button>
										<ul className="mt-6 space-y-2">
											{plan.features.map((feature) => (
												<li
													key={feature}
													className="flex items-center text-sm text-gray-600"
												>
													{/* Ícone de “check” */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 text-green-500 flex-shrink-0"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
															clipRule="evenodd"
														/>
													</svg>
													<span className="ml-2">{feature}</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
