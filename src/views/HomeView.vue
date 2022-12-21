<template>
    <div class="home">
        <div class="row align-items-end">
            <div class="col-12 col-md-6">
                <div class="form-group">
                    <label for="search">Поиск по названию или коду</label>
                    <input type="text" id="search" class="form-control w-100" v-model="search" @input="this.page = 1">
                </div>
            </div>
            <div class="col-12 col-md-6">
                <button class="btn btn-danger" @click="search = ''">очистить</button>
            </div>
        </div>
        <hr class="my-4">
        <div class="d-flex align-items-center justify-content-between">
            <p>Результатов: <b>{{filteredCount}}</b> из <b>{{valutes.length}}</b></p>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <button class="page-link" @click="page = page - 1" :disabled="page === 1">⇦</button>
                    </li>
                    <li class="page-item">
                        <button class="page-link" @click="page = page + 1" :disabled="!hasNextPage">⇨</button>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="row">
            <div class="col-12 col-md-3 mb-4" v-for="valute in filteredValutes" :key="valute.ID">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{valute.CharCode}} - RUB</h5>
                        <p class="card-subtitle">1 {{valute.Name}}</p>
                        <div class="d-flex align-items-center justify-content-between mt-4">
                            <span>{{(valute.Value / valute.Nominal).toFixed(4)}} ₽</span>
                            <span v-if="(valute.Value / valute.Nominal - valute.Previous / valute.Nominal).toFixed(4) > 0"
                                  class="text-green">{{(valute.Value / valute.Nominal - valute.Previous / valute.Nominal).toFixed(4)}} ↑</span>
                            <span v-else class="text-danger">{{(valute.Value / valute.Nominal - valute.Previous / valute.Nominal).toFixed(4)}} ↓</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getValutes} from '../api.js';

    export default {
        name: 'HomeView',
        data() {
            return {
                valutes: [],
                search: '',
                page: 1,
                hasNextPage: true,
                filteredCount: null
            }
        },
        async created() {
            const result = await getValutes();
            for (let i in result.Valute) {
                this.valutes.push(result.Valute[i])
            }
        },
        computed: {
            filteredValutes() {
                const start = (this.page - 1) * 12;
                const end = this.page * 12;
                const res = this.search
                    ? this.valutes.filter((item) =>
                        [item.Name, item.CharCode].some((v) =>
                            v.toLowerCase().includes(this.search.toLowerCase())
                        )
                    )
                    : this.valutes;
                this.hasNextPage = res.length > end;
                this.filteredCount = res.length;
                return res.slice(start, end);
            },
        },
        methods: {}
    }
</script>
