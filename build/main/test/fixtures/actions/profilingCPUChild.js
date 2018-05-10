"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../src/features/actions");
const profilingCpu_1 = require("../../../src/actions/profilingCpu");
const action = new actions_1.default();
const profiling = new profilingCpu_1.default(action);
profiling.init().then(() => {
    if (process && process.send) {
        process.send('initialized');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsaW5nQ1BVQ2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL2FjdGlvbnMvcHJvZmlsaW5nQ1BVQ2hpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBa0Q7QUFDbEQsb0VBQTREO0FBRTVELE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQU0sRUFBRSxDQUFBO0FBRTNCLE1BQU0sU0FBUyxHQUFHLElBQUksc0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUMxQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUN6QixJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7S0FDNUI7QUFDSCxDQUFDLENBQUMsQ0FBQSJ9