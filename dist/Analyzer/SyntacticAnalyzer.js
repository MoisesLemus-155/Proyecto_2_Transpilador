"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntacticAnalyzer = void 0;
class SyntacticAnalyzer {
    constructor(tokens) {
        this.index = 0;
        this.tokens = tokens;
    }
    parse() {
        const nodes = [];
        while (this.index < this.tokens.length) {
            const node = this.parseStatement();
            if (node)
                nodes.push(node);
            else
                break; // por ahora simple
        }
        return nodes;
    }
    parseStatement() {
        const current = this.peek();
        // Ejemplo: declaración "int x;"
        if ((current === null || current === void 0 ? void 0 : current.getTypeTokenString()) === 'T_INT') {
            this.next(); // consume int
            const identifier = this.next();
            this.expect('T_SEMICOLON');
            return {
                type: 'Declaracion',
                children: [
                    { type: 'Tipo', value: 'int' },
                    { type: 'Identificador', value: identifier.getLexeme() }
                ]
            };
        }
        // Ejemplo: asignación "x = 5;"
        if ((current === null || current === void 0 ? void 0 : current.getTypeTokenString()) === 'T_IDENTIFIER') {
            const id = this.next();
            this.expect('T_ASSIGN');
            const value = this.next(); // simple: un literal o identificador
            this.expect('T_SEMICOLON');
            return {
                type: 'Asignacion',
                children: [
                    { type: 'Identificador', value: id.getLexeme() },
                    { type: 'Valor', value: value.getLexeme() }
                ]
            };
        }
        return null;
    }
    peek() {
        return this.tokens[this.index];
    }
    next() {
        return this.tokens[this.index++];
    }
    expect(expectedType) {
        const token = this.next();
        if (token.getTypeTokenString() !== expectedType) {
            throw new Error(`Error sintáctico: se esperaba ${expectedType} pero se encontró ${token.getTypeToken()}`);
        }
    }
}
exports.SyntacticAnalyzer = SyntacticAnalyzer;
