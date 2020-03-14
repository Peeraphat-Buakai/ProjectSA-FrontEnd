<template>
  <v-app id="inspire">
    <!-- <v-container fluid class="fill-height"> -->
    <v-row align-content="center" justify="center">
      <v-col cols="12" sm="5" md="4" lg="3">
        <v-card class="cardhig">
          <v-row>
            <v-col cols="12">
              <div class="centerdiv">
                <v-avatar size="270">
                  <v-img src="https://i.ya-webdesign.com/images/compress-png-image-online-6.png"></v-img>
                </v-avatar>
              </div>
            </v-col>
            <v-col cols="12">
              <v-row align-content="center" justify="center">
                <v-col cols="12">
                  <p class="display-1 pt-5 text-center">Login</p>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                    label="UserName"
                    v-model="username"
                    hide-details
                    outlined
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                    label="Password"
                    @keyup.enter="login"
                    v-model="password"
                    hide-details
                    outlined
                    prepend-inner-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <a href @click="register">Register</a>
                </v-col>
                <v-col cols="5">
                  <v-btn block color="success" @click="login" dark>Login</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      password: null
    }
  },
  created() {
    this.$cookies.remove('user')
  },
  methods: {
    async login() {
      var data = {
        username: this.username,
        password: this.password
      }
      var getuser = await this.axios.post(`${process.env.VUE_APP_API}/getdata`, data)
      if (getuser.data.Message === 'OK') {
        this.$cookies.set('user', getuser.data.result[0])
        this.$router.push('/')
      } else if (getuser.data.Message === 'ERROR') {
        alert('อย่าอ่อน')
      }
    },
    register() {
      this.$router.push('/register')
    }
  }
}
</script>
<style>
.cardhig {
  height: auto;
}
.centerdiv {
  margin-top: 20px;
  /* margin-left: 30px; */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
