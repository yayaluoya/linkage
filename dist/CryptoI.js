"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoI = void 0;
const Crypto_1 = require("yayaluoya-tool/dist/Crypto");
const instanceTool_1 = require("yayaluoya-tool/dist/instanceTool");
/**
 * 加密用工具实例
 */
let CryptoI = class CryptoI extends Crypto_1.Crypto {
    constructor() {
        super('asdfwerfasdfsdfasdfqwerqwerqweqw', 'fasdfasdfasdfasd');
    }
};
CryptoI = __decorate([
    (0, instanceTool_1.instanceTool)()
], CryptoI);
exports.CryptoI = CryptoI;