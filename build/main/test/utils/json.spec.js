"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("../../src/utils/json");
const chai_1 = require("chai");
require("mocha");
describe('Json', () => {
    it('should return the exact param cause it is not an object', () => {
        const res = json_1.default.jsonize('test');
        chai_1.expect(res).to.equal('test');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC91dGlscy9qc29uLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBNEM7QUFDNUMsK0JBQTZCO0FBRTdCLGlCQUFjO0FBRWQsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFFcEIsRUFBRSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsRUFBRTtRQUNqRSxNQUFNLEdBQUcsR0FBRyxjQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3JDLGFBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzlCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==