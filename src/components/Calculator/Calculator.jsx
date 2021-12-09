import { useReducer } from "react"
import "../Calculator/Calculator.css"
import ButtonDigit from "../Button/ButtonDigit"
import ButtonOperation from "../Button/ButtonOperation"
import LoginForm from "../LoginForm/LoginForm"
import { parse } from "dotenv"
import * as logAPI from "../../utilities/log-api"


export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
    SAVE_VALUE: 'save-value',
    DELETE_SAVED: 'delete-saved',
    SEND_LOG: 'send-log',
}

function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false, 
                }
            }
            if(payload.digit === "0" && state.currentOperand === "0") {
                return state
            } // if the current state is only a zero, don't add a zero. This prevents arbitrary beginning strings of zeros
            if(payload.digit === "." && state.currentOperand.includes(".")) {
                return state
            } // if there is already a decimal point in the input, do not add another one. 
            return {
                ...state, 
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }
        case ACTIONS.CLEAR:
            return {}

        case ACTIONS.EVALUATE:
            if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
                return state
            } 
            return {
                ...state, 
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            }



        case ACTIONS.CHOOSE_OPERATION: 
            if (state.currentOperand == null && state.previousOperand == null) {
                return state // do nothing if the state is empty
            }

        if (state.currentOperand === null) {
            return {
                ...state, 
                operation: payload.operation, 
            }
        }

            if (state.previousOperand == null) {
                return {
                    ...state, //the state as it exists
                    operation: payload.operation, //whatever button what clicked --that's what payload tracks
                    previousOperand: state.currentOperand, //shift the current operand 'up'
                    log: [...state.log, `${state.currentOperand}${payload.operation}`],
                    currentOperand: null, //reset the current operand. 
                }
            }
            return {
                ...state, 
                log: [...state.log, `${state.currentOperand}`, `${evaluate(state)}${payload.operation}`],
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            }
        case ACTIONS.SAVE_VALUE:
            if (!state.saved.includes(payload.item)) {
                return {
                    ...state, 
                    saved: [...state.saved, `${payload.item}`]
                }
            }
            return state
        case ACTIONS.DELETE_SAVED:
            let savedArr = [...state.saved];
            return {
                ...state, 
                saved: savedArr.filter(item => item !== payload.value)
            }
        case ACTIONS.SAVE_LOG:
            
    }
}

function evaluate({currentOperand, previousOperand, operation}) {
    const previous = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(previous) ||  isNaN(current)) return "" //if any of these things is not a number, clear the fields. 
    let computation = ""
    switch (operation) {
        case "+":
            computation = previous + current
            break
        case "-":
            computation = previous - current
            break
        case "*":
            computation = previous * current
            break
        case "/":
            computation = previous / current
            break
    }
    return computation.toString()
}


export default function Calculator() {
    const [{currentOperand, previousOperand, operation, log, saved, overwrite}, dispatch] = useReducer(reducer, { log: [], saved: []})
    console.log(log);
    // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 }})

    return(
        <div className="CalcLayout">
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{previousOperand} {operation}</div>
                <div className="current-operand">{currentOperand}</div>
            </div>
            <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
            <button>DEL</button>
            <ButtonOperation operation="/" dispatch={dispatch} />
            <ButtonDigit digit="1" dispatch={dispatch} />
            <ButtonDigit digit="2" dispatch={dispatch} />
            <ButtonDigit digit="3" dispatch={dispatch} />
            <ButtonOperation operation="*" dispatch={dispatch} />
            <ButtonDigit digit="4" dispatch={dispatch} />
            <ButtonDigit digit="5" dispatch={dispatch} />
            <ButtonDigit digit="6" dispatch={dispatch} />
            <ButtonOperation operation="+" dispatch={dispatch} />
            <ButtonDigit digit="7" dispatch={dispatch} />
            <ButtonDigit digit="8" dispatch={dispatch} />
            <ButtonDigit digit="9" dispatch={dispatch} />
            <ButtonOperation operation="-" dispatch={dispatch} />
            <ButtonDigit digit="." dispatch={dispatch} />
            <ButtonDigit digit="0" dispatch={dispatch} />
            <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
        </div>
        <div className="log">
            <div>Log</div>
            {log.map((item => 
            <div>{item}
                <button onClick={() => dispatch({ type: ACTIONS.SAVE_VALUE, payload: {item} })}>Save</button>
            </div>))}
            <button onClick={() => logAPI.saveLog(log)}>Save Log</button>
            </div>
        <div className="saved">
            <div>Saved Values</div>
            {saved.map((value => 
            <div>
                <ButtonDigit digit={`${parseFloat(value)}`} dispatch={dispatch} />
                <button onClick={() => dispatch({ type: ACTIONS.DELETE_SAVED, payload: {value}})}>X</button>
            </div>))}
            </div>
        </div>
    )
}