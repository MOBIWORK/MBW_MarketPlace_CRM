<template>
  <Dropdown :options="dropdownOptions">
    <template v-slot="{ open }">
      <button
        class="flex h-12 items-center rounded-md py-2 duration-300 ease-in-out"
        :class="
          isCollapsed
            ? 'w-auto px-0'
            : open
            ? 'w-52 bg-white px-2 shadow-sm'
            : 'w-52 px-2 hover:bg-gray-200'
        "
      >
        <CRMLogo class="size-8 flex-shrink-0 rounded" />
        <div
          class="flex flex-1 flex-col text-left duration-300 ease-in-out"
          :class="
            isCollapsed
              ? 'ml-0 w-0 overflow-hidden opacity-0'
              : 'ml-2 w-auto opacity-100'
          "
        >
          <div class="text-base font-medium leading-none text-gray-900">
            {{ __('CRM') }}
          </div>
          <div class="mt-1 text-sm leading-none text-gray-700">
            {{ user.full_name }}
          </div>
        </div>
        <div
          class="duration-300 ease-in-out"
          :class="
            isCollapsed
              ? 'ml-0 w-0 overflow-hidden opacity-0'
              : 'ml-2 w-auto opacity-100'
          "
        >
          <FeatherIcon
            name="chevron-down"
            class="size-4 text-gray-600"
            aria-hidden="true"
          />
        </div>
      </button>
    </template>
  </Dropdown>
  <ConvertTaskCustomerModal v-model="showConvertTaskCustomerModal" @afterConvertTask="onAfterConvertTask()"/>
</template>

<script setup>
import CRMLogo from '@/components/Icons/CRMLogo.vue'
import { sessionStore } from '@/stores/session'
import { usersStore } from '@/stores/users'
import { Dropdown } from 'frappe-ui'
import { computed, ref } from 'vue'
import ConvertTaskCustomerModal from '@/components/Modals/ConvertTaskCustomerModal.vue'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['afterConvertTaskCustomer'])

const { logout } = sessionStore()
const { getUser } = usersStore()

const user = computed(() => getUser() || {})
const showConvertTaskCustomerModal = ref(false)

function hadelClickConvertTask(){
  showConvertTaskCustomerModal.value = true;
}

function onAfterConvertTask(){
  emit('afterConvertTaskCustomer')
}

let dropdownOptions = ref([
  {
    group: 'Manage',
    hideLabel: true,
    items: [
      {
        icon: 'corner-up-left',
        label: computed(() => __('Switch to Desk')),
        onClick: () => window.location.replace('/app'),
      },
      {
        icon: 'life-buoy',
        label: computed(() => __('Support')),
        onClick: () => window.open('https://t.me/frappecrm', '_blank'),
      },
      {
        icon: 'book-open',
        label: computed(() => __('Docs')),
        onClick: () => window.open('https://docs.frappe.io/crm', '_blank'),
      }
      // ,{
      //   icon: 'arrow-right',
      //   label: computed(() => __('Handing over work')),
      //   onClick: () => hadelClickConvertTask()
      // }
    ],
  },
  {
    group: 'Logout',
    hideLabel: true,
    items: [
      {
        icon: 'log-out',
        label: computed(() => __('Log out')),
        onClick: () => logout.submit(),
      },
    ],
  },
])
</script>
