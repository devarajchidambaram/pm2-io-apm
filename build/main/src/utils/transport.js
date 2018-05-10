"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
const stringify = require("json-stringify-safe");
debug_1.default('axm:transport');
class Transport {
    send(args, print) {
        if (!print)
            print = false;
        /**
         * For debug purpose
         */
        if (process.env.MODULE_DEBUG) {
            console.log(args);
        }
        if (!process.send) {
            return -1;
        }
        const msg = args instanceof Error ? args.message : args;
        try {
            process.send(JSON.parse(stringify(msg)));
        }
        catch (e) {
            console.error('Process disconnected from parent !');
            console.error(e.stack || e);
            process.exit(1);
        }
        return 0;
    }
}
exports.default = Transport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3RyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUF5QjtBQUN6QixpREFBZ0Q7QUFFaEQsZUFBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBRXRCO0lBQ0UsSUFBSSxDQUFFLElBQWlCLEVBQUUsS0FBZTtRQUV0QyxJQUFJLENBQUMsS0FBSztZQUFFLEtBQUssR0FBRyxLQUFLLENBQUE7UUFFekI7O1dBRUc7UUFDSCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDbEI7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNqQixPQUFPLENBQUMsQ0FBQyxDQUFBO1NBQ1Y7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7UUFFdkQsSUFBSTtZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3pDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUE7WUFDbkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDaEI7UUFFRCxPQUFPLENBQUMsQ0FBQTtJQUNWLENBQUM7Q0FDRjtBQTVCRCw0QkE0QkMifQ==