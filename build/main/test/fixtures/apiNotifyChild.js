"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pmx = require(__dirname + '/../../src/index.js');
pmx.init();
pmx.notifyError(new Error('myNotifyNotSend'));
pmx.init({
    level: 'warn'
});
pmx.notifyError(new Error('myNotify'), {
    level: 'error'
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpTm90aWZ5Q2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL2FwaU5vdGlmeUNoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBO0FBRXRELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtBQUNWLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0FBRTdDLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDUCxLQUFLLEVBQUUsTUFBTTtDQUNkLENBQUMsQ0FBQTtBQUNGLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDckMsS0FBSyxFQUFFLE9BQU87Q0FDZixDQUFDLENBQUEifQ==