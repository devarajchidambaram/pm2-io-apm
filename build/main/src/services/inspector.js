"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inspector = require("inspector");
const debug_1 = require("debug");
debug_1.default('axm:inspectorservice');
class InspectorService {
    constructor() {
        this.isConnected = false;
    }
    createSession() {
        if (!this.session) {
            this.session = new inspector.Session();
        }
        return this.session;
    }
    post(action, params) {
        return new Promise((resolve, reject) => {
            this.session.post(action, params, (err, data) => {
                if (err)
                    return reject(err);
                debug_1.default(action + ' !');
                resolve(data);
            });
        });
    }
    on(eventName, callback) {
        this.session.on(eventName, callback);
    }
    connect() {
        if (!this.isConnected) {
            this.session.connect();
        }
        this.isConnected = true;
    }
    disconnect() {
        if (this.isConnected) {
            this.session.post('Profiler.disable');
            this.session.disconnect();
            this.isConnected = false;
        }
        else {
            console.warn('No open session !');
        }
    }
}
exports.InspectorService = InspectorService;
module.exports = new InspectorService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zcGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2luc3BlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUFzQztBQUN0QyxpQ0FBeUI7QUFDekIsZUFBSyxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFFN0I7SUFBQTtRQUdVLGdCQUFXLEdBQVksS0FBSyxDQUFBO0lBeUN0QyxDQUFDO0lBdkNDLGFBQWE7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ3ZDO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxJQUFJLENBQUUsTUFBTSxFQUFFLE1BQU87UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO2dCQUM5QyxJQUFJLEdBQUc7b0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzNCLGVBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUE7Z0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNmLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsRUFBRSxDQUFFLFNBQVMsRUFBRSxRQUFRO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN0QyxDQUFDO0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDdkI7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1lBRXJDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUE7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7U0FDekI7YUFBTTtZQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtTQUNsQztJQUNILENBQUM7Q0FDRjtBQTVDRCw0Q0E0Q0M7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQSJ9