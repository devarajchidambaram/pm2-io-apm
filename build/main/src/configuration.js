"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = require("debug");
debug_1.default('axm:configuration');
const transport_1 = require("./utils/transport");
const autocast_1 = require("./utils/autocast");
const path = require("path");
const fs = require("fs");
const util = require("util");
const prefix = __dirname.indexOf('/build/') >= 0 ? '../../../' : '../';
const pkg = require(prefix + '/package.json');
class Configuration {
    constructor() {
        this.transport = new transport_1.default();
    }
    configureModule(opts) {
        this.transport.send({
            type: 'axm:option:configuration',
            data: opts
        }, false);
    }
    findPackageJson() {
        require.main = this.getMain();
        if (!require.main) {
            return;
        }
        let pkgPath = path.resolve(path.dirname(require.main.filename), 'package.json');
        try {
            fs.statSync(pkgPath);
        }
        catch (e) {
            try {
                pkgPath = path.resolve(path.dirname(require.main.filename), '..', 'package.json');
                fs.statSync(pkgPath);
            }
            catch (e) {
                debug_1.default('Cannot find package.json');
                return null;
            }
            return pkgPath;
        }
        return pkgPath;
    }
    init(conf, doNotTellPm2) {
        const packageFilepath = this.findPackageJson();
        let packageJson;
        if (!conf.module_conf) {
            conf.module_conf = {};
        }
        if (conf.isModule == true) {
            /**
             * Merge package.json metadata
             */
            try {
                packageJson = require(packageFilepath || '');
                conf.module_version = packageJson.version;
                conf.module_name = packageJson.name;
                conf.description = packageJson.description;
                conf.pmx_version = null;
                if (pkg.version) {
                    conf.pmx_version = pkg.version;
                }
                if (packageJson.config) {
                    conf = util['_extend'](conf, packageJson.config);
                    conf.module_conf = packageJson.config;
                }
            }
            catch (e) {
                throw new Error(e);
            }
        }
        else {
            conf.module_name = process.env.name || 'outside-pm2';
            try {
                packageJson = require(packageFilepath || '');
                conf.module_version = packageJson.version;
                conf.pmx_version = null;
                if (pkg.version)
                    conf.pmx_version = pkg.version;
                if (packageJson.config) {
                    conf = util['_extend'](conf, packageJson.config);
                    conf.module_conf = packageJson.config;
                }
            }
            catch (e) {
            }
        }
        /**
         * If custom variables has been set, merge with returned configuration
         */
        try {
            if (process.env[conf.module_name]) {
                const castedConf = new autocast_1.default().autocast(JSON.parse(process.env[conf.module_name] || ''));
                conf = util['_extend'](conf, castedConf);
                // Do not display probe configuration in Keymetrics
                delete castedConf.probes;
                // This is the configuration variable modifiable from keymetrics
                conf.module_conf = JSON.parse(JSON.stringify(util['_extend'](conf.module_conf, castedConf)));
                // Obfuscate passwords
                Object.keys(conf.module_conf).forEach(function (key) {
                    if ((key === 'password' || key === 'passwd') &&
                        conf.module_conf[key].length >= 1) {
                        conf.module_conf[key] = 'Password hidden';
                    }
                });
            }
        }
        catch (e) {
            debug_1.default(e);
        }
        if (doNotTellPm2 === true)
            return conf;
        this.configureModule(conf);
        return conf;
    }
    getMain() {
        return require.main || { filename: './somefile.js' };
    }
}
exports.default = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQXlCO0FBQ3pCLGVBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0FBRTFCLGlEQUF5QztBQUN6QywrQ0FBdUM7QUFDdkMsNkJBQTRCO0FBQzVCLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFFNUIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0FBQ3RFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLENBQUE7QUFFN0M7SUFJRTtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUE7SUFDbEMsQ0FBQztJQUVELGVBQWUsQ0FBRSxJQUFJO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2xCLElBQUksRUFBRywwQkFBMEI7WUFDakMsSUFBSSxFQUFHLElBQUk7U0FDWixFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ1gsQ0FBQztJQUVELGVBQWU7UUFFYixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUU3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNqQixPQUFNO1NBQ1A7UUFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQTtRQUUvRSxJQUFJO1lBQ0YsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUNyQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lB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