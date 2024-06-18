<template>
    <div
      v-if="reply?.message"
      class="flex items-center justify-around gap-2 pt-2"
    >
      <div
        class="mb-1 ml-13 flex-1 cursor-pointer rounded border-0 border-l-4 border-green-500 bg-gray-100 p-2 text-base text-gray-600"
        :class="reply.type == 'Incoming' ? 'border-green-500' : 'border-blue-400'"
      >
        <div
          class="mb-1 text-sm font-bold"
          :class="reply.type == 'Incoming' ? 'text-green-500' : 'text-blue-400'"
        >
          {{ reply.from_name || __('You') }}
        </div>
        <div class="max-h-12 overflow-hidden" v-html="reply.message" />
      </div>
  
      <Button variant="ghost" icon="x" @click="reply = {}" />
    </div>
    <div class="flex items-end gap-2 py-2.5" style="width: 100%;">
      <div class="flex h-8 items-center gap-2">
        <FileUploader @success="(file) => uploadFile(file)">
          <template v-slot="{ openFileSelector }">
            <div class="flex items-center space-x-2">
              <Dropdown :options="uploadOptions(openFileSelector)">
                <FeatherIcon
                  name="plus"
                  class="size-4.5 cursor-pointer text-gray-600"
                />
              </Dropdown>
            </div>
          </template>
        </FileUploader>
        <IconPicker
          v-model="emoji"
          v-slot="{ togglePopover }"
          @update:modelValue="
            () => {
              content += emoji
              $refs.textarea.$el.focus()
            }
          "
        >
          <SmileIcon
            @click="togglePopover"
            class="flex size-4.5 cursor-pointer rounded-sm text-xl leading-none text-gray-500"
          />
        </IconPicker>
      </div>
      <Button variant="ghost" icon="x" @click="closeComment()" />
      <Textarea
        ref="textarea"
        type="textarea"
        class="min-h-8 w-full"
        :rows="rows"
        v-model="content"
        :placeholder="placeholder"
        @focus="rows = 6"
        @blur="rows = 1"
        @keydown.enter="(e) => sendTextMessage(e)"
      />
    </div>
  </template>
  
  <script setup>
  import IconPicker from '@/components/IconPicker.vue'
  import SmileIcon from '@/components/Icons/SmileIcon.vue'
  import { createResource, Textarea, FileUploader, Dropdown , call } from 'frappe-ui'
  import FeatherIcon from 'frappe-ui/src/components/FeatherIcon.vue'
  import { ref, computed, nextTick, watch } from 'vue'
  import {sessionStore} from '@/stores/session'
  import { usersStore } from '@/stores/users'
  
  
  const props = defineProps({
    idcommentparent: String,
    reply_comment_for: String
  })
  const emit = defineEmits(['close_comment']);
  const reload = defineModel('reload')
  const doc = defineModel()
  const whatsapp = defineModel('whatsapp')
  const reply = defineModel('reply')
  const rows = ref(1)
  const textarea = ref(null)
  const emoji = ref('')
  
  const content = ref('')
  const placeholder = ref(__('Type your comment here...'))
  const fileType = ref('')
  const tag_user = ref('')
  const { user } = sessionStore()
  const { getUser } = usersStore()

  watch(
    () => props.reply_comment_for,
    (newVal) => {
        if (newVal) {
            if(user == newVal) tag_user.value = `@${__("Me")}`;
            else tag_user.value = `@${getUser(newVal).username}`; 
            placeholder.value = `${__('Type your comment here...')}`;
            content.value = `${tag_user.value} `;
        } else {
            placeholder.value = __('Type your comment here...');
            content.value = '';
        }
    },
    { immediate: true }
  );
  function show() {
    nextTick(() => textarea.value.$el.focus())
  }
  
  function uploadFile(file) {
    whatsapp.value.attach = file.file_url
    whatsapp.value.content_type = fileType.value
    sendWhatsAppMessage()
  }
  
  function sendTextMessage(event) {
    if (event.shiftKey) return
    sendWhatsAppMessage()
    textarea.value.$el.blur()
    content.value = ''
  }
  
  async function sendWhatsAppMessage() {
    let isRelyFor = false;
    if (content.value.includes(tag_user.value)){
        isRelyFor = true;
        content.value = content.value.replaceAll(tag_user.value, "");
    }
    let d = await call('frappe.client.insert', {
      doc: {
        doctype: 'Comment Child',
        content: content.value,
        id_comment_parent: props.idcommentparent,
        reply_for: isRelyFor? props.reply_comment_for : null
      },
    })
    content.value = ''
    fileType.value = ''
    whatsapp.value.attach = ''
    whatsapp.value.content_type = 'text'
    reply.value = {}
    reload.value = true
    emit('close_comment')
  }

  function closeComment(){
    emit('close_comment')
  }
  
  function uploadOptions(openFileSelector) {
    return [
      {
        label: __('Upload Document'),
        icon: 'file',
        onClick: () => {
          fileType.value = 'document'
          openFileSelector()
        },
      },
      {
        label: __('Upload Image'),
        icon: 'image',
        onClick: () => {
          fileType.value = 'image'
          openFileSelector('image/*')
        },
      },
      {
        label: __('Upload Video'),
        icon: 'video',
        onClick: () => {
          fileType.value = 'video'
          openFileSelector('video/*')
        },
      },
    ]
  }
  
  watch(reply, (value) => {
    if (value?.message) {
      show()
    }
  })
  
  defineExpose({ show })
  </script>
  