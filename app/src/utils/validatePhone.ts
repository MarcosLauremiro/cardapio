export const isValidatePhone = (phone: string) => {
	const cleaned = phone.replace(/\D/g, "");
	const phoneRegex = /^(\d{2})(9\d{8})$/;
	return phoneRegex.test(cleaned);
};
