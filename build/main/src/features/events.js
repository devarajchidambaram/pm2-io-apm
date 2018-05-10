"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
debug_1.default('axm:events');
const serviceManager_1 = require("../serviceManager");
const stringify = require("json-stringify-safe");
class Events {
    constructor() {
        this.transport = serviceManager_1.ServiceManager.get('transport');
    }
    init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return {
                emit: this.emit
            };
        });
    }
    emit(name, data) {
        if (!name) {
            return console.error('[AXM] emit.name is missing');
        }
        if (!data) {
            return console.error('[AXM] emit.data is missing');
        }
        let inflightObj = {};
        if (typeof (data) === 'object') {
            inflightObj = JSON.parse(stringify(data));
        }
        else {
            inflightObj.data = data;
        }
        inflightObj.__name = name;
        this.transport.send({
            type: 'human:event',
            data: inflightObj
        }, true);
        return false;
    }
}
exports.default = Events;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBeUI7QUFDekIsZUFBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBRW5CLHNEQUFrRDtBQUVsRCxpREFBZ0Q7QUFHaEQ7SUFHRTtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsK0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVLLElBQUk7O1lBQ1IsT0FBTztnQkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDaEIsQ0FBQTtRQUNILENBQUM7S0FBQTtJQUVELElBQUksQ0FBRSxJQUFJLEVBQUUsSUFBSTtRQUNkLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtTQUNuRDtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtTQUNuRDtRQUVELElBQUksV0FBVyxHQUFpQixFQUFFLENBQUE7UUFFbEMsSUFBSSxPQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzdCLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1NBQzFDO2FBQU07WUFDTCxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtTQUN4QjtRQUVELFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBRXpCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRyxhQUFhO1lBQ3BCLElBQUksRUFBRyxXQUFXO1NBQ25CLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDUixPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7Q0FDRjtBQXJDRCx5QkFxQ0MifQ==