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
            <template v-slot:item.miss="{ item }">
              <VIcon @click="openmessage(item)">mdi-message-text-outline</VIcon>
            </template>
            <template v-slot:item.edit="{ item }">
              <v-row justify="center">
                <v-col class="text-center" style="max-width:150px">
                  <v-btn
                    color="success"
                    v-if="item.status==='รอดำเนินการ'"
                    @click="updatestatus(item)"
                  >อนุมัติ</v-btn>
                  <span class="text-center" v-else>{{item.status}}</span>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>ข้อความถึงเจ้าหน้าที่</v-card-title>
        <v-card-text>
          <p class="headline" v-if="message.remember !== ''">ข้อความ:{{message.remember}}</p>
          <p class="headline" v-else>ข้อความ: ไม่มีข้อความถึงเจ้าหน้าที่</p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      message: '',
      items: ['เสร็จสิ้น'],
      pick: '',
      search: '',
      headers: [
        { text: 'รหัสสินค้า', align: 'start', sortable: false, value: 'idproduct', },
        { text: 'วันที่', value: 'date', align: 'center' },
        { text: 'ชื่อผู้ส่ง', value: 'fristname', align: 'center' },
        { text: 'เบอร์โทรศัพท์', value: 'tel', align: 'center' },
        { text: 'จัดการสถานะ', value: 'edit', align: 'center' },
        { text: 'ข้อความ', value: 'miss', align: 'center' }
      ],
      desserts: []
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    openmessage(data) {
      this.message = data
      this.dialog = true
    },
    async updatestatus(item) {
      var data = {
        status: 'สำเร็จ',
        idbill: item.idbill
      }
      var updatestatus = await this.axios.post(`${process.env.VUE_APP_API}/updatestatus`, data)
      this.$router.push('/delay')
    },
    async getdata() {
      var getdata = await this.axios.get(`${process.env.VUE_APP_API}/admin`)
      this.desserts = getdata.data.result
    }
  }
}
</script>