<template>
    <div class="about">
        <div class="row">
            <div class="col-12 col-md-5">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group mb-3">
                            <label for="base">Базовая валюта</label>
                            <select class="form-control" id="base" v-model="baseValute">
                                <template v-for="valute in valutes" :key="valute.ID">
                                    <option :value="valute">{{valute.CharCode}} - {{valute.Name}}</option>
                                </template>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="calc-number">{{baseValute.CharCode}}</label>
                            <input type="text" id="calc-number" class="form-control" v-model="calc">
                            <small class="form-text text-muted">{{calc}} {{baseValute.Name}} - {{(calc * baseValute.Value / baseValute.Nominal).toFixed(4)}} ₽</small>
                        </div>
                        <div class="title" v-if="baseValute"></div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-2">
                <div class="special-block">
                    <button @click="reverse" class="btn btn-warning" :disabled="!calcValute"><img
                            src="https://cdn-icons-png.flaticon.com/512/46/46246.png" alt=""></button>
                </div>
            </div>
            <div class="col-12 col-md-5">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group mb-3">
                            <label for="calc">Валюта рассчета</label>
                            <select class="form-control" id="calc" v-model="calcValute">
                                <template v-for="valute in valutes" :key="valute.ID">
                                    <option :value="valute">{{valute.CharCode}} - {{valute.Name}}</option>
                                </template>
                            </select>
                            <small class="form-text text-danger" v-if="!calcValute">Выберите валюту расчета</small>
                        </div>
                        <div class="form-group" v-if="calcValute">
                            <label for="res-number">{{calcValute.CharCode}}</label>
                            <input type="text" id="res-number" class="form-control" v-model="resultCalc" disabled>
                            <small class="form-text text-muted">{{calcValute.Name}}</small>
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
        name: 'AboutView',
        data() {
            return {
                baseValute: '',
                calcValute: '',
                calc: 1,
                valutes: []
            }
        },
        async created() {
            const result = await getValutes();
            for (let i in result.Valute) {
                this.valutes.push(result.Valute[i])
            }
            this.baseValute = this.valutes[10];
        },
        computed: {
            resultCalc() {
                return this.calcValute
                    ? ((this.baseValute.Value / this.baseValute.Nominal) / (this.calcValute.Value / this.calcValute.Nominal) * this.calc).toFixed(4)
                    : null
            }
        },
        methods: {
            reverse() {
                const left = this.baseValute;
                const right = this.calcValute;
                this.baseValute = right;
                this.calcValute = left;
            }
        }
    }
</script>
