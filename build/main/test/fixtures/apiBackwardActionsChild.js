"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pmx = require(__dirname + '/../../src/index.js');
pmx.init({
    event_loop_dump: true,
    profiling: true
});
process.on('SIGINT', function () {
    pmx.destroy();
    process.exit(0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpQmFja3dhcmRBY3Rpb25zQ2hpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90ZXN0L2ZpeHR1cmVzL2FwaUJhY2t3YXJkQWN0aW9uc0NoaWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBO0FBRXRELEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDUCxlQUFlLEVBQUUsSUFBSTtJQUNyQixTQUFTLEVBQUUsSUFBSTtDQUNoQixDQUFDLENBQUE7QUFFRixPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLENBQUMsQ0FBQyxDQUFBIn0=