import { useReducer } from "react"
import "../Calculator/Calculator.css"
import ButtonDigit from "../Button/ButtonDigit"
import ButtonOperation from "../Button/ButtonOperation"


export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
}


function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            if(payload.digit === "0" && state.currentOperand === "0") {
                return state
            } // if the current state is only a zero, don't add a zero. This prevents arbitrary beginning strings of zeros
            if(payload.digit === "." && state.currentOperand.includes(".")) {
                return state
            } // if there is already a decimal point in the input, do not add another one. 
            return {
                ...state, 
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.CHOOSE_OPERATION: 
            if (state.currentOperand == null && state.previousOperand == null) {
                return state // do nothing if the state is empty
            }
            if (state.previousOperand == null) {
                return {
                    ...state, //the state as it exists
                    operation: payload.operation, //whatever button what clicked --that's what payload tracks
                    previousOperand: state.currentOperand, //shift the current operand 'up'
                    currentOperand: null //reset the current operand. 
                }
            }
            return {
                ...state, 
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,

            }
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
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})
    
    // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 }})

    return(
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
            <button className="span-two">=</button>
        </div>
    )
}