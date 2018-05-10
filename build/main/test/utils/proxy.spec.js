"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_1 = require("../../src/utils/proxy");
const chai_1 = require("chai");
require("mocha");
describe('Proxy', () => {
    it('should return debug function in case method is not found', () => {
        const res = proxy_1.default.wrap({}, ['toto'], {});
        chai_1.expect(typeof res).to.equal('function');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvdXRpbHMvcHJveHkuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUF5QztBQUN6QywrQkFBNkI7QUFFN0IsaUJBQWM7QUFFZCxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUVyQixFQUFFLENBQUMsMERBQTBELEVBQUUsR0FBRyxFQUFFO1FBQ2xFLE1BQU0sR0FBRyxHQUFHLGVBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDeEMsYUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN6QyxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=