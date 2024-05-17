<template>
    <Dialog
      v-model="show"
      :options="{
        size: '3xl',
        title: __('Bàn giao công việc'),
      }"
    >
      <template #body-content>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-2">
            <div>
            <div class="mb-1.5 text-sm text-gray-600">{{ __('Người bàn giao') }}</div>
            <Link
            class="form-control"
            :value="getUser(convertTaskCustomer.from_user).full_name"
            doctype="User"
            @change="(option) => (convertTaskCustomer.from_user = option)"
            :hideMe="true"
            >
              <template #prefix>
                <UserAvatar class="mr-2 !h-4 !w-4" :user="convertTaskCustomer.from_user" />
              </template>
              <template #item-prefix="{ option }">
                <UserAvatar class="mr-2" :user="option.value" size="sm" />
              </template>
              <template #item-label="{ option }">
                <Tooltip :text="option.value">
                  <div class="cursor-pointer">
                    {{ getUser(option.value).full_name }}
                  </div>
                </Tooltip>
              </template>
            </Link>
          </div>
          </div>
          <div class="grid grid-cols-2">
            <div>
            <div class="mb-1.5 text-sm text-gray-600">{{ __('Người nhận bàn giao') }}</div>
            <Link
            class="form-control"
            :value="getUser(convertTaskCustomer.to_user).full_name"
            doctype="User"
            @change="(option) => (convertTaskCustomer.to_user = option)"
            :hideMe="true"
            >
              <template #prefix>
                <UserAvatar class="mr-2 !h-4 !w-4" :user="convertTaskCustomer.to_user" />
              </template>
              <template #item-prefix="{ option }">
                <UserAvatar class="mr-2" :user="option.value" size="sm" />
              </template>
              <template #item-label="{ option }">
                <Tooltip :text="option.value">
                  <div class="cursor-pointer">
                    {{ getUser(option.value).full_name }}
                  </div>
                </Tooltip>
              </template>
            </Link>
          </div>
          </div>
          
        </div>
      </template>
      <template #actions>
        <div class="flex flex-row-reverse gap-2">
          <Button
            variant="solid"
            :label="__('Bàn giao')"
            @click="onConvertTasskCustomer"
          />
        </div>
      </template>
    </Dialog>
  </template>
  
  <script setup>
  import { usersStore } from '@/stores/users'
  import { createResource , call} from 'frappe-ui'
  import { computed, onMounted, ref } from 'vue'
  import Link from '@/components/Controls/Link.vue'
  
  const { getUser } = usersStore()
  
  const show = defineModel()
  
  const convertTaskCustomer = ref({
    from_user: '',
    to_user: ''
  })
  
  async function onConvertTasskCustomer() {
    console.log(convertTaskCustomer);
  }
  
  </script>
  