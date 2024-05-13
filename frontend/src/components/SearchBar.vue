<template>
    <TextInput v-model= "search"  type="text">
    <template #suffix>
      <FeatherIcon class="w-4" name="search" />
    </template>
</TextInput>
</template>

<script setup>
import { watch,ref } from 'vue';
// Định nghĩa props và emits
const props = defineProps({
  value: String
});
const emits = defineEmits(['update:modelValue']);
// Biến search được liên kết với giá trị của input
const search = ref(props.value);
watch(search, (newValue, oldValue) => {
  emits('update:modelValue', newValue); // Gửi emit với giá trị mới tới component cha
});
</script>