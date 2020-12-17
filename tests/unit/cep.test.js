const cepHelper = require('../../src/app/helpers/cep');

describe("CEP", () => {
    
    it("should format cep", () => {
        expect(cepHelper.formataCep("05424010")).toBe("05424-010")
    })

    it("should validate cep", () => {
        expect(cepHelper.validaCep("03919010")).toBe(true)
    })
    
})