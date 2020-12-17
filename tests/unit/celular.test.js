const celularHelper = require('../../src/app/helpers/celular');

describe("Celular", () => {
    
    it("should format celular", () => {
        // expect(celularHelper.formataCelular("11968314974")).toMatchObject({"length":11,"ddd":"11","numero":"968314974"})
        expect(celularHelper.formataCelular("11968314974")).toStrictEqual({"length":11,"ddd":"11","numero":"968314974"})
    })
    
})