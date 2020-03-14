<template>
  <div>
    <v-container>
      <v-row align-content="center" justify="center">
        <v-col cols="11">
          <v-btn color="success" @click="addItem">
            <v-icon>mdi-plus-circle-outline</v-icon>เพิ่มรายการสินค้า
          </v-btn>
        </v-col>
        <v-col cols="11">
          <v-data-table :headers="headers" :items="desserts" class="elevation-1">
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete-forever</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <!-- --------------------------------------------------------- -->
    <v-dialog v-model="dialog_add" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add</v-card-title>
        <!-- <v-card-text> -->
        <v-container fluid>
          <v-row align-content="center" justify="center">
            <v-col cols="11">
              <v-select :items="itembrand" label="ยี่ห้อรายการสินค้า" v-model="Selectbrand"></v-select>
            </v-col>
            <v-col cols="11" v-if="generation!==''">
              <v-select :items="generation" label="รุ่นรายการสินค้า" v-model="Selectgeneration"></v-select>
            </v-col>
            <v-col cols="11" v-if="Selectgeneration !== ''">
              <v-row align-content="end" justify="end">
                <v-btn color="primary" @click="Addorder">ยืนยัน</v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  watch: {
    Selectbrand() {
      if (this.Selectbrand !== '') {
        this.getidproduct(this.Selectbrand)
      }
    },
    Selectgeneration() {
      if (this.Selectgeneration !== '') {
        for (let index = 0; index < this.datavalue.length; index++) {
          if (this.datavalue[index].brand === this.Selectbrand && this.datavalue[index].idproduct === this.Selectgeneration) {
            this.price = this.datavalue[index].price
            this.warranty = this.datavalue[index].warranty
            this.color = this.datavalue[index].color,
              this.stock = this.datavalue[index].stock
          }
        }
      }
    }
  },
  data() {
    return {
      datavalue: '',
      price: '',
      warranty: '',
      color: '',
      stock: '',
      itembrand: [],
      Selectbrand: '',
      Selectgeneration: '',
      generation: '',
      dialog_edit: false,
      dialog_delete: false,
      dialog_add: false,
      headers: [
        {
          text: 'รหัสบิลสินค้า',
          align: 'start',
          sortable: false,
          value: 'idbill'
        },
        { text: 'วันที่ออกใบสั่งซื้อ', value: 'date', align: 'center' },
        { text: 'ยี่ห้อสินค้า', value: 'brand', align: 'center' },
        { text: 'รุ่นสินค้า', value: 'idproduct', align: 'center' }
      ],
      desserts: []
    }
  },
  created() {
    this.Getorder()
  },
  methods: {
    async Addorder() {
      const data = {
        date: moment().format('L'),
        brand: this.Selectbrand,
        idproduct: this.Selectgeneration,
        price: this.price,
        warranty: this.warranty,
        color: this.color,
      }
      var Createorder = await this.axios.post(`${process.env.VUE_APP_API}/addbill`, data)
      this.dialog_add = false
      var dataupdate = {
        idproduct: this.Selectgeneration,
        stock: this.stock
      }
      var updatestock = await this.axios.post(`${process.env.VUE_APP_API}/updatestock`, dataupdate)
      this.$router.push('/delay1')
    },
    async Getorder() {
      var data = await this.axios.get(`${process.env.VUE_APP_API}/getshowproduct`)
      this.desserts = data.data.result
    },
    editItem(item) {
      this.dialog_edit = true
    },
    deleteItem(item) {
      this.dialog_delete = true
    },
    async addItem() {
      var getbrand = await this.axios.get(`${process.env.VUE_APP_API}/getbrand`)
      this.itembrand = getbrand.data.data
      this.dialog_add = true
    },
    async getidproduct(data) {
      var datasend = {
        brand: data
      }
      var getidproduct = await this.axios.post(`${process.env.VUE_APP_API}/getidproduct`, datasend)
      this.datavalue = getidproduct.data.result
      this.generation = getidproduct.data.data
    }
  }
}
</script>
