<template>
    <Dialog
      v-model="show"
      :options="{
        size: '3xl',
        title: __('Bàn giao công việc'),
      }"
    >
      <template #body-content>
        <div style="margin-bottom:10px;border:1px solid #edbfa5;padding:10px;background-color: #edbfa5;">{{__('Chức năng này sẽ chuyển toàn bộ liên hệ và công việc của người bàn giao sang người nhận bàn giao')}}</div>
        <div class="flex gap-4">
          <div class="grid" style="width: 50%;">
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
          <div class="grid" style="width: 50%;">  
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
      </template>
      <template #actions>
        <div class="flex flex-row-reverse gap-2">
          <Button
            variant="solid"
            :label="__('Bàn giao')"
            @click="onShowConfirm"
          />
        </div>
      </template>
    </Dialog>

    <Dialog :options="{
        title: __('Xác nhận'),
        message: __(`Bạn có chắc chắn muốn bàn giao toàn bộ công việc cho ${convertTaskCustomer.to_user}?`),
        size: 'xl',
        actions: [
          {
            label: __('Đồng ý'),
            variant: 'solid',
            loading: isLoadingConverting,
            onClick: onConvertTaskAndCustomer
          }
        ]
      }"
      v-model="showConfirmConvert">
    </Dialog>
  </template>
  
  <script setup>
  import { usersStore } from '@/stores/users'
  import { createResource , call} from 'frappe-ui'
  import { computed, onMounted, ref } from 'vue'
  import Link from '@/components/Controls/Link.vue'
  import {
  createToast
} from '@/utils'
  
  const { getUser } = usersStore()
  const show = defineModel()
  const showConfirmConvert = ref(false)
  const convertTaskCustomer = ref({
    from_user: '',
    to_user: ''
  })
  const isLoadingConverting = ref(true)
  const emit = defineEmits(['afterConvertTask'])
  
  async function onShowConfirm() {
    if(convertTaskCustomer.value.from_user == "" || convertTaskCustomer.value.to_user == ""){
      createToast({
        title: __('Error'),
        text: __("Bạn chưa chọn người phụ trách và nhận phụ trách. Vui lòng chọn người phụ trách và nhận phụ trách để tiếp tục sử dụng chức năng"),
        icon: 'x',
        iconClasses: 'text-red-600',
      })
      return;
    }
    if(convertTaskCustomer.value.from_user == convertTaskCustomer.value.to_user){
      createToast({
        title: __('Error'),
        text: __("Người bàn giao và người nhận bàn giao phải khác nhau. Vui lòng chọn lại để tiếp tục sử dụng chức năng"),
        icon: 'x',
        iconClasses: 'text-red-600',
      })
      return;
    }
    showConfirmConvert.value = true;
  }

  async function onConvertTaskAndCustomer(){
    isLoadingConverting.value = true;
    createResource({
    url: 'crm.api.activities_sys.convert_task_customer',
    params: { from_user: convertTaskCustomer.value.from_user, to_user: convertTaskCustomer.value.to_user},
    auto: true,
    method: "POST",
    onSuccess(res) {
      isLoadingConverting.value = false;
      createToast({
        title: __('Bàn giao thành công'),
        icon: 'check',
        iconClasses: 'text-green-600',
      })
      showConfirmConvert.value = false;
      if(res == "ok"){
        emit('afterConvertTask')
      }
    },
    onError(error){
      isLoadingConverting.value = false;
      createToast({
        title: __('Error'),
        text: __("Trong quá trình bàn giao gặp lỗi. Vui lòng liên hệ Admin để tiếp tục bàn giao"),
        icon: 'x',
        iconClasses: 'text-red-600',
      })
    }
  })
  }
  
  </script>
  