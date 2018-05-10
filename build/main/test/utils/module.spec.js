"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../../src/utils/module");
const chai_1 = require("chai");
require("mocha");
describe('Module', () => {
    it('should return false if module doesn\'t exist', () => {
        const module = module_1.default.loadModule('./fake/path', 'test');
        chai_1.expect(module.message).to.equal('Cannot find module \'./fake/path\'');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L3V0aWxzL21vZHVsZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTJDO0FBRTNDLCtCQUE2QjtBQUM3QixpQkFBYztBQUVkLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBRXRCLEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLEVBQUU7UUFDdEQsTUFBTSxNQUFNLEdBQUcsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZELGFBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0lBQ3ZFLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==