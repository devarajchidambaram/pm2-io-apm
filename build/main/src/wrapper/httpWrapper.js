"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serviceManager_1 = require("../serviceManager");
const proxy_1 = require("../utils/proxy");
class HttpWrapper {
    constructor(metricFeature) {
        this.metricFeature = metricFeature;
        this.transport = serviceManager_1.ServiceManager.get('transport');
    }
    init(opts, http) {
        let glMeter;
        let glLatency;
        glMeter = this.metricFeature.meter({
            name: 'HTTP',
            samples: 60,
            unit: 'req/min'
        });
        glLatency = this.metricFeature.histogram({
            measurement: 'mean',
            name: 'pmx:http:latency',
            unit: 'ms'
        });
        const ignoreRoutes = function (url) {
            for (let i = 0; i < opts.ignore_routes.length; ++i) {
                if (url.match(opts.ignore_routes[i]) !== null) {
                    return true;
                }
            }
            return false;
        };
        const httpWrapper = this;
        proxy_1.default.wrap(http.Server.prototype, ['on', 'addListener'], function (addListener) {
            return function (event, listener) {
                const self = this;
                const overloadedFunction = function (request, response) {
                    glMeter.mark();
                    let httpStart = {
                        url: request.url,
                        method: request.method,
                        start: Date.now(),
                        ip: request.headers['x-forwarded-for'] ||
                            (request.connection ? request.connection.remoteAddress : false) ||
                            (request.socket ? request.socket.remoteAddress : false) ||
                            ((request.connection && request.connection.socket) ? request.connection.socket.remoteAddress : false) || ''
                    };
                    response.once('finish', function () {
                        if (!ignoreRoutes(httpStart.url)) {
                            glLatency.update(Date.now() - httpStart.start);
                        }
                        if (((Date.now() - httpStart.start) >= opts.http_latency
                            || response.statusCode >= opts.http_code)
                            && !ignoreRoutes(httpStart.url)) {
                            httpWrapper.transport.send({
                                type: 'http:transaction',
                                data: {
                                    url: httpStart.url,
                                    method: httpStart.method,
                                    time: Date.now() - httpStart.start,
                                    code: response.statusCode,
                                    ip: httpStart.ip,
                                    size: response.getHeader('Content-Length') || null
                                }
                            });
                        }
                        // httpStart = null
                    });
                };
                if (!(event === 'request' && typeof listener === 'function')) {
                    return addListener.apply(self, arguments);
                }
                if (self.__overloaded !== true) {
                    self.on('removeListener', function onRemoveListener() {
                        setTimeout(function () {
                            if (self.listeners('request').length === 1) {
                                self.removeListener('request', overloadedFunction);
                                self.removeListener('removeListener', onRemoveListener);
                                self.__overloaded = false;
                            }
                        }, 200);
                    });
                    addListener.call(self, event, overloadedFunction);
                    self.__overloaded = true;
                }
                return addListener.apply(self, arguments);
            };
        });
        return http;
    }
}
exports.default = HttpWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cFdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd3JhcHBlci9odHRwV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUFrRDtBQUVsRCwwQ0FBa0M7QUFHbEM7SUFLRSxZQUFhLGFBQTZCO1FBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFBO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsK0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVELElBQUksQ0FBRSxJQUFJLEVBQUUsSUFBSTtRQUVkLElBQUksT0FBTyxDQUFBO1FBQ1gsSUFBSSxTQUFTLENBQUE7UUFFYixPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDakMsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxTQUFTO1NBQ2hCLENBQUMsQ0FBQTtRQUVGLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztZQUN2QyxXQUFXLEVBQUUsTUFBTTtZQUNuQixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFBO1FBRUYsTUFBTSxZQUFZLEdBQUcsVUFBVSxHQUFHO1lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDbEQsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQzdDLE9BQU8sSUFBSSxDQUFBO2lCQUNaO2FBQ0Y7WUFDRCxPQUFPLEtBQUssQ0FBQTtRQUNkLENBQUMsQ0FBQTtRQUVELE1BQU0sV0FBVyxHQUFHLElBQUks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