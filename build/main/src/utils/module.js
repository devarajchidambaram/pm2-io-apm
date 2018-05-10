"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = require("fs");
const debug = require("debug");
const path = require("path");
debug('axm:module');
class ModuleUtils {
    static getModulePath(moduleName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                ModuleUtils.detectModule(moduleName, (err, path) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    return resolve(path);
                });
            });
        });
    }
    static loadModule(modulePath, moduleName, args) {
        let module;
        try {
            if (args) {
                module = require(modulePath).apply(this, args);
            }
            else {
                module = require(modulePath);
            }
        }
        catch (e) {
            console.error(`Error when requiring ${moduleName} on path`, modulePath);
            console.error(e);
            return e;
        }
        debug(`${moduleName} successfully enabled`);
        return module;
    }
    static detectModule(moduleName, cb) {
        const module = this._getModule() || { paths: ['./node_modules', '/node_modules'] };
        const requirePaths = module.paths.slice();
        ModuleUtils._lookForModule(requirePaths, moduleName, cb);
    }
    static _getModule() {
        return require.main;
    }
    static _lookForModule(requirePaths, moduleName, cb) {
        if (!requirePaths[0]) {
            debug('[x] %s NOT FOUND', moduleName);
            return cb(new Error(moduleName + ' not found'));
        }
        const profilerPath = path.join(requirePaths[0], moduleName);
        debug('Checking %s in path %s', moduleName, profilerPath);
        fs.access(profilerPath, (fs.constants || fs).R_OK, function (err) {
            if (!err) {
                debug('[+] %s detected in path %s', moduleName, profilerPath);
                return cb(null, profilerPath);
            }
            debug('[-] %s not found in path %s', moduleName, profilerPath);
            requirePaths.shift();
            return ModuleUtils._lookForModule(requirePaths, moduleName, cb);
        });
    }
}
exports.default = ModuleUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3V0aWxzL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5QkFBd0I7QUFDeEIsK0JBQThCO0FBQzlCLDZCQUE0QjtBQUU1QixLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7QUFFbkI7SUFDRSxNQUFNLENBQU8sYUFBYSxDQUFFLFVBQVU7O1lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3RDLFdBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO29CQUVqRCxJQUFJLEdBQUcsRUFBRTt3QkFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUNsQixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFDbkI7b0JBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSztRQUM5QyxJQUFJLE1BQU0sQ0FBQTtRQUNWLElBQUk7WUFDRixJQUFJLElBQUksRUFBRTtnQkFDUixNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7YUFDL0M7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTthQUM3QjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixVQUFVLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQTtZQUN2RSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2hCLE9BQU8sQ0FBQyxDQUFBO1NBQ1Q7UUFFRCxLQUFLLENBQUMsR0FBRyxVQUFVLHVCQUF1QixDQUFFLENBQUE7UUFFNUMsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBRSxVQUFVLEVBQUUsRUFBRTtRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxLQUFLLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsRUFBQyxDQUFBO1FBRWhGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUE7UUFFekMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzFELENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVTtRQUNmLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQTtJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLGNBQWMsQ0FBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixLQUFLLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUE7WUFDckMsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUE7U0FDaEQ7UUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUUzRCxLQUFLLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFBO1FBRXpELEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHO1lBQzlELElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1IsS0FBSyxDQUFDLDRCQUE0QixFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQTtnQkFDN0QsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFBO2FBQzlCO1lBRUQsS0FBSyxDQUFDLDZCQUE2QixFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQTtZQUM5RCxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDcEIsT0FBTyxXQUFXLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDakUsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFsRUQsOEJBa0VDIn0=