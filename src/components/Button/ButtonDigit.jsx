import { ACTIONS } from "../Calculator/Calculator"

export default function ButtonDigit({ dispatch, digit }) {
    return <button 
    onClick={() => dispatch(
        { type: ACTIONS.ADD_DIGIT, payload: {digit}})}
        >{digit}
        </button>
}