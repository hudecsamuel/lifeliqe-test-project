import * as React from 'react'
import { Lang } from './App'

interface Props {
    searchStr: string
    lang: Lang
    changeLang: any
    searchOnChange: any
}

const SearchPanel = (props: Props) => (
    <div>
        <div>
            <label htmlFor="searchStr">Search:</label>
            <input id="searchStr" name="searchStr" type="text" value={props.searchStr} onChange={props.searchOnChange} />
        </div>
        <div>
            <label htmlFor="lang-en-us">en-us</label>
            <input checked={props.lang === "en-us"}
                id="lang-en-us"
                name="lang"
                type="radio"
                value="en-us"
                onChange={props.changeLang} />
            <label htmlFor="lang-es-es">es-es</label>
            <input checked={props.lang === "es-es"}
                id="lang-es-es"
                name="lang"
                type="radio"
                value="es-es"
                onChange={props.changeLang} />
        </div>
    </div>
)

export default SearchPanel