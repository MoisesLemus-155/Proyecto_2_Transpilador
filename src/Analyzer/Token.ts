enum Type {
    UNKNOW,
    PAR_OPEN, // (
    PAR_CLOSE, // )
    BRACK_OPEN, // [
    BRACK_CLOSE, // ]
    BRACE_OPEN, // {
    BRACE_CLOSE, // }
    SEMICOLON, // ;
    COMMA, // ,
    PERIOD, // .
    ASSIGN, // =
    PLUS, // +
    MINUS, // -
    MULTIPLY, // *
    DIVIDE, // /
    EQUAL, // ==
    INC, // ++
    DEC, // --
    DIFFERENT, // !=
    LESS_THAN, // <
    GREATER_THAN, // >
    LESS_EQUAL, // <=
    GREATER_EQUAL, // >=
    IDENTIFIER, // identifier
    INTEGER, // integer
    DECIMAL, // decimal
    COMMENT, // comment
    MULTICOMMENT, // multiline comment
    STRING, // string
    CHAR, // character
    RESERVERD_WORD,
    R_USING, // using
    R_SYSTEM, // system
    R_PUBLIC, // public
    R_CLASS, // class
    R_STATIC, // static
    R_VOID, // void
    R_MAIN, // main
    R_STRING, // string
    R_INT, // int
    R_FLOAT, // float
    R_CHAR, // char
    R_BOOL, // bool
    R_FALSE, // false
    R_TRUE, // true
    R_CONSOLE, // console
    R_WRITELINE, // writeline
    R_IF, // if
    R_ELSE, // else
    R_FOR, // for
}

class Token {

    private row: number;
    private column: number;
    private lexeme: string;
    private typeToken: Type;
    private typeTokenString: string;

    constructor(typeToken: Type, lexeme: string, row: number, column: number) {
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken];
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }
    
    public getTypeToken(): Type {
        return this.typeToken;
    }
    public getTypeTokenString(): string {
        return this.typeTokenString;
    }
    public getLexeme(): string {
        return this.lexeme;
    }

}

export { Token, Type }