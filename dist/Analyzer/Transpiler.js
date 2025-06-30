"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpile = transpile;
function transpile(ast) {
    var _a, _b, _c, _d, _e;
    let output = '';
    for (const node of ast) {
        if (node.type === 'Declaracion') {
            const tipo = ((_a = node.children) === null || _a === void 0 ? void 0 : _a[0].value) === 'int' ? 'number' : (_b = node.children) === null || _b === void 0 ? void 0 : _b[0].value;
            const id = (_c = node.children) === null || _c === void 0 ? void 0 : _c[1].value;
            output += `let ${id}: ${tipo};\n`;
        }
        if (node.type === 'Asignacion') {
            const id = (_d = node.children) === null || _d === void 0 ? void 0 : _d[0].value;
            const val = (_e = node.children) === null || _e === void 0 ? void 0 : _e[1].value;
            output += `${id} = ${val};\n`;
        }
    }
    return output;
}
