import jwt from "jsonwebtoken";

const privateKey = process.env.PRIVATEKEY!;

export function generateToken(payload: Record<string, unknown>): string {
	return jwt.sign(payload, privateKey, {
		expiresIn: "1h",
		algorithm: "HS256",
	});
}
