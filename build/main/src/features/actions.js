"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain = require("domain");
const debug_1 = require("debug");
debug_1.default('axm:actions');
const serviceManager_1 = require("../serviceManager");
const actions_1 = require("../services/actions");
class ActionsFeature {
    constructor() {
        this.transport = serviceManager_1.ServiceManager.get('transport');
        serviceManager_1.ServiceManager.set('actionsService', new actions_1.default(this));
        this.actionsService = serviceManager_1.ServiceManager.get('actionsService');
    }
    init(conf, force) {
        this.actionsService.init(conf, force);
        return {
            action: this.action
        };
    }
    destroy() {
        this.actionsService.destroy();
    }
    action(actionName, opts, fn) {
        if (!fn) {
            fn = opts;
            opts = null;
        }
        const check = this.check(actionName, fn);
        if (!check) {
            return check;
        }
        // Notify the action
        this.transport.send({
            type: 'axm:action',
            data: {
                action_name: actionName,
                opts: opts,
                arity: fn.length
            }
        });
        const reply = (data) => {
            this.transport.send({
                type: 'axm:reply',
                data: {
                    return: data,
                    action_name: actionName
                }
            });
        };
        process.on('message', function (data) {
            if (!data)
                return false;
            // In case 2 arguments has been set but no options has been transmitted
            if (fn.length === 2 && typeof (data) === 'string' && data === actionName) {
                return fn({}, reply);
            }
            // In case 1 arguments has been set but options has been transmitted
            if (fn.length === 1 && typeof (data) === 'object' && data.msg === actionName) {
                return fn(reply);
            }
            /**
             * Classical call
             */
            if (typeof (data) === 'string' && data === actionName) {
                return fn(reply);
            }
            /**
             * If data is an object == v2 protocol
             * Pass the opts as first argument
             */
            if (typeof (data) === 'object' && data.msg === actionName) {
                return fn(data.opts, reply);
            }
        });
    }
    scopedAction(actionName, fn) {
        const check = this.check(actionName, fn);
        if (!check) {
            return check;
        }
        // Notify the action
        this.transport.send({
            type: 'axm:action',
            data: {
                action_name: actionName,
                action_type: 'scoped'
            }
        });
        process.on('message', (data) => {
            if (!data
                || data.uuid === undefined
                || data.action_name === undefined) {
                return false;
            }
            if (data.action_name === actionName) {
                const res = {
                    send: (dt) => {
                        this.transport.send({
                            type: 'axm:scoped_action:stream',
                            data: {
                                data: dt,
                                uuid: data.uuid,
                                action_name: actionName
                            }
                        });
                    },
                    error: (dt) => {
                        this.transport.send({
                            type: 'axm:scoped_action:error',
                            data: {
                                data: dt,
                                uuid: data.uuid,
                                action_name: actionName
                            }
                        });
                    },
                    end: (dt) => {
                        this.transport.send({
                            type: 'axm:scoped_action:end',
                            data: {
                                data: dt,
                                uuid: data.uuid,
                                action_name: actionName
                            }
                        });
                    }
                };
                const d = domain.create();
                d.on('error', function (err) {
                    res.error(err.message || err.stack || err);
                    setTimeout(function () {
                        process.exit(1);
                    }, 300);
                });
                d.run(function () {
                    fn(data.opts || null, res);
                });
            }
        });
    }
    check(actionName, fn) {
        if (!actionName) {
            return console.error('[PMX] action.action_name is missing');
        }
        if (!fn) {
            return console.error('[PMX] callback is missing');
        }
        if (!process.send) {
            debug_1.default('Process not running within PM2');
            return false;
        }
        return true;
    }
}
exports.default = ActionsFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWdDO0FBQ2hDLGlDQUF5QjtBQUN6QixlQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDcEIsc0RBQWtEO0FBR2xELGlEQUFnRDtBQUVoRDtJQUtFO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNoRCwrQkFBYyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLGlCQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUM5RCxJQUFJLENBQUMsY0FBYyxHQUFHLCtCQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELElBQUksQ0FBRSxJQUFLLEVBQUUsS0FBTTtRQUVqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFFckMsT0FBTztZQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQy9CLENBQUM7SUFFRCxNQUFNLENBQUUsVUFBVSxFQUFFLElBQUssRUFBRSxFQUFHO1FBQzVCLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxFQUFFLEdBQUcsSUFBSSxDQUFBO1lBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQTtTQUNaO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDeEMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxvQkFBb0I7UUFDcEIsSUFB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