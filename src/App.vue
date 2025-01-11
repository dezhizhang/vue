<!--
 * :file description: 
 * :name: /vue/src/App.vue
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-11 14:04:19
 * :last editor: 张德志
 * :date last edited: 2025-01-11 18:33:16
-->
<template>
  <div class="">
    <!-- <h2 @click="changeName">姓名:{{person.name}}</h2>
    <h2 @click="changeAge">年龄：{{person.age}}</h2> -->
    <input v-model="firstName"/>
    <input v-model="lastName"/>
    <div>{{fullName}}</div>
    <button @click="handleChange">修改fullname</button>
  </div>
</template>
<script lang="ts" setup>

import { ref,computed } from 'vue';

const firstName = ref('zhang');
const lastName = ref('san');


const fullName = computed({
  get() {
    return firstName.value.slice(0,1).toLocaleLowerCase() + firstName.value.slice(1) + '-' + lastName.value;
  },
  set(val) {
    const [str1,str2] = val.split('-');
    firstName.value = str1;
    lastName.value = str2;
  }
})

function handleChange() {
  fullName.value = 'li-sh';
}


</script>
