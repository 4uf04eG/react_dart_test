import translate from "../locale/base/Extensions";

export interface Validation {
    // Bad name
    validate: (value1: string, value2?: string) => boolean
    getErrorMsg: () => string
}

type Name = 'nonempty' | 'numerical' | 'notTooBig999' | 'notTooBig150' | 'longerThan3' | 'onlyLatin'

const Validations: Record<Name, Validation> = {
    nonempty: {
        validate: val => val.length === 0,
        getErrorMsg: () => translate("error_empty")
    },
    numerical: {
        validate: val => !/^-?\d+$/.test(val),
        getErrorMsg: () => translate("error_nonnumerical")
    },
    notTooBig999: {
        validate: val => Math.abs(parseInt(val)) > 999,
        getErrorMsg: () => translate("error_too_big")
    },
    notTooBig150: {
        validate: val => Math.abs(parseInt(val)) > 150,
        getErrorMsg: () => translate("error_too_big")
    },
    onlyLatin: {
        validate: val => !/^[a-zA-Z]+$/.test(val),
        getErrorMsg: () => translate("error_non_latin")
    },
    longerThan3: {
        validate: val => val.length < 3,
        getErrorMsg: () => translate("error_too_short")
    }
}

export default Validations