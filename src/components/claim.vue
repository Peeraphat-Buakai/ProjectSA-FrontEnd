<template>
  <v-container no-getters>
    <v-row align-content="center" justify="center">
      <v-col cols="10">
        <p class="display-1">เคลมสินค้า</p>
      </v-col>
      <v-col cols="8" sm="8">
        <v-text-field
          label="กรอกเลขที่ใบเสร็จที่ต้องการค้นหา"
          single-line
          solo
          clearable
          v-model="datasearch"
        ></v-text-field>
      </v-col>
      <v-col cols="3" sm="2">
        <v-btn class="ma-2" block outlined color="indigo" @click="search">ค้นหา</v-btn>
      </v-col>
      <v-col cols="8" v-if="detail ==='' ">
        <v-img :src="picture"></v-img>
      </v-col>
      <v-col cols="10" v-if="detail !=='' ">
        <span class="texthome">รายละเอียดการเคลม</span>
      </v-col>
      <v-col cols="10" v-if="detail !=='' ">
        <v-card width="100%" class="pa-2" elevation-10>
          <v-row align-content="end" justify="center">
            <v-col cols="12">
              <span class="pl-5 font">รายละเอียกรายการสินค้าที่เคลม</span>
            </v-col>
            <v-col cols="12" sm="4">
              <span class="screen">เลขที่บิล {{detail.idbill}}</span>
            </v-col>
            <v-col cols="12" sm="8">
              <span class="screen">วันที่ซื้อ {{detail.date}}</span>
            </v-col>
            <v-col cols="12">
              <span class="screen">ยี่ห้อสินค้า {{detail.brand}}</span>
            </v-col>
            <v-col cols="12">
              <span class="screen">รุ่นสินค้า {{detail.idproduct}}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <span class="pl-5 font">รายละเอียดผู้สั่งซื้อ {{detail.idbill}}</span>
            </v-col>
            <v-col cols="12" sm="5">
              <span class="screen">ชื่อ {{username.fristname}}</span>
            </v-col>
            <v-col cols="12" sm="6">
              <span class="screen">สกุล {{username.lastname}}</span>
            </v-col>
            <v-col cols="12" sm="5">
              <span class="screen">Email {{username.email}}</span>
            </v-col>
            <v-col cols="12" sm="5">
              <span class="screen">เบอร์โทร {{username.tel}}</span>
            </v-col>
            <v-col cols="12">
              <span class="pl-5 font">สาเหตุการเคลม</span>
            </v-col>
          </v-row>
          <v-row align-content="center" justify="center">
            <v-col cols="11">
              <v-textarea solo autocomplete="สาเหตุ" label="สาเหตุ" v-model="reasoning"></v-textarea>
            </v-col>
          </v-row>
          <v-row align-content="end" justify="end" no-gutters>
            <v-col cols="2">
              <!-- <v-btn color="success" block @click="print">Print</v-btn> -->
            </v-col>
            <v-col cols="2" class="mr-10 ml-4 mb-2">
              <v-btn color="success" block @click="Sent">Sent</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      :top="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smAndUp"
      :right="$vuetify.breakpoint.smAndUp"
      color="error"
      v-model="snackbar"
      :timeout="5000"
    >
      ไม่สามารถดำเนินการได้ เนื่องจากมีการส่งเคลมไปเเล้ว
      <v-btn color="white" text @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-snackbar
      :top="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smAndUp"
      :right="$vuetify.breakpoint.smAndUp"
      color="error"
      v-model="snackbarwarranty"
      :timeout="5000"
    >
      ประกันหมด
      <v-btn color="white" text @click="snackbarwarranty = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import moment from 'moment'

export default {
  data() {
    return {
      snackbar: false,
      snackbarwarranty: false,
      checkmessage: '',
      reasoning: '',
      datasearch: '',
      username: null,
      detail: '',
      picture: 'https://www.yellowpages.co.th/sites/storage/files/users/5/1/0/0/510032ad-6a89-41e5-831c-1dfbfc67b1b0/%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B2%E0%B8%A9.jpg'
    }
  },
  created() {
    this.username = this.$cookies.get('user')
  },
  methods: {
    async search() {
      var data = {
        idbill: this.datasearch
      }
      var search = await this.axios.post(`${process.env.VUE_APP_API}/searchbill`, data)
      this.detail = search.data.result[0]
    },
    async Sent() {
      var datacheakbill = {
        idbill: this.detail.idbill,
        date: moment().format('L')
      }
      var cheakbill = await this.axios.post(`${process.env.VUE_APP_API}/searchbillclaim`, datacheakbill)
      console.log('-----', cheakbill);
      if (cheakbill.data.Message === 'OK') {
        var datewarranty = cheakbill.data.result[0].date
        var warranty = cheakbill.data.result[0].warranty
        this.checkmessage = cheakbill.data.Message
        var checktime = {}
        checktime.month = parseInt(moment().format('MM')) - parseInt(datewarranty.substring(0, 2))
        checktime.day = parseInt(moment().format('DD')) - parseInt(datewarranty.substring(3, 5))
        checktime.year = parseInt(moment().format('YYYY') - parseInt(datewarranty.substring(6, 10)))
        if (checktime.year <= parseInt(warranty)) {
          if (checktime.year === parseInt(warranty)) {
            if (checktime.month <= 0) {
              if (checktime.day <= 0) {
                this.savebillclaim()
              }
              else {
                this.snackbarwarranty = true
              }
            }
            else {
              this.snackbarwarranty = true
            }
          } else {
            this.savebillclaim()
          }
        } else {
          this.snackbarwarranty = true
        }
      } else {
        this.snackbar = true
      }
    },
    async savebillclaim() {
      var data = {
        billid: this.detail.idbill,
        date: moment().format('L'),
        brand: this.detail.brand,
        idproduct: this.detail.idproduct,
        price: this.detail.price,
        warranty: this.detail.warranty,
        color: this.detail.color,
        fristname: this.username.fristname,
        lastname: this.username.lastname,
        tel: this.username.tel,
        status: 'รอดำเนินการ',
        remember: this.reasoning
      }
      var sent = await this.axios.post(`${process.env.VUE_APP_API}/addclaim`, data)
      this.$router.push('/statusUser')
    }
  }
}
</script>
<style>
@media (max-width: 700px) {
  .screen {
    padding-left: 30px !important;
    font-size: 13px !important;
  }
  .font {
    font-size: 16px !important;
  }
  .texthome {
    font-size: 25px !important;
  }
}
.texthome {
  font-size: 34px;
}
.font {
  font-size: 20px;
}
.screen {
  padding-left: 40px;
  font-size: 18px;
}
</style>