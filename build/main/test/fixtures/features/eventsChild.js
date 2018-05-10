"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../../../src/features/events");
const events = new events_1.default();
events.init().then(() => {
    events.emit('myEvent', { prop1: 'value1' });
}).catch(() => {
    console.log('error');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzQ2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL2ZlYXR1cmVzL2V2ZW50c0NoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseURBQXdEO0FBRXhELE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQWEsRUFBRSxDQUFBO0FBRWxDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtJQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDdEIsQ0FBQyxDQUFDLENBQUEifQ==