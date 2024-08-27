<template>
  <div v-if="notificationsStore().visible" ref="target"
    class="absolute z-20 h-screen bg-white transition-all duration-300 ease-in-out" :style="{
      'box-shadow': '8px 0px 8px rgba(0, 0, 0, 0.1)',
      'max-width': '350px',
      'min-width': '350px',
      left: 'calc(100% + 1px)',
    }">
    <div class="flex h-screen flex-col">
      <div class="z-20 flex items-center justify-between border-b bg-white px-5 py-2.5">
        <div class="text-base font-medium">{{ __('Notifications') }}</div>
        <div class="flex gap-1">
          <Tooltip :text="__('Mark all as read')">
            <div>
              <Button variant="ghost" @click="() => notificationsStore().mark_as_read.reload()">
                <!-- <template #icon>
                  <MarkAsDoneIcon class="h-4 w-4" />
                </template> -->
                {{__('Mark as read')}}
              </Button>
            </div>
          </Tooltip>
          <Tooltip :text="__('Close')">
            <div>
              <Button variant="ghost" @click="() => toggleNotificationPanel()">
                <template #icon>
                  <FeatherIcon name="x" class="h-4 w-4" />
                </template>
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
      <div style="display: flex;">
        <div :class="['btn-filter-notify', { 'btn-filter-notify-active': notify_type === 'all' }]"
          @click="chang_type_notify('all')">{{ __('All') }}</div>
        <div :class="['btn-filter-notify', { 'btn-filter-notify-active': notify_type === 'Comment' }]"
          @click="chang_type_notify('Comment')">{{ __('Comments') }}</div>
        <div :class="['btn-filter-notify', { 'btn-filter-notify-active': notify_type === 'Task' }]"
          @click="chang_type_notify('Task')">{{ __('Tasks') }}</div>
        <div :class="['btn-filter-notify', { 'btn-filter-notify-active': notify_type === 'Remind' }]"
          @click="chang_type_notify('Remind')">{{ __('Reminds') }}</div>
      </div>
      <div v-if="notificationsStore().allNotifications?.length" class="divide-y overflow-auto text-base">
        <div v-for="n in notificationsStore().allNotifications">
          <template v-if="n.isRouteLink">
            <RouterLink :key="n.name" :to="getRoute(n)"
              class="flex cursor-pointer items-start gap-2.5 px-4 py-2.5 hover:bg-gray-100"
              @click="mark_as_read(n.name || n.notification_type_doc)">
              <div class="mt-1 flex items-center gap-2.5">
                <div class="size-[5px] rounded-full" :class="[n.read ? 'bg-transparent' : 'bg-gray-900']" />
                <WhatsAppIcon v-if="n.type == 'WhatsApp'" class="size-7" />
                <UserAvatar v-else :user="n.from_user.name" size="lg" />
              </div>
              <div>
                <div v-if="n.notification_text" v-html="n.notification_text" />
                <div v-else class="mb-2 space-x-1 leading-5 text-gray-600">
                  <span class="font-medium text-gray-900">
                    {{ n.from_user.full_name }}
                  </span>
                  <span>
                    {{ __('mentioned you in {0}', [n.reference_doctype]) }}
                  </span>
                  <span class="font-medium text-gray-900">
                    {{ n.reference_name }}
                  </span>
                </div>
                <div class="text-sm text-gray-600">
                  {{ __(timeAgo(n.creation)) }}
                </div>
              </div>
            </RouterLink>
          </template>
          <template v-else>
            <div class="flex cursor-pointer items-start gap-2.5 px-4 py-2.5 hover:bg-gray-100"
              @click="onLinkAndAsRead(n)">
              <div class="mt-1 flex items-center gap-2.5">
                <div class="h-[5px] w-[5px] rounded-full" :class="[n.read ? 'bg-transparent' : 'bg-gray-900']" />
                <WhatsAppIcon v-if="n.type == 'WhatsApp'" class="size-7 rounded-full" />
                <UserAvatar v-else :user="n.from_user.name" size="lg" />
              </div>
              <div>
                <div v-if="n.notification_text" v-html="n.notification_text" />
                <div v-else class="mb-2 space-x-1 leading-5 text-gray-600">
                  <span class="font-medium text-gray-900">
                    {{ n.from_user.full_name }}
                  </span>
                  <span>
                    {{ __('mentioned you in {0}', [n.reference_doctype]) }}
                  </span>
                  <span class="font-medium text-gray-900">
                    {{ n.reference_name }}
                  </span>
                </div>
                <div class="text-sm text-gray-600">
                  {{ __(timeAgo(n.creation)) }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-else class="flex flex-1 flex-col items-center justify-center gap-2">
        <NotificationsIcon class="h-20 w-20 text-gray-300" />
        <div class="text-lg font-medium text-gray-500">
          {{ __('No new notifications') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import WhatsAppIcon from '@/components/Icons/WhatsAppIcon.vue'
import MarkAsDoneIcon from '@/components/Icons/MarkAsDoneIcon.vue'
import NotificationsIcon from '@/components/Icons/NotificationsIcon.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { notificationsStore } from '@/stores/notifications'
import { globalStore } from '@/stores/global'
import { timeAgo } from '@/utils'
import { onClickOutside } from '@vueuse/core'
import { Tooltip } from 'frappe-ui'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { sessionStore } from '@/stores/session'
import { createToast } from '@/utils'
import router from '@/router'
import emitter from '@/eventBus'
import { useRouter } from 'vue-router'

const { $socket } = globalStore()
const { user } = sessionStore()

const target = ref(null)
const notify_type = ref("all")

const routerUse = useRouter()

onClickOutside(
  target,
  () => {
    if (notificationsStore().visible) {
      toggleNotificationPanel()
    }
  },
  {
    ignore: ['#notifications-btn'],
  }
)

function chang_type_notify(type) {
  notify_type.value = type;
  if (type == "all") {
    notificationsStore().notifications.params = {};
  } else {
    notificationsStore().notifications.params = { type_notify: type };
  }
  notificationsStore().notifications.reload();
}

function toggleNotificationPanel() {
  notificationsStore().toggle()
}

function mark_as_read(doc) {
  notificationsStore().mark_doc_as_read(doc)
}

onBeforeUnmount(() => {
  $socket.off('crm_notification');
  $socket.off('web_notification');
})

onMounted(() => {
  $socket.on('crm_notification', () => {
    notificationsStore().notifications.reload()
  })
  $socket.on('web_notification', (data) => {
    if (user == data.to_user) {
      createToast({
        title: data.message,
        icon: 'check',
        iconClasses: 'text-green-600',
      })
    }
  })
})

function getRoute(notification) {
  let params = {
    leadId: notification.reference_name,
  }
  if (notification.route_name === 'Deal') {
    params = {
      dealId: notification.reference_name,
    }
  } else if (notification.route_name === 'Contact') {
    params = {
      contactId: notification.reference_name
    }
  }
  return {
    name: notification.route_name,
    params: params,
    hash: '#' + notification.notification_type_doc,
  }
}

function onLinkAndAsRead(notification) {
  if (notification.read != 1) {
    let doc = "";
    if (notification.name != null && notification.name != "") doc = notification.name;
    if (notification.notification_type_doc != null && notification.notification_type_doc != "") doc = notification.notification_type_doc;
    mark_as_read(doc);
  }
  if(notification.reference_doctype == "task" && notification.reference_name != null && notification.reference_name != ""){
    let is_route_task = false
    if(routerUse.currentRoute['_value'].name == "Tasks") is_route_task = true
    router.push({path: '/tasks', hash: `#${notification.reference_name}`})
    if(is_route_task){
      emitter.emit('custom-event', { message: notification.reference_name });
    }
  }else if(notification.reference_doctype == "task" && (notification.reference_name == null || notification.reference_name == "")){
    router.push('/tasks');
  }
  toggleNotificationPanel()
}

onMounted(() => { })
</script>
<style scoped>
.btn-filter-notify {
  background-color: #f4f4f4 !important;
  color: #444 !important;
  border-color: #ddd !important;
  font-size: 13px;
  margin-left: 5px;
  border-radius: 15px;
  margin: 10px 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-filter-notify-active {
  background-color: #baebe1 !important;
  color: #1876f2 !important;
  border-color: #baebe1 !important;
  box-shadow: none !important;
  font-weight: 500;
  outline: none !important;
}
</style>
