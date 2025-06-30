import { Token, Type } from "./Token";

type ReserverWords = {
    lexeme: string;
    token: Type;
}

class LexicalAnalyze {
    private state: number;
    private auxChar: string;
    private row: number;
    private column: number;
    private tokenList: Token[];
    private errorList: Token[];
    private reservedWords: ReserverWords[];

    constructor() {
        this.row = 1;
        this.column = 1;
        this.auxChar = '';
        this.state = 0;
        this.tokenList = [];
        this.errorList = [];
        this.reservedWords = [
            { lexeme: 'using', token: Type.R_USING },
            { lexeme: 'System', token: Type.R_SYSTEM },
            { lexeme: 'public', token: Type.R_PUBLIC },
            { lexeme: 'class', token: Type.R_CLASS },
            { lexeme: 'static', token: Type.R_STATIC },
            { lexeme: 'void', token: Type.R_VOID },
            { lexeme: 'Main', token: Type.R_MAIN },
            { lexeme: 'string', token: Type.R_STRING },
            { lexeme: 'int', token: Type.R_INT },
            { lexeme: 'float', token: Type.R_FLOAT },
            { lexeme: 'char', token: Type.R_CHAR },
            { lexeme: 'bool', token: Type.R_BOOL },
            { lexeme: 'false', token: Type.R_FALSE },
            { lexeme: 'true', token: Type.R_TRUE },
            { lexeme: 'Console', token: Type.R_CONSOLE },
            { lexeme: 'WriteLine', token: Type.R_WRITELINE },
            { lexeme: 'if', token: Type.R_IF },
            { lexeme: 'else', token: Type.R_ELSE },
            { lexeme: 'for', token: Type.R_FOR }
        ];
    }

    scanner(input: string): Token[] {
        input += '#';
        let char: string;
        for (let i: number = 0; i < input.length; i++) {
            char = input[i];
            switch (this.state) {
                case 0:
                    switch (char) {
                        case '(':
                            this.state = 1;
                            this.addCharacter(char);
                            break;
                        case ')':
                            this.state = 2;
                            this.addCharacter(char);
                            break;
                        case '[':
                            this.state = 3;
                            this.addCharacter(char);
                            break;
                        case ']':
                            this.state = 4;
                            this.addCharacter(char);
                            break;
                        case '{':
                            this.state = 5;
                            this.addCharacter(char);
                            break;
                        case '}':
                            this.state = 6;
                            this.addCharacter(char);
                            break;
                        case ';':
                            this.state = 7;
                            this.addCharacter(char);
                            break;
                        case ',':
                            this.state = 8;
                            this.addCharacter(char);
                            break;
                        case '.':
                            this.state = 9;
                            this.addCharacter(char);
                            break;
                        case '=':
                            this.state = 10;
                            this.addCharacter(char);
                            break;
                        case '+':
                            this.state = 12;
                            this.addCharacter(char);
                            break;
                        case '-':
                            this.state = 14;
                            this.addCharacter(char);
                            break;
                        case '*':
                            this.state = 16;
                            this.addCharacter(char);
                            break;
                        case '!':
                            this.state = 17;
                            this.addCharacter(char);
                            break;
                        case '<':
                            this.state = 19;
                            this.addCharacter(char);
                            break;
                        case '>':
                            this.state = 21;
                            this.addCharacter(char);
                            break;
                        case '/':
                            this.state = 23;
                            this.addCharacter(char);
                            break;
                        case "'":
                            this.state = 28;
                            this.addCharacter(char);
                            break;
                        case '"':
                            this.state = 31;
                            this.addCharacter(char);
                            break;
                        case ' ':
                            this.column++;
                            break;
                        case '\n':
                            this.row++;
                            this.column = 1;
                            break;
                        case '\r':
                            if (input[i + 1] === '\n') {
                                i++;
                            }
                            this.row++;
                            this.column = 1;
                            break;
                        case '\t':
                            this.column += 4;
                            break;
                        default:
                            if (/[a-zA-Z]/.test(char)) {
                                // es una letra
                                this.state = 36;
                                this.addCharacter(char)
                                continue;
                            }
                            if (/\d/.test(char)) {
                                // es un dígito
                                this.state = 33;
                                this.addCharacter(char);
                                continue;
                            }
                            if (char == '#' && i == input.length - 1) {
                                // Se termino el analisis
                                console.log("Analyze Finished");
                            } else {
                                // Error Léxico
                                this.addError(Type.UNKNOW, char, this.row, this.column);
                                this.column++;
                            }
                            break;
                    }
                    break;
                case 1:
                    //aceptación
                    this.addToken(Type.PAR_O, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 2:
                    //aceptación
                    this.addToken(Type.PAR_C, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 3:
                    // aceptación
                    this.addToken(Type.BRA_O, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 4:
                    //acpetación
                    this.addToken(Type.BRA_C, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 5:
                    //aceptación
                    this.addToken(Type.KEY_O, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 6:
                    this.addToken(Type.KEY_C, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 7:
                    // aceptación
                    this.addToken(Type.SEMICOLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 8:
                    this.addToken(Type.COMMA, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 9:
                    this.addToken(Type.PERIOD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 10:
                    if (char === '=') {
                        this.state = 11; // Estado para ==
                        this.addCharacter(char);
                        continue;
                    } else {
                        //aceptación
                        this.addToken(Type.ASSIGN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 11:
                    //aceptación
                    this.addToken(Type.EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 12:
                    if (char === '+') {
                        this.state = 13; // Estado para ++
                        this.addCharacter(char);
                        continue;
                    } else {
                        //aceptación
                        this.addToken(Type.PLUS, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 13:
                    //aceptación
                    this.addToken(Type.INC, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 14:
                    if (char === '-') {
                        this.state = 15; // Estado para --
                        this.addCharacter(char);
                        continue;
                    } else {
                        //aceptación
                        this.addToken(Type.MINUS, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 15:
                    //aceptación
                    this.addToken(Type.DEC, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 16:
                    //aceptación
                    this.addToken(Type.MULT, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 17:
                    if (char === '=') {
                        this.state = 18; // Estado para !=
                        this.addCharacter(char);
                        continue;
                    } else {
                        //aceptación
                        this.addToken(Type.DIFF, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 18:
                    //aceptación
                    this.addToken(Type.DIFF, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 19:
                    if (char === '=') {
                        this.state = 20; // Estado para <=
                        this.addCharacter(char);
                        continue;
                    } else {
                        //aceptación
                        this.addToken(Type.LESS, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 20:
                    //aceptación
                    this.addToken(Type.LESS_EQ, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 21:
                    if (char === '=') {
                        this.state = 22; // Estado para >=
                        this.addCharacter(char);
                        continue;
                    } else {
                        //aceptación
                        this.addToken(Type.GREATER, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 22:
                    //aceptación
                    this.addToken(Type.GREATER_EQ, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 23:
                    if (char === '/') {
                        this.state = 24; // Estado para comentario de una línea
                        this.addCharacter(char);
                        continue;
                    } else if (char === '*') {
                        this.state = 25; // Estado para comentario de varias líneas
                        this.addCharacter(char);
                        continue;
                    } else {
                        //aceptación
                        this.addToken(Type.DIV, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 24:
                    // Estado final para comentario de una sola línea
                    if (char === '\n' || char === '\r' || char === '#') {
                        // Aceptación: agregar el token de comentario de una sola línea
                        this.addToken(Type.COMMENT, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--; // Reprocesar el salto de línea o fin de archivo
                    } else {
                        this.addCharacter(char);
                    }
                    break;
                case 25:
                    if (char === '*') {
                        this.state = 26; // Estado para comentario de varias líneas
                        this.addCharacter(char);
                        continue;
                    }
                    if (char === '\n') {
                        this.row++;
                        this.column = 1;
                    } else if (char === '\r') {
                        if (input[i + 1] === '\n') {
                            i++;
                        }
                        this.row++;
                        this.column = 1;
                    }
                    this.addCharacter(char);
                    break;
                case 26:
                    if (char === '/') {
                        this.state = 27; // Estado para fin de comentario de varias líneas
                        this.addCharacter(char);
                        continue;
                    }
                    if (char === '*') {
                        // sigue siendo parte del comentario de varias líneas
                        this.addCharacter(char);
                        continue;
                    }
                    // Error léxico
                    this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 27:
                    //aceptación
                    this.addToken(Type.MULTICOMMENT, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 28:
                    if (char != "'") {
                        this.addCharacter(char);
                        this.state = 29;
                        continue;
                    }
                    this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 29:
                    if (char == "'") {
                        this.addCharacter(char);
                        this.state = 30;
                        continue;
                    }
                    this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 30:
                    // Aceptación
                    this.addToken(Type.CHAR, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 31:
                    if (char === '"') {
                        this.addCharacter(char);
                        this.state = 32;
                    } else if (char === '#' || char === '\n') {
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    } else {
                        this.addCharacter(char);
                    }
                    break;
                case 32:
                    this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 33:
                    if (/\d/.test(char)) {
                        this.addCharacter(char);
                        continue;
                    } else if (char === '.') {
                        this.state = 34; // Estado para número decimal
                        this.addCharacter(char);
                        continue;
                    }
                    this.addToken(Type.INTEGER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 34:
                    if (/\d/.test(char)) {
                        this.state = 35; // Estado para número decimal
                        this.addCharacter(char);
                        continue;
                    }
                    // Error léxico
                    this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 35:
                    if (/\d/.test(char)) {
                        this.addCharacter(char);
                        continue;
                    }
                    //aceptación
                    this.addToken(Type.DECIMAL, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 36:
                    //aceptación
                    if (/[A-Za-z0-9_]/.test(char)) {
                        // sigue siendo parte del identificador
                        this.addCharacter(char);
                        continue;
                    }
                    let word: ReserverWords | undefined = this.reservedWords.find(token => token.lexeme === this.auxChar);

                    if (word) {
                        this.addToken(word.token, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addToken(Type.IDENTIFIER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                default:
                    break;
            }
        }
        return this.tokenList;
    }


    private addCharacter(char: string) {
        this.auxChar += char;
        this.column++;
    }

    private clean() {
        this.state = 0;
        this.auxChar = '';
    }

    private addToken(type: Type, lexeme: string, row: number, column: number) {
        this.tokenList.push(new Token(type, lexeme, row, column));
    }

    private addError(type: Type, lexeme: string, row: number, column: number) {
        this.errorList.push(new Token(type, lexeme, row, column));
    }

    getErrorList(): Token[] {
        return this.errorList;
    }

    getTokenList(): Token[] {
        return this.tokenList;
    }

}

export { LexicalAnalyze }