<template>
    <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12>
    <v-toolbar flat>
         <v-toolbar-title>Sign Up</v-toolbar-title>
       </v-toolbar>
    <v-card class="pa-5">
      <div>
      <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      required
      @input="$v.pw.$touch()"
      @blur="$v.pw.$touch()"
    ></v-text-field>
      <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="age"
      :error-messages="ageErrors"
      label="Age"
      required
      @input="$v.age.$touch()"
      @blur="$v.age.$touch()"
    ></v-text-field>
    <v-select
      v-model="select"
      :items="items"
      :error-messages="selectErrors"
      label="Sex"
      required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
      </div>
    </v-card>
      </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, alphaNum, numeric } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    data () {
      return{
        name: '',
        email: '',
        sex: '',
        age: '',
        userID: '',
        userPW: '',
        select: null,
        items: [
          'Male',
          'Female'
        ],
        checkbox: false
      }
    },
    mounted() {
      this.getUsers()
    },
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      password: { required, alphaNum },
      age:{required, numeric},
      select: { required },
      checkbox: {
        checked (val) {
          return val
        }
      }
    },

    data: () => ({
      name: '',
      email: '',
      age:'',
      password: '',
      select: null,
      items: [
        'Male',
        'Female'
      ],
      checkbox: false
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      ageErrors () {
        const errors = []
        if (!this.$v.age.$dirty) return errors
        !this.$v.age.numeric && errors.push('Age must be number')
        !this.$v.age.required && errors.push('Age is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.alphaNum && errors.push('Must be valid password')
        !this.$v.password.required && errors.push('password is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()

        if(!(this.$v.$pending || this.$v.$error)){
        axios.post('http://localhost:3000/api/signup', {
          name: this.name,
          sex: this.select,
          age:this.age,
          userID: this.email,
          userPW: this.password
        })
          .then((r) => {
            alert("회원가입을 축하합니다.")
            location.replace('/')
          })
          .catch((e) => {
            alert(e.message)
          })
        }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.password = ''
        this.select = null
        this.checkbox = false
      }
    }
  }
</script>