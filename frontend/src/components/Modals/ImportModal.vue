<template>
    <Dialog
      v-model="show"
      :options="{
      size: '4xl',
      title: __('Import'),
      
    }"
    
    >
      <template #body-content>
        <iframe id="myFrame" style="width: 100%; height: 350px;" src="/app/data-import/new-data-import"></iframe>
      </template>
      <template #actions>
        <div class="flex flex-row-reverse gap-2">
          <Button
            variant="solid"
            :label="__('Close')"
            :loading="isDealCreating"
            @click="createDeal"
          />
        </div>
      </template>
    </Dialog>
  </template>
  
  <script setup>
  import Fields from '@/components/Fields.vue'
  import { usersStore } from '@/stores/users'
  import { statusesStore } from '@/stores/statuses'
  import { Switch, createResource } from 'frappe-ui'
  import { computed, ref, reactive, onMounted ,nextTick} from 'vue'
  import { useRouter } from 'vue-router'
  
  const { getUser } = usersStore()
  const { getDealStatus, statusOptions } = statusesStore()
  
  const show = defineModel()
  const router = useRouter()
  const error = ref(null)
  const isDealCreating = ref(false)
  function createDeal() {
    show.value = false
  }
  
  onMounted(() => {
    nextTick(() => {
    const iframe = document.getElementById('myFrame');
    console.log(iframe);
  })
})
 
  </script>
  <style scoped>
 
  </style>