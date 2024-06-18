"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
const generateId = (entity) => entity.length > 0 ? Math.max(...entity.map((e) => e.id)) : 0;
exports.generateId = generateId;
