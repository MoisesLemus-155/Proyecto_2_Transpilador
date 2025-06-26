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

}

export { Token, Type }