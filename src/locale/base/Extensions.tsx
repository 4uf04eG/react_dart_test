import {Locale} from "./Locale";

const translate = (key: string) => Locale.getInstance().translate(key)

export default translate