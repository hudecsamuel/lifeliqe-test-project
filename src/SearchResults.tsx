import * as React from 'react'
import axios from 'axios'
import debounce from './utils/debounce'
import { Lang } from './App';

interface Props {
    searchStr: string
    lang: Lang
}

interface State {
    loading: boolean
    error: boolean
    resultsModels: Array<any>
    resultsLessonPlans: Array<any>
}

class SearchResults extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            loading: false,
            resultsModels: [],
            resultsLessonPlans: [],
            error: false,
        }
    }

    debouncedFetchResults = debounce(this.fetchResults.bind(this), 500)

    componentDidMount() {
        this.fetchResults(this.props)
    }

    componentWillReceiveProps(nextProps: Props) {
        this.debouncedFetchResults(nextProps)
    }

    fetchResults(searchQuery: Props) {
        if(searchQuery.searchStr) {
            this.setState({
                loading: true,
                error: false,
            })
            axios.post(`https://online01.lifeliqe.com/search?searchStr=${searchQuery.searchStr}&lang=${searchQuery.lang}&where=0`)
                .then(({data}) => {
                    this.setState({
                        loading: false,
                        error: false,
                        resultsModels: data.ResultsModels,
                        resultsLessonPlans: data.ResultsLessonPlans,
                    })
                })
                .catch((err) => {
                    this.setState({
                        loading: false,
                        error: true,
                    })
                })
        }
    }

    render() {
        const {
            resultsModels,
            resultsLessonPlans,
            loading,
            error,
        } = this.state
        const { searchStr } = this.props
        
        return !searchStr ? (
                <div>
                </div>
            ) : loading ? (
                <div>
                    Loading...
                </div>
            ) : error ? (
                <div>
                    Error occured :(
                </div>
            ) : (
                <div>
                    <h1>Lesson Plans</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                        {resultsLessonPlans.map(item => (
                            <div key={item.SceneId} style={{margin: '20px'}}>
                                <img src={`https://lifeliqedata.blob.core.windows.net/00shared/snapshots/${item.SceneId}.jpg`} />
                                <h3>{item.TextToDisplay}</h3>
                            </div>
                        ))}
                    </div>

                    <h1>3D Models</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                        {resultsModels.map(item => (
                            <div key={item.SceneId} style={{margin: '20px'}}>
                                <img src={`https://lifeliqedata.blob.core.windows.net/00shared/snapshots/${item.SceneId}.jpg`} />
                                <h3>{item.TextToDisplay}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )
    }
}

export default SearchResults
