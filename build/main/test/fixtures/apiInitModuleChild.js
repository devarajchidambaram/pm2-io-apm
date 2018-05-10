"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pmx = require(__dirname + '/../../src/index.js');
process.env.fixtures = JSON.stringify({
    envVar: 'value',
    password: 'toto'
});
const conf = pmx.initModule({
    test: 'toto'
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpSW5pdE1vZHVsZUNoaWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdC9maXh0dXJlcy9hcGlJbml0TW9kdWxlQ2hpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLENBQUE7QUFFdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNwQyxNQUFNLEVBQUUsT0FBTztJQUNmLFFBQVEsRUFBRSxNQUFNO0NBQ2pCLENBQUMsQ0FBQTtBQUVGLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDMUIsSUFBSSxFQUFFLE1BQU07Q0FDYixDQUFDLENBQUEifQ==