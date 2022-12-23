export default {
    state: {
        filterObj: {
            search: '',
            page: 1,
            hasNextPage: null,
        },
        filteredValutes: [],
        ListFilteredValutes: [],
    },
    getters: {
        getFilteredValutes(state){
            return state.filteredValutes;
        },
        getListFilteredValutes(state){
            return state.ListFilteredValutes;
        },
        getFilterObj(state){
            return state.filterObj;
        }
    },
    mutations: {
        setFilteredValutes(state, valutes){
            state.filteredValutes = valutes;
        },
        setListFilteredValutes(state, valutes){
            state.ListFilteredValutes = valutes;
        },
        setHasNextPage(state, bool){
            state.filterObj.hasNextPage = bool;
        }
    },
    actions: {
        updateFilteredValutes({commit, state}, valutes){
            if(valutes !== null){
                const filterObj = state.filterObj;
                const start = (filterObj.page - 1) * 12;
                const end = filterObj.page * 12;
                const filteredValutes = filterObj.search
                    ? valutes.filter((item) =>
                        [item.Name, item.CharCode].some((v) =>
                            v.toLowerCase().includes(filterObj.search.toLowerCase())
                        )
                    )
                    : valutes;
                const listFilteredValutes = filteredValutes.slice(start, end);
                const bool = filteredValutes.length > end;
                commit('setFilteredValutes', filteredValutes);
                commit('setListFilteredValutes', listFilteredValutes);
                commit('setHasNextPage', bool);
            }
        }
    },
}