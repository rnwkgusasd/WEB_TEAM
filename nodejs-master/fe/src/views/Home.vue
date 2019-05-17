<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-btn outline color="indigo" @click="mdUp">Login</v-btn>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
        
      </v-layout>
    </v-slide-y-transition>


    <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
          <div class="pa-3">
            <v-text-field
                v-model="email"
                label="이메일을 입력하세요"

            >
            </v-text-field>
            <v-text-field
                v-model="password"
                label="패스워드를 입력하세요"
                type="password"
            >
            </v-text-field>
            <v-btn
             large
             block
             color="primary"
             @click="login()"
            >로그인</v-btn>
            <v-btn
             large
             block
             color="warning"
             to="/signup"
            >회원가입</v-btn>
            <v-btn
             large
             block
             color="error"
             @click.native="dialog = false"
            >닫기</v-btn>
          </div>
        </v-card>
  </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: null,
      password: null,
      allUsers: [],
      dialog: false
    }
  },
  mounted() {
    this.getAllusers()
  },
  methods: {
    getAllusers() {
      axios.get('http://localhost:3000/api/signup')
      .then((r) => {
        this.allUsers = r.data.users
        console.log(r);
      })
      .catch((e) => {
        console.error(e.message)
      })
    },
    login() {
      // 전체 유저에서 해당 이메일로 유저를 찾는다.
      let selectUser = null
      console.log(this.allUsers)
      this.allUsers.forEach(user =>{
        if(user.userID === this.email){
          selectUser = user
        }
      })
      if (selectUser === null) alert('입력하신 이메일이 없습니다')
        else{
        if(selectUser.userPW !== this.password)
          alert('이메일과 비밀번호가 일치하지 않습니다.')
          else{
          alert('로그인 완료')
          location.replace('/')
        }
      }
      // 그 유저의 비밀번호와 입력된 비밀번호를 비교한다.
      console.log(this.email, this.password)
    },
    mdUp () {
      // console.log('mdup')
      this.dialog = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
