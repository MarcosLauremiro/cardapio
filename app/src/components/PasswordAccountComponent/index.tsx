import { useState, useEffect } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export function PasswordAccount() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showOld, setShowOld] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const [hasMinLength, setHasMinLength] = useState(false);
	const [hasUppercase, setHasUppercase] = useState(false);
	const [hasLowercase, setHasLowercase] = useState(false);
	const [hasNumber, setHasNumber] = useState(false);
	const [hasSpecial, setHasSpecial] = useState(false);

	useEffect(() => {
		const pw = newPassword;
		setHasMinLength(pw.length >= 12);
		setHasUppercase(/[A-Z]/.test(pw));
		setHasLowercase(/[a-z]/.test(pw));
		setHasNumber(/\d/.test(pw));
		setHasSpecial(/[^A-Za-z0-9]/.test(pw));
	}, [newPassword]);

	const allValid =
		hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
	const canSubmit =
		oldPassword.length > 0 && allValid && newPassword === confirmPassword;

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!canSubmit) return;
		console.log("Old:", oldPassword);
		console.log("New:", newPassword);
		setOldPassword("");
		setNewPassword("");
		setConfirmPassword("");
	}

	return (
		<div className=" mx-auto bg-white rounded-lg shadow p-6">
			<h2 className="text-xl font-semibold text-gray-800 mb-6">
				Change Password
			</h2>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Old Password
					</label>
					<div
						className={`relative rounded-md shadow-sm ${
							oldPassword.length > 0
								? "border-2 border-green-500"
								: "border border-gray-300"
						}`}
					>
						<input
							type={showOld ? "text" : "password"}
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
							placeholder="Enter old password"
						/>
						<button
							type="button"
							onClick={() => setShowOld(!showOld)}
							className="absolute inset-y-0 right-2 flex items-center text-gray-500"
							tabIndex={-1}
						>
							{showOld ? <MdVisibilityOff /> : <MdVisibility />}
						</button>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						New Password
					</label>
					<div
						className={`relative rounded-md shadow-sm ${
							newPassword.length === 0 || allValid
								? "border border-gray-300"
								: "border-2 border-red-500"
						}`}
					>
						<input
							type={showNew ? "text" : "password"}
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
							placeholder="Enter new password"
						/>
						<button
							type="button"
							onClick={() => setShowNew(!showNew)}
							className="absolute inset-y-0 right-2 flex items-center text-gray-500"
							tabIndex={-1}
						>
							{showNew ? <MdVisibilityOff /> : <MdVisibility />}
						</button>
					</div>
					{!allValid && newPassword.length > 0 && (
						<p className="mt-2 text-sm text-red-600">
							Please add all necessary characters to create a safe password.
						</p>
					)}
					<ul className="mt-2 space-y-1 text-sm">
						<li className="flex items-center">
							<span
								className={`h-2 w-2 rounded-full mr-2 ${
									hasMinLength ? "bg-green-500" : "bg-gray-400"
								}`}
							/>
							Minimum characters 12
						</li>
						<li className="flex items-center">
							<span
								className={`h-2 w-2 rounded-full mr-2 ${
									hasUppercase ? "bg-green-500" : "bg-gray-400"
								}`}
							/>
							One uppercase character
						</li>
						<li className="flex items-center">
							<span
								className={`h-2 w-2 rounded-full mr-2 ${
									hasLowercase ? "bg-green-500" : "bg-gray-400"
								}`}
							/>
							One lowercase character
						</li>
						<li className="flex items-center">
							<span
								className={`h-2 w-2 rounded-full mr-2 ${
									hasSpecial ? "bg-green-500" : "bg-gray-400"
								}`}
							/>
							One special character
						</li>
						<li className="flex items-center">
							<span
								className={`h-2 w-2 rounded-full mr-2 ${
									hasNumber ? "bg-green-500" : "bg-gray-400"
								}`}
							/>
							One number
						</li>
					</ul>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Confirm New Password
					</label>
					<div className="relative rounded-md shadow-sm border border-gray-300">
						<input
							type={showConfirm ? "text" : "password"}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
							placeholder="Confirm new password"
						/>
						<button
							type="button"
							onClick={() => setShowConfirm(!showConfirm)}
							className="absolute inset-y-0 right-2 flex items-center text-gray-500"
							tabIndex={-1}
						>
							{showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
						</button>
					</div>
					{confirmPassword.length > 0 && newPassword !== confirmPassword && (
						<p className="mt-2 text-sm text-red-600">Passwords do not match.</p>
					)}
				</div>

				<div>
					<button
						type="submit"
						disabled={!canSubmit}
						className={`w-full py-2 rounded-md text-white font-medium transition ${
							canSubmit
								? "bg-blue-600 hover:bg-blue-500"
								: "bg-gray-300 cursor-not-allowed"
						}`}
					>
						Change Password
					</button>
				</div>
			</form>
		</div>
	);
}
