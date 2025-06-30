import { Type } from "../Analyzer/Token";
import { Production } from "./Production";

export type First = {
    production: Production;
    first: Type[];
}