import {Validatable} from '../lib/Interfaces'

function isValid(input: Validatable): boolean {
    let valid = true
    if(input.required) {
        valid = input.value.toString().trim().length > 0
    }
    if(typeof input.value === 'number') {
        if(input.min) {
            valid = valid && input.value >= input.min
        }
        if(input.max) {
            valid = valid && input.value <= input.max
        }
    }
    return valid
}

export default function validate(...inputs: Validatable[]): boolean {
    return inputs.reduce((acc: boolean, input) => acc && isValid(input), true)
}