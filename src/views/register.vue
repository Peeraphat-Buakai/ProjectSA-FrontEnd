<template>
  <v-app id="inspire">
    <!-- <v-container fluid class="fill-height"> -->
    <v-row align-content="center" justify="center">
      <v-col cols="12" sm="5" md="4" lg="3">
        <v-card class="cardhig">
          <v-row>
            <v-col cols="12">
              <v-form ref="form">
                <v-row align-content="center" justify="center">
                  <v-col cols="12">
                    <p class="display-1 pt-5 text-center">Register</p>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field label="UserName" v-model="username" :rules="itemRules.username"></v-text-field>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field
                      label="Password"
                      @keyup.enter="login"
                      v-model="password"
                      :rules="itemRules.password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field
                      label="Fristname"
                      v-model="fristname"
                      :rules="itemRules.fristname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field label="Lastname" v-model="lastname" :rules="itemRules.lastname"></v-text-field>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field label="Email" v-model="email" :rules="itemRules.email"></v-text-field>
                  </v-col>
                  <v-col cols="10">
                    <v-text-field label="Tel" v-model="tel" :rules="itemRules.tel" v-mask="mask"></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <a href @click="back">Back</a>
                  </v-col>
                  <v-col cols="5">
                    <v-btn block color="success" @click="validate" dark>สมัคร</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-container> -->
    <v-dialog v-model="dialog" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">ยืนยันการสมัครสมาชิก</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">ยกเลิก</v-btn>
          <v-btn color="green darken-1" text @click="register ">ตกลง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { mask } from 'vue-the-mask'
export default {
  directives: {
    mask,
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
      mask: '0##-###-####',
      username: null,
      password: null,
      fristname: null,
      lastname: null,
      email: null,
      tel: null,
      itemRules: {
        fristname: [
          v => !!v || 'กรุณาระบุชื่อผู้ใช้',
          v => (!!v && v.length >= 1) || ''
        ],
        lastname: [
          v => !!v || 'กรุณาระบุนามสกุลผู้ใช้',
          v => (!!v && v.length >= 1) || ''
        ],
        username: [
          v => !!v || 'กรุณาระบุ username',
          v => (!!v && v.length >= 4) || 'กรุณาระบุ username อย่างน้อย 4 ตัวอักษร',
          v => /^[a-zA-Z0-9_.-]+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาระบุตัวอักษรภาษาอังกฤษ หรือตัวเลขเท่านั้น'
        ],
        password: [
          v => !!v || 'กรุณาระบุรหัสผ่าน',
          v => (!!v && v.length >= 4) || 'กรุณาระบุรหัสผ่านอย่างน้อย 4 ตัวอักษร',
          v => /^((?=.*[a-zA-Z0-9]).{4,})+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาระบุตัวอักษรภาษาอังกฤษ หรือตัวเลขเท่านั้น'
        ],
        email: [
          v => !!v || 'กรุณาระบุอีเมล',
          v => /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาตรวจสอบอีเมลของท่านอีกครั้ง'
        ],
        tel: [
          v => !!v || 'กรุณาระบุเบอร์โทร',
          v => (!!v && v.length >= 9) || 'กรุณาระบุเบอร์โทรอย่างน้อย 9 ตัวอักษร',
          v => /^([0-9]|[-])+$/.test(v) || 'รูปแบบไม่ถูกต้อง กรุณาระบุตัวเลขเท่านั้น'
        ]
      }
    }
  },
  methods: {
    back() {
      this.$router.push('/login')
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.dialog = true
        // this.register()
      }
    },
    async register() {
      var data = {
        username: this.username,
        password: this.password,
        fristname: this.fristname,
        lastname: this.lastname,
        email: this.email,
        tel: this.tel,
        role: ''
      }
      var insertdata = await this.axios.post(`${process.env.VUE_APP_API}/add`, data)
      this.dialog = false;
      this.$router.push('/login')
    }
  }
}
</script>
