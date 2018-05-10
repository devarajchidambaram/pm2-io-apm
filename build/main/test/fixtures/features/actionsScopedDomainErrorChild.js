"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../../../src/features/actions");
const actions = new actions_1.default();
actions.init({ profilingCpu: false, profilingHeap: false });
actions.scopedAction('myScopedAction', function (res) { res.send('myScopedActionReply'); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uc1Njb3BlZERvbWFpbkVycm9yQ2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL2ZlYXR1cmVzL2FjdGlvbnNTY29wZWREb21haW5FcnJvckNoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQTBEO0FBRTFELE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQWMsRUFBRSxDQUFBO0FBRXBDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO0FBQ3pELE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUEifQ==