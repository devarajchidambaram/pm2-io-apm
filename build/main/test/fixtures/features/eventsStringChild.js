"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../src/features/events");
const events = new events_1.default();
events.init().then(() => {
    events.emit('myEvent', 'myValue');
}).catch(() => {
    console.log('error');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzU3RyaW5nQ2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL2ZlYXR1cmVzL2V2ZW50c1N0cmluZ0NoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQXdEO0FBRXhELE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQWEsRUFBRSxDQUFBO0FBRWxDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7SUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBIn0=