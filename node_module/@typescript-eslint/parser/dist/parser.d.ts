import type { ScopeManager } from '@typescript-eslint/scope-manager';
import type { TSESTree } from '@typescript-eslint/types';
import type { AST, ParserServices } from '@typescript-eslint/typescript-estree';
import type { VisitorKeys } from '@typescript-eslint/visitor-keys';
import type * as ts from 'typescript';
import { ParserOptions } from '@typescript-eslint/types';
interface ESLintProgram extends AST<{
    comment: true;
    tokens: true;
}> {
    comments: TSESTree.Comment[];
    range: [number, number];
    tokens: TSESTree.Token[];
}
interface ParseForESLintResult {
    ast: ESLintProgram;
    scopeManager: ScopeManager;
    services: ParserServices;
    visitorKeys: VisitorKeys;
}
declare function parse(code: ts.SourceFile | string, options?: ParserOptions): ParseForESLintResult['ast'];
declare function parseForESLint(code: ts.SourceFile | string, parserOptions?: ParserOptions | null): ParseForESLintResult;
export { parse, parseForESLint, ParserOptions };
//# sourceMappingURL=parser.d.ts.map