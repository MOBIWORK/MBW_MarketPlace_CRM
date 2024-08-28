<template>
  <Dialog
    v-model="show"
    :options="{
      title: editMode ? __(emailTemplate.name) : __('Create Email Template'),
      size: 'xl',
      actions: [
        {
          label: editMode ? __('Update') : __('Create'),
          variant: 'solid',
          onClick: () => (editMode ? updateEmailTemplate() : callInsertDoc()),
        },
      ],
    }"
  >
    <template #body-content>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <div class="flex-1">
            <div class="mb-1.5 text-sm text-gray-600">
              {{ __('Email name') }}
              <span class="text-red-500">*</span>
            </div>
            <TextInput
              ref="nameRef"
              variant="outline"
              v-model="_emailTemplate.name"
              :placeholder="__('')"
            />
          </div>
          <div class="flex-1">
            <div class="mb-1.5 text-sm text-gray-600">{{ __('Doctype') }}</div>
            <Select
              variant="outline"
              v-model="_emailTemplate.reference_doctype"
              :options="['CRM Deal', 'CRM Lead']"
              :placeholder="__('CRM Deal')"
            />
          </div>
        </div>
        <div>
          <div class="mb-1.5 text-sm text-gray-600">
            {{ __('Subject') }}
            <span class="text-red-500">*</span>
          </div>
          <TextInput
            ref="subjectRef"
            variant="outline"
            v-model="_emailTemplate.subject"
            :placeholder="__('')"
          />
        </div>
        <div>
          <div class="mb-1.5 text-sm text-gray-600">
            {{ __('Content') }}
            <span class="text-red-500">*</span>
          </div>
          <!-- <TextEditor
            variant="outline"
            ref="content"
            editor-class="!prose-sm overflow-auto min-h-[180px] max-h-80 py-1.5 px-2 rounded border border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm focus:bg-white focus:border-gray-500 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400 text-gray-800 transition-colors"
            :bubbleMenu="true"
            :content="_emailTemplate.response"
            @change="(val) => (_emailTemplate.response = val)"
            :placeholder="__('')"
          /> -->
          <TextEditor
            variant="outline"
            ref="content"
            :class="'rounded border border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm focus:bg-white focus:border-gray-500 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400 text-gray-800 transition-colors'"
            :editor-class="'!prose-sm max-w-none min-h-[7rem] overflow-auto py-1.5 px-2'"
            :content="_emailTemplate.response"
            @change="(val) => (_emailTemplate.response = val)"
            :starterkit-options="{ heading: { levels: [2, 3, 4, 5, 6] } }"
          >
            <template v-slot:editor="{ editor }">
              <EditorContent
                :class="'max-h-[50vh] overflow-y-auto py-3'"
                :editor="editor"
              />
            </template>
            <template v-slot:bottom>
              <div class="flex flex-col gap-2">
                <div
                  class="flex justify-between gap-2 overflow-hidden py-2.5 px-1"
                >
                  <div class="flex items-center overflow-x-auto">
                    <TextEditorFixedMenu
                      class="-ml-1"
                      :buttons="textEditorMenuButtons"
                    />
                  </div>
                </div>
              </div>
            </template>
          </TextEditor>
        </div>
        <div>
          <Checkbox v-model="_emailTemplate.enabled" :label="__('Enabled')" />
        </div>
        <ErrorMessage :message="__(errorMessage)" />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { Checkbox, Select, TextEditorFixedMenu, TextEditor, call } from 'frappe-ui'
import { ref, nextTick, watch } from 'vue'
import { validateEmail } from '@/utils'
import { EditorContent } from '@tiptap/vue-3'

const props = defineProps({
  emailTemplate: {
    type: Object,
    default: {},
  },
})

const show = defineModel()
const emailTemplates = defineModel('reloadEmailTemplates')
const errorMessage = ref('')

const emit = defineEmits(['after'])

const subjectRef = ref(null)
const nameRef = ref(null)
const editMode = ref(false)
let _emailTemplate = ref({})

async function updateEmailTemplate() {
  if (!validate()) return
  const old = { ...props.emailTemplate }
  const newEmailTemplate = { ..._emailTemplate.value }

  const nameChanged = old.name !== newEmailTemplate.name
  delete old.name
  delete newEmailTemplate.name

  const otherFieldChanged =
    JSON.stringify(old) !== JSON.stringify(newEmailTemplate)
  const values = newEmailTemplate

  if (!nameChanged && !otherFieldChanged) {
    show.value = false
    return
  }

  let name
  if (nameChanged) {
    name = await callRenameDoc()
  }
  if (otherFieldChanged) {
    name = await callSetValue(values)
  }
  handleEmailTemplateUpdate({ name })
}

async function callRenameDoc() {
  const d = await call('frappe.client.rename_doc', {
    doctype: 'Email Template',
    old_name: props.emailTemplate.name,
    new_name: _emailTemplate.value.name,
  })
  return d
}

async function callSetValue(values) {
  const d = await call('frappe.client.set_value', {
    doctype: 'Email Template',
    name: _emailTemplate.value.name,
    fieldname: values,
  })
  return d.name
}

async function callInsertDoc() {
  if (!validate()) return
  const doc = await call('frappe.client.insert', {
    doc: {
      doctype: 'Email Template',
      ..._emailTemplate.value,
    },
  })
  doc.name && handleEmailTemplateUpdate(doc)
}

function handleEmailTemplateUpdate(doc) {
  emailTemplates.value?.reload()
  show.value = false
}

function validate() {
  if (!_emailTemplate.value.name) {
    errorMessage.value = 'Name is required'
    return false
  }
  if (!_emailTemplate.value.subject) {
    errorMessage.value = 'Subject is required'
    return false
  }
  if (
    !_emailTemplate.value.response ||
    _emailTemplate.value.response === '<p></p>'
  ) {
    errorMessage.value = 'Content is required'
    return false
  }
  return true
}

watch(
  () => show.value,
  (value) => {
    if (!value) return
    editMode.value = false
    errorMessage.value = ''
    nextTick(() => {
      if (_emailTemplate.value.name) {
        subjectRef.value.el.focus()
      } else {
        nameRef.value.el.focus()
      }
      _emailTemplate.value = { ...props.emailTemplate }
      if (_emailTemplate.value.name) {
        editMode.value = true
      }
    })
  }
)
const textEditorMenuButtons = [
  'Paragraph',
  ['Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'],
  'Separator',
  'Bold',
  'Italic',
  'Separator',
  'Bullet List',
  'Numbered List',
  'Separator',
  'Align Left',
  'Align Center',
  'Align Right',
  'FontColor',
  'Separator',
  'Image',
  'Video',
  'Link',
  'Blockquote',
  'Code',
  'Horizontal Rule',
  [
    'InsertTable',
    'AddColumnBefore',
    'AddColumnAfter',
    'DeleteColumn',
    'AddRowBefore',
    'AddRowAfter',
    'DeleteRow',
    'MergeCells',
    'SplitCell',
    'ToggleHeaderColumn',
    'ToggleHeaderRow',
    'ToggleHeaderCell',
    'DeleteTable',
  ],
]
</script>
