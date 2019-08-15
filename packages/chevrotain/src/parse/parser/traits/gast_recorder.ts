import {
    AtLeastOneSepMethodOpts,
    ConsumeMethodOpts,
    DSLMethodOpts,
    DSLMethodOptsWithErr,
    GrammarAction,
    IAnyOrAlt,
    IParserConfig,
    IProduction,
    IToken,
    ManySepMethodOpts,
    OrMethodOpts,
    SubruleMethodOpts,
    TokenType
} from "../../../../api"
import { forEach, has, isArray, isFunction, peek } from "../../../utils/utils"
import { MixedInParser } from "./parser_traits"
import {
    Alternation,
    Flat,
    NonTerminal,
    Option,
    Repetition,
    RepetitionMandatory,
    RepetitionMandatoryWithSeparator,
    RepetitionWithSeparator,
    Rule,
    Terminal
} from "../../grammar/gast/gast_public"
import { Lexer } from "../../../scan/lexer_public"
import { augmentTokenTypes } from "../../../scan/tokens"
import { createToken, createTokenInstance } from "../../../scan/tokens_public"
import { END_OF_FILE } from "../parser"

type ProdWithDef = IProduction & { definition?: IProduction[] }
const RECORDING_NULL_OBJECT = {
    description: "This Object indicates the Parser is during Recording Phase"
}
Object.freeze(RECORDING_NULL_OBJECT)

const HANDLE_SEPARATOR = true
const RFT = createToken({ name: "RECORDING_PHASE_TOKEN", pattern: Lexer.NA })
augmentTokenTypes([RFT])
const RECORDING_PHASE_TOKEN = createTokenInstance(
    RFT,
    "This IToken indicates the Parser is in Recording Phase",
    // Using "-1" instead of NaN (as in EOF) because an actual number is less likely to
    // cause errors if the output of LA or CONSUME would be (incorrectly) used during the recording phase.
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
)
Object.freeze(RECORDING_PHASE_TOKEN)

/**
 * This trait handles the creation of the GAST structure for Chevrotain Grammars
 */
// TODO: do we need to override any other methods here? (BACKTrack? LA?)
export class GastRecorder {
    prodStack: ProdWithDef[]
    ACTION_ORG: MixedInParser["ACTION"]
    BACKTRACK_ORG: MixedInParser["BACKTRACK"]
    LA_ORG: MixedInParser["LA"]
    optionInternalOrg: MixedInParser["optionInternal"]
    atLeastOneInternalOrg: MixedInParser["atLeastOneInternal"]
    atLeastOneSepFirstInternalOrg: MixedInParser["atLeastOneSepFirstInternal"]
    manyInternalOrg: MixedInParser["manyInternal"]
    manySepFirstInternalOrg: MixedInParser["manySepFirstInternal"]
    orInternalOrg: MixedInParser["orInternal"]
    subruleInternalOrg: MixedInParser["subruleInternal"]
    consumeInternalOrg: MixedInParser["consumeInternal"]
    RECORDING_PHASE: boolean

    // TODO: would this break overloading scenarios?
    //   so we should move this to enableRecording method?
    initGastRecorder(this: MixedInParser, config: IParserConfig): void {
        this.prodStack = []
        this.ACTION_ORG = this.ACTION
        this.BACKTRACK_ORG = this.BACKTRACK
        this.LA_ORG = this.LA
        this.optionInternalOrg = this.optionInternal
        this.atLeastOneInternalOrg = this.atLeastOneInternal
        this.atLeastOneSepFirstInternalOrg = this.atLeastOneSepFirstInternal
        this.manyInternalOrg = this.manyInternal
        this.manySepFirstInternalOrg = this.manySepFirstInternal
        this.orInternalOrg = this.orInternal
        this.subruleInternalOrg = this.subruleInternal
        this.consumeInternalOrg = this.consumeInternal
        this.RECORDING_PHASE = false
    }

    enableRecording(this: MixedInParser): void {
        this.RECORDING_PHASE = true
        this.ACTION = this.ACTION_RECORD
        this.BACKTRACK = this.BACKTRACK_RECORD
        this.LA = this.LA_RECORD
        this.optionInternal = this.optionInternalRecord
        this.atLeastOneInternal = this.atLeastOneInternalRecord
        this.atLeastOneSepFirstInternal = this.atLeastOneSepFirstInternalRecord
        this.manyInternal = this.manyInternalRecord
        this.manySepFirstInternal = this.manySepFirstInternalRecord
        this.orInternal = this.orInternalRecord
        this.subruleInternal = this.subruleInternalRecord
        this.consumeInternal = this.consumeInternalRecord
    }

    disableRecording(this: MixedInParser) {
        this.RECORDING_PHASE = false
        this.ACTION = this.ACTION_ORG
        this.BACKTRACK = this.BACKTRACK_ORG
        this.LA = this.LA_ORG
        this.optionInternal = this.optionInternalOrg
        this.atLeastOneInternal = this.atLeastOneInternalOrg
        this.atLeastOneSepFirstInternal = this.atLeastOneSepFirstInternalOrg
        this.manyInternal = this.manyInternalOrg
        this.manySepFirstInternal = this.manySepFirstInternalOrg
        this.orInternal = this.orInternalOrg
        this.subruleInternal = this.subruleInternalOrg
        this.consumeInternal = this.consumeInternalOrg
    }

    // TODO: is there any way to use this method to check no
    //   Parser methods are called inside an ACTION?
    ACTION_RECORD<T>(this: MixedInParser, impl: () => T): T {
        // NO-OP during recording
        return
    }

    // Executing backtracking logic will break our recording logic assumptions
    BACKTRACK_RECORD<T>(
        grammarRule: (...args: any[]) => T,
        args?: any[]
    ): () => boolean {
        return () => true
    }

    // LA is part of the official API and may be used for custom lookahead logic
    LA_RECORD(howMuch: number): IToken {
        // We cannot use the RECORD_PHASE_TOKEN here because someone may depend
        // On LA return EOF at the end of the input so an infinite loop may occur.
        return END_OF_FILE
    }

    topLevelRuleRecord(name: string, def: Function): Rule {
        const newTopLevelRule = new Rule({ definition: [], name: name })
        newTopLevelRule.name = name
        this.prodStack.push(newTopLevelRule)
        def.call(this)
        this.prodStack.pop()
        return newTopLevelRule
    }

    // Implementation of parsing DSL
    optionInternalRecord<OUT>(
        this: MixedInParser,
        actionORMethodDef: GrammarAction<OUT> | DSLMethodOpts<OUT>,
        occurrence: number
    ): OUT {
        return recordProd.call(this, Option, actionORMethodDef, occurrence)
    }

    atLeastOneInternalRecord<OUT>(
        this: MixedInParser,
        occurrence: number,
        actionORMethodDef: GrammarAction<OUT> | DSLMethodOptsWithErr<OUT>
    ): void {
        recordProd.call(
            this,
            RepetitionMandatory,
            actionORMethodDef,
            occurrence
        )
    }

    atLeastOneSepFirstInternalRecord<OUT>(
        this: MixedInParser,
        occurrence: number,
        options: AtLeastOneSepMethodOpts<OUT>
    ): void {
        recordProd.call(
            this,
            RepetitionMandatoryWithSeparator,
            options,
            occurrence,
            HANDLE_SEPARATOR
        )
    }

    manyInternalRecord<OUT>(
        this: MixedInParser,
        occurrence: number,
        actionORMethodDef: GrammarAction<OUT> | DSLMethodOpts<OUT>
    ): void {
        recordProd.call(this, Repetition, actionORMethodDef, occurrence)
    }

    manySepFirstInternalRecord<OUT>(
        this: MixedInParser,
        occurrence: number,
        options: ManySepMethodOpts<OUT>
    ): void {
        recordProd.call(
            this,
            RepetitionWithSeparator,
            options,
            occurrence,
            HANDLE_SEPARATOR
        )
    }

    orInternalRecord<T>(
        this: MixedInParser,
        altsOrOpts: IAnyOrAlt[] | OrMethodOpts,
        occurrence: number
    ): T {
        return recordOrProd.call(this, altsOrOpts, occurrence)
    }

    subruleInternalRecord<T>(
        this: MixedInParser,
        ruleToCall: (idx: number) => T,
        occurrence: number,
        options?: SubruleMethodOpts
    ): T {
        if (!ruleToCall || has(ruleToCall, "ruleName") === false) {
            // TODO: add comment about user looking into the stack trace to see exactly where the issue is
            throw new Error(
                `<SUBRULE${
                    occurrence !== 0 ? occurrence : ""
                }> argument is invalid` +
                    ` expecting a Parser method reference but got: <${JSON.stringify(
                        ruleToCall
                    )}>` +
                    `\n inside top level rule: <${
                        (<Rule>this.prodStack[0]).name
                    }>`
            )
        }

        const prevProd: any = peek(this.prodStack)
        const ruleName = ruleToCall["ruleName"]
        const newNoneTerminal = new NonTerminal({
            idx: occurrence,
            nonTerminalName: ruleName,
            // The resolving of the `referencedRule` property will be done once all the Rule's GASTs have been created
            referencedRule: undefined
        })
        prevProd.definition.push(newNoneTerminal)

        // TODO: do we want to return an empty CSTNOde if CST building is enabled?
        return <any>RECORDING_NULL_OBJECT
    }

    consumeInternalRecord(
        this: MixedInParser,
        tokType: TokenType,
        occurrence: number,
        options: ConsumeMethodOpts
    ): IToken {
        const prevProd: any = peek(this.prodStack)
        const newNoneTerminal = new Terminal({
            idx: occurrence,
            terminalType: tokType
        })
        prevProd.definition.push(newNoneTerminal)

        // TODO: Custom Recording Token
        return RECORDING_PHASE_TOKEN
    }
}

function recordProd(
    prodConstructor: any,
    mainProdArg: any,
    occurrence: number,
    handleSep: boolean = false
): any {
    const prevProd: any = peek(this.prodStack)
    const grammarAction = isFunction(mainProdArg)
        ? mainProdArg
        : mainProdArg.DEF

    const newProd = new prodConstructor({ definition: [], idx: occurrence })
    if (has(mainProdArg, "NAME")) {
        newProd.name = mainProdArg.NAME
    }
    if (handleSep) {
        newProd.separator = mainProdArg.SEP
    }

    this.prodStack.push(newProd)
    grammarAction.call(this)
    prevProd.definition.push(newProd)
    this.prodStack.pop()

    return RECORDING_NULL_OBJECT
}

function recordOrProd(mainProdArg: any, occurrence: number): any {
    const prevProd: any = peek(this.prodStack)
    const alts = isArray(mainProdArg) ? mainProdArg : mainProdArg.DEF

    const newOrProd = new Alternation({ definition: [], idx: occurrence })
    if (has(mainProdArg, "NAME")) {
        newOrProd.name = mainProdArg.NAME
    }
    prevProd.definition.push(newOrProd)

    forEach(alts, currAlt => {
        const currAltFlat = new Flat({ definition: [] })
        newOrProd.definition.push(currAltFlat)
        if (has(currAlt, "NAME")) {
            currAltFlat.name = currAlt.NAME
        }
        this.prodStack.push(currAltFlat)
        currAlt.ALT.call(this)
        this.prodStack.pop()
    })
    return RECORDING_NULL_OBJECT
}
