// DESCRIBE => bloco de tests => tests suites
// IT OR TEST declara um unico teste unitario => tests cases
// EXPECT => asserções do resultado => validar resultados

import { expect, describe, it } from "@jest/globals";
import { sum } from "../../routes/RouterUpload";

describe("Initial Tests", () => {
	it("first unit tests", () => {
		const numberone = 9;
		const numberthow = 5;

		const result = sum(numberone, numberthow);

		expect(result).toEqual(numberone + numberthow);
	});
});
