import { Token, Type } from "./Token";

class LexicalAnalyze {

    private row: number;
    private column: number;
    private auxChar: string;
    private state: number;
    private tokenList: Token[];
    private errorList: Token[];
    private reserverdWords: string[];

    constructor() {
        this.row = 1;
        this.column = 1;
        this.auxChar = '';
        this.state = 0;
        this.tokenList = [];
        this.errorList = [];
        this.reserverdWords = ['int', 'bool', 'false', 'true', 'float', 'string', 'char', 'if', 'else', 'for', 'void', 'Console', 'WriteLine', 'class', 'static', 'Main', 'using', 'System', 'public'];
    }

    scanner(input: string) {
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
                    this.addToken(Type.PAR_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 2:
                    //aceptación
                    this.addToken(Type.PAR_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 3:
                    // aceptación
                    this.addToken(Type.BRACK_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 4:
                    //acpetación
                    this.addToken(Type.BRACK_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 5:
                    //aceptación
                    this.addToken(Type.BRACE_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 6:
                    this.addToken(Type.BRACE_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
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
                    this.addToken(Type.MULTIPLY, this.auxChar, this.row, this.column - this.auxChar.length);
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
                        this.addToken(Type.DIFFERENT, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 18:
                    //aceptación
                    this.addToken(Type.DIFFERENT, this.auxChar, this.row, this.column - this.auxChar.length);
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
                        this.addToken(Type.LESS_THAN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 20:
                    //aceptación
                    this.addToken(Type.LESS_EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
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
                        this.addToken(Type.GREATER_THAN, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 22:
                    //aceptación
                    this.addToken(Type.GREATER_EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
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
                        this.addToken(Type.DIVIDE, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 24:
                    //aceptación
                    this.addToken(Type.COMMENT, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
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
                    if (char === "'") {
                        this.state = 29; // Estado para aceptación de carácter
                        this.addCharacter(char);
                        continue;
                    } else {
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break
                case 29:
                    //aceptación
                    this.addToken(Type.CHAR, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 30:
                    if (char === "'") {
                        this.state = 29; // Estado para aceptación de carácter
                        this.addCharacter(char);
                        continue;
                    }
                    if (char === '\n' || char === '\r') {
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    } else {
                        // sigue siendo parte del carácter
                        this.addCharacter(char);
                    }
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
                    if (/[A-Za-z0-9]/.test(char)) {
                        // sigue siendo parte del identificador
                        this.addCharacter(char);
                        continue;
                    }
                    if (this.reserverdWords.includes(this.auxChar)) {
                        this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    // Error léxico
                    this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
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

    getErrorList() {
        return this.errorList;
    }

}

export { LexicalAnalyze }