"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notify_1 = require("../../../src/features/notify");
const notify = new notify_1.NotifyFeature();
class Option extends notify_1.NotifyOptions {
    constructor(level) {
        super();
        this.level = level;
    }
}
const option = new Option('warn');
notify.init(option);
notify.notifyError(new Error('info'), 'info');
notify.notifyError(new Error('warn'), 'warn');
notify.notifyError(new Error('error'), 'errors');
notify.notifyError(new Error('does not exist'), 'does not exist');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5Q2hpbGRMZXZlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rlc3QvZml4dHVyZXMvZmVhdHVyZXMvbm90aWZ5Q2hpbGRMZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUEyRTtBQUUzRSxNQUFNLE1BQU0sR0FBRyxJQUFJLHNCQUFhLEVBQUUsQ0FBQTtBQUNsQyxZQUFhLFNBQVEsc0JBQWE7SUFDaEMsWUFBYSxLQUFhO1FBQ3hCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDcEIsQ0FBQztDQUNGO0FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7QUFFakMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNuQixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzdDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDN0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUNoRCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQSJ9