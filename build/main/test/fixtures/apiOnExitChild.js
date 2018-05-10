"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pmx = require(__dirname + '/../../src/index.js');
pmx.onExit(function () {
    if (process && process.send)
        process.send('callback');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpT25FeGl0Q2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL2FwaU9uRXhpdENoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBO0FBRXRELEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDVCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSTtRQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDdkQsQ0FBQyxDQUFDLENBQUEifQ==