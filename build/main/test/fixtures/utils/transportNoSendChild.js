"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transport_1 = require("../../../src/utils/transport");
const transport = new transport_1.default();
const old = process.send;
delete process.send;
const res = transport.send(new Error());
process.send = old;
if (process.send) {
    process.send(res);
}
process.exit(0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0Tm9TZW5kQ2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL3V0aWxzL3RyYW5zcG9ydE5vU2VuZENoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNERBQW9EO0FBRXBELE1BQU0sU0FBUyxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFBO0FBQ2pDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUE7QUFDeEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFBO0FBQ25CLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0FBRXZDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO0FBRWxCLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtJQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0NBQ2xCO0FBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSJ9