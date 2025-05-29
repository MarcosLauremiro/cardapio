import * as express from "express";

declare global {
	namespace Express {
		interface Request {
			userId?: string; // ou `string`, se você garantir sempre atribuir
		}
	}
}
