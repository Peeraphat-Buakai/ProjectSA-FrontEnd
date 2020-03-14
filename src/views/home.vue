<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-row align-content="center" justify="center">
          <v-col cols="12" class="text-center">
            <v-avatar size="120">
              <img :src="picture" />
            </v-avatar>
          </v-col>
          <v-col>
            <p class="text-center headline">{{username.fristname}} {{username.lastname}}</p>
            <p class="text-center subtitle-2">{{username.email}}</p>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-list>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-share-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>เคลม</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/statusUser">
          <v-list-item-action>
            <v-icon>mdi-arrange-bring-forward</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>สถานะ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/statusAdmin" v-if="username.role==='admin'">
          <v-list-item-action>
            <v-icon>mdi-animation</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>รอตรวจสอบ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/additem" v-if="username.role==='admin'">
          <v-list-item-action>
            <v-icon>mdi-book-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>เเอดบิล</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/login">
          <v-list-item-action>
            <v-icon class="red--text">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span class="red--text">LOGOUT</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left app color="green" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Program Claim Product</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      username: null,
      picture: 'https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png'
    }
  },
  created() {
    if (!this.$cookies.isKey('user')) {
      this.$router.push('/login')
    }
    this.username = this.$cookies.get('user')
  }
}
</script>
