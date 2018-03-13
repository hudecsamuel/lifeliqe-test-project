import  * as React from 'react'
import axios from 'axios'
import SearchResults from './SearchResults'
import SearchPanel from './SearchPanel'

export type Lang = 'en-us' | 'es-es'
interface State {
    searchStr: string
    where: 0
    lang: Lang
}

interface Props {}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.searchOnChange = this.searchOnChange.bind(this)
        this.changeLang = this.changeLang.bind(this)

        this.state = {
            searchStr: '',
            where: 0,
            lang: 'en-us',
        }
    }

    changeLang(evt: any) {
        this.setState({
            lang: evt.currentTarget.value,
        })
    }

    searchOnChange(evt: React.FormEvent<HTMLInputElement>) {
        this.setState({
            searchStr: evt.currentTarget.value,
        })
    }

    render() {
        const {
            searchStr,
            lang,
        } = this.state


        return (
            <div>
                <SearchPanel searchStr={searchStr} lang={lang}
                    changeLang={this.changeLang} searchOnChange={this.searchOnChange}/>
                <SearchResults searchStr={searchStr} lang={lang} />
            </div>
        )
    }
}

export default App
