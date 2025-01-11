# vue 练习 demo

### reactive 对偈响应式

```js
import { reactive } from "vue";

const car = reactive({
  brand: "小汽车",
  price: 100,
});

function changePrice() {
  car.price += 10;
}
```

### 计算属性

```js
import { ref, computed } from "vue";

const firstName = ref("zhang");
const lastName = ref("san");

const fullName = computed(() => {
  return (
    firstName.value.slice(0, 1).toLowerCase() +
    firstName.value.slice(1) +
    "-" +
    lastName.value
  );
});
```

### 计算属性 2

```js
import { ref, computed } from "vue";

const firstName = ref("zhang");
const lastName = ref("san");

const fullName = computed({
  get() {
    return (
      firstName.value.slice(0, 1).toLocaleLowerCase() +
      firstName.value.slice(1) +
      "-" +
      lastName.value
    );
  },
  set(val) {
    const [str1, str2] = val.split("-");
    firstName.value = str1;
    lastName.value = str2;
  },
});

function handleChange() {
  fullName.value = "li-sh";
}
```
