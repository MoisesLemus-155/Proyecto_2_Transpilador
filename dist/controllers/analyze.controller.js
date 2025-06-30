"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpileCode = exports.analyze = void 0;
const LexicalAnalyzer_1 = require("../Analyzer/LexicalAnalyzer");
const SyntacticAnalyzer_1 = require("../Analyzer/SyntacticAnalyzer");
const Transpiler_1 = require("../Analyzer/Transpiler");
const analyze = (req, res) => {
    const data = req.body;
    const lexicalAnalyzer = new LexicalAnalyzer_1.LexicalAnalyze();
    const tokenList = lexicalAnalyzer.scanner(data);
    const errorList = lexicalAnalyzer.getErrorList();
    res.json({
        tokens: tokenList,
        errors: errorList,
    });
};
exports.analyze = analyze;
const transpileCode = (req, res) => {
    const data = req.body;
    const lexicalAnalyzer = new LexicalAnalyzer_1.LexicalAnalyze();
    const tokenList = lexicalAnalyzer.scanner(data);
    const errorList = lexicalAnalyzer.getErrorList();
    if (errorList.length > 0) {
        return res.status(400).json({ errors: errorList });
    }
    const parser = new SyntacticAnalyzer_1.SyntacticAnalyzer(tokenList);
    const ast = parser.parse();
    const tsCode = (0, Transpiler_1.transpile)(ast);
    res.json({
        tokens: tokenList,
        ast,
        tsCode
    });
    // try {
    //     const parser = new SyntacticAnalyzer(tokenList);
    //     const ast = parser.parse();
    //     const tsCode = transpile(ast);
    //     res.json({
    //         tokens: tokenList,
    //         ast,
    //         tsCode
    //     });
    // } catch (e) {
    //     res.status(500).json({ error: (e as Error).message });
    // }
};
exports.transpileCode = transpileCode;
