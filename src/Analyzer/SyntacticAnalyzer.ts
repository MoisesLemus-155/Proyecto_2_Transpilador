import { Error } from "./Error";
import { Token, Type } from "./Token";

type First = {
    production: Production;
    first: Type[];
}

enum Production{
    PROGRAM,
    BLOCK_USING,
    CLASS,
    BLOCK_MAIN,
    LIST_INSTRUCTIONS,
    LIST_INSTRUCTIONS_P,
    INSTRUCTION,
    DECLARATION,
    TYPE,
    LIST_ID,
    ID_ASIGN,
    ID_ASIGN_P,
    LIST_ID_P,
    ASSIGNATION,
    PRINT,
    INSTR_IF,
    INST_IF_P,
    INSTR_FOR,
    FIRST_BLOCK_FOR,
    THIRD_BLOCK_FOR,
    THIRD_BLOCK_FOR_P,
    INCREMENT,
    DECREMENT,
    EXPRESSION,
    RELATIONAL,
    ARITMETIC,
    ARITMETIC_P,
    TERM,
    TERM_P,
    FACTOR
}

export class SyntacticAnalyzer {

    private tokens: Token[];
    private pos: number;
    private errors: Error[];
    // private flagError: bollean;
    private preAnalysis: Token;
    private firsts: First[];

    constructor(tokens: Token[]) {
        this.errors = [];
        this.pos = 0;
        this.tokens = tokens;
        // this.flagError = false;
        this.firsts = [
            {production: Production.INSTRUCTION, first: []},
            {production: Production.LIST_INSTRUCTIONS_P, first: []},
            {production: Production.ID_ASIGN_P, first: []},
            {production: Production.LIST_ID_P, first: []},
            {production: Production.INST_IF_P, first: []},
            {production: Production.FIRST_BLOCK_FOR, first: []},
            {production: Production.THIRD_BLOCK_FOR_P, first: []},
            {production: Production.ARITMETIC, first: []},
            {production: Production.ARITMETIC_P, first: []},
            {production: Production.RELATIONAL, first: []},
            {production: Production.TERM_P, first: []},
            {production: Production.FACTOR, first: [Type.PAR_OPEN, Type.IDENTIFIER, Type.INTEGER, Type.DECIMAL, Type.STRING, Type.CHAR, Type.R_FALSE, Type.R_TRUE ]},
        ];
        this.preAnalysis = this.tokens[this.pos];
        // this.initializeFirsts();
    }


    public parser(){

    }

    private blockUsing(){

    }

    private class (){

    }

    private blockMain(){

    }

    private listInstrctions(){

    }

    private listInstructionsP(){

    }

    private instruction(){

    }

    private declaration(){

    }

    private type(){

    }

    private listId(){

    }

    private idAsign(){

    }

    private idAsignP(){

    }

    private listIdP(){

    }

    private assignation(){

    }

    private print (){

    }

    private instrIf (){

    }

    private instIfP(){

    }

    private instrFor(){

    }

    private firstBlockFor(){

    }

    private thirdBlockFor(){

    }

    private thirdBlockForP(){

    }

    private increment(){

    }

    private decrement(){

    }

    private expression(){

    }

    private relational(){

    }

    private aritmetic(){

    }

    private aritmeticP(){

    }

    private term(){

    }

    private termP(){

    }

    private factor(){

    }

}