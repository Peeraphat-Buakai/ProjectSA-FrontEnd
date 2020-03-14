<template>
  <v-container>
    <v-row align-content="center" justify="center">
      <v-col cols="11">
        <v-card>
          <v-card-title>
            <p class="display-1">สถานะ</p>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" :search="search">
            <template v-slot:item.fristname="{ item }">{{ item.fristname }} {{item.lastname}}</template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      search: '',
      headers: [
        { text: 'เลขที่ใบเคลม', align: 'start', sortable: false, value: 'idbill', },
        { text: 'วันที่', value: 'date', align: 'center' },
        { text: 'ชื่อผู้ส่ง', value: 'fristname', align: 'center' },
        { text: 'เบอร์โทรศัพท์', value: 'tel', align: 'center' },
        { text: 'สถานะ', value: 'status', align: 'center' }
      ],
      desserts: []
    }
  },
  created() {
    this.username = this.$cookies.get('user')
    this.getdata()
  },
  methods: {
    async getdata() {
      var data = {
        fristname: this.username.fristname
      }
      var getdata = await this.axios.post(`${process.env.VUE_APP_API}/cheack`, data)
      this.desserts = getdata.data.result
    }
  },
}
</script>