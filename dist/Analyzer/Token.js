"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.Token = void 0;
var Type;
(function (Type) {
    Type[Type["UNKNOW"] = 0] = "UNKNOW";
    Type[Type["PAR_OPEN"] = 1] = "PAR_OPEN";
    Type[Type["PAR_CLOSE"] = 2] = "PAR_CLOSE";
    Type[Type["BRACK_OPEN"] = 3] = "BRACK_OPEN";
    Type[Type["BRACK_CLOSE"] = 4] = "BRACK_CLOSE";
    Type[Type["BRACE_OPEN"] = 5] = "BRACE_OPEN";
    Type[Type["BRACE_CLOSE"] = 6] = "BRACE_CLOSE";
    Type[Type["SEMICOLON"] = 7] = "SEMICOLON";
    Type[Type["COMMA"] = 8] = "COMMA";
    Type[Type["PERIOD"] = 9] = "PERIOD";
    Type[Type["ASSIGN"] = 10] = "ASSIGN";
    Type[Type["PLUS"] = 11] = "PLUS";
    Type[Type["MINUS"] = 12] = "MINUS";
    Type[Type["MULTIPLY"] = 13] = "MULTIPLY";
    Type[Type["DIVIDE"] = 14] = "DIVIDE";
    Type[Type["EQUAL"] = 15] = "EQUAL";
    Type[Type["INC"] = 16] = "INC";
    Type[Type["DEC"] = 17] = "DEC";
    Type[Type["DIFFERENT"] = 18] = "DIFFERENT";
    Type[Type["LESS_THAN"] = 19] = "LESS_THAN";
    Type[Type["GREATER_THAN"] = 20] = "GREATER_THAN";
    Type[Type["LESS_EQUAL"] = 21] = "LESS_EQUAL";
    Type[Type["GREATER_EQUAL"] = 22] = "GREATER_EQUAL";
    Type[Type["IDENTIFIER"] = 23] = "IDENTIFIER";
    Type[Type["INTEGER"] = 24] = "INTEGER";
    Type[Type["DECIMAL"] = 25] = "DECIMAL";
    Type[Type["COMMENT"] = 26] = "COMMENT";
    Type[Type["MULTICOMMENT"] = 27] = "MULTICOMMENT";
    Type[Type["STRING"] = 28] = "STRING";
    Type[Type["CHAR"] = 29] = "CHAR";
    Type[Type["RESERVERD_WORD"] = 30] = "RESERVERD_WORD";
})(Type || (exports.Type = Type = {}));
class Token {
    constructor(typeToken, lexeme, row, column) {
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken];
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }
    getTypeToken() {
        return this.typeToken;
    }
    getTypeTokenString() {
        return this.typeTokenString;
    }
    getLexeme() {
        return this.lexeme;
    }
}
exports.Token = Token;
