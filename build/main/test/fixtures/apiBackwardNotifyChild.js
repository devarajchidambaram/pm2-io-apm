"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pmx = require(__dirname + '/../../src/index.js');
pmx.notify('test');
pmx.notify(new Error('testError'));
pmx.notify({ success: false });
setTimeout(() => {
    process.exit(0);
}, 200);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpQmFja3dhcmROb3RpZnlDaGlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Rlc3QvZml4dHVyZXMvYXBpQmFja3dhcmROb3RpZnlDaGlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsQ0FBQTtBQUV0RCxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtBQUNsQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7QUFFOUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtJQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBIn0=