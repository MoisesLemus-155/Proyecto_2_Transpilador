import { Request, Response } from "express";
import { Token, Type } from "../Analyzer/Token";
import { SyntacticAnalyzer } from "../Analyzer/SyntacticAnalyzer";
import { Error } from "../Analyzer/Error";
import { Transpiler } from "../Analyzer/Transpiler";
import { Instruction } from "../models/abstract/Instruction";
import { LexicalAnalyze } from "../Analyzer/LexicalAnalyzer";

export const home = (req: Request, res: Response) => {
    res.render('pages/index');
}

export const analyze = (req: Request, res: Response) => {
    const body = req.body.input;
    let scanner: LexicalAnalyze = new LexicalAnalyze();
    let tokenList: Token[] = scanner.scanner(body);
    let parser: SyntacticAnalyzer;
    let errorParser: Error[] = [];
    let transpiler: Transpiler;
    let code: string = '';
    parser = new SyntacticAnalyzer(tokenList);
    parser.parser();
    errorParser = parser.getErrors();
    if (errorParser.length == 0) {
        transpiler = new Transpiler(tokenList);
        transpiler.parser();
        transpiler.getInstructions().forEach((instruction: Instruction) => {
            code += instruction.transpiler();
        });
    }
    res.json({
        tokens: tokenList,
        errors: scanner.getErrorList(),
        syntacticErrors: errorParser,
        traduction: code,
    });
}
