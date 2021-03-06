import {
    GO_FORWARD_ONE,
    GO_BACK_ONE,
    FETCH_ENTRIES,
    RECIEVE_ENTRIES,
    CHANGE_ENTRY,
    ARTICLE_LIST} from './actions';

var entriesExist = typeof(entries) !== 'undefined' ? true : false;

function blog(state = {
    loading: entriesExist ? false : true,
    entries: entriesExist ? entries : {},
    currentEntry: entriesExist ? entries[entries.length-1] : {},
    showArticleList: false
}, action) {
    let entries = state.entries;
    let currentIndex;
    switch(action.type) {
        case ARTICLE_LIST:
            return Object.assign({}, state, {
                showArticleList: action.showArticleList
            })
        case GO_FORWARD_ONE:
            for(let i = 0; i < entries.length; i++) {
                if(entries[i].title === state.currentEntry.title) {
                    currentIndex = i;
                }
            }
            if(currentIndex === entries.length-1) {
                return state;
            }
            return Object.assign({}, state, {
                currentEntry: entries[currentIndex+1]
            });
        case GO_BACK_ONE:
            for(let i = 0; i < entries.length; i++) {
                if(entries[i].title === state.currentEntry.title) {
                    currentIndex = i;
                }
            }
            if(currentIndex === 0) {
                return state;
            }
            return Object.assign({}, state, {
                currentEntry: entries[currentIndex-1]
            });
        case CHANGE_ENTRY:
            return Object.assign({}, state, {
                currentEntry: action.currentEntry,
                showArticleList: action.showArticleList
            });
        case RECIEVE_ENTRIES:
            entries = action.entries;
            if(action.currentEntry) {
                return Object.assign({}, state, {
                    loading: action.loading,
                    entries: entries,
                    currentEntry: action.currentEntry
                });
            }
            else {
                return Object.assign({}, state, {
                    loading: action.loading,
                    entries: entries,
                    currentEntry: entries[entries.length-1]
                });
            }
        default:
            return state;
    }
}

export default blog;
