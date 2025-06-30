import { Request, Response } from 'express';
import { LexicalAnalyze } from '../Analyzer/LexicalAnalyzer';


export const analyze = (req: Request, res: Response) => {
    const data = req.body;
    const lexicalAnalyzer = new LexicalAnalyze();
    const tokenList = lexicalAnalyzer.scanner(data);
    const errorList = lexicalAnalyzer.getErrorList();
    res.json({
        tokens: tokenList,
        errors: errorList,
    });
};




