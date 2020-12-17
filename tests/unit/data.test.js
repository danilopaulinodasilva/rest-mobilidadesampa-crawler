const dataHelper = require('../../src/app/helpers/data');

describe("Data", () => {
    
    it("should bring today date", () => {
        expect(dataHelper.today()).toBe("2020-10-18")
    })

    it("should format date in sql date YYYY-MM-DD", () => {
        expect(dataHelper.sqlDate("18/10/2020")).toBe("2020-10-18")
    })
    
})