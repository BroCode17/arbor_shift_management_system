import {add} from '../src/try'

describe('add function', () => {
    it("should return the sum of two numbers", () => {
        expect(add(2,2)).toBe(4)
    })
})