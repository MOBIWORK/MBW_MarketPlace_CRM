<template>
  <Dialog v-model="show" :options="{ title: __('Bulk Edit') }">
    <template #body-content>
      <div class="mb-4">
        <div class="mb-1.5 text-sm text-gray-600">{{ __('Field') }}</div>
        <Autocomplete
          :value="field.label"
          :options="fields.data"
          @change="(e) => changeField(e)"
          :placeholder="__('Select field')"
        />
      </div>
      <div>
        <div class="mb-1.5 text-sm text-gray-600">{{ __('Value') }}</div>
        <component
          :is="getValueComponent(field)"
          :value="newValue"
          size="md"
          @change="(v) => updateValue(v)"
        >
        <template #item-label="{ option }" v-if="field.value=='lead_owner'">
            <Tooltip :text="option.value">
              <div class="cursor-pointer">
                {{ getUser(option.value).first_name }}
              </div>
            </Tooltip>
          </template>
        </component>
      </div>
    </template>
    <template #actions>
      <Button
        class="w-full"
        variant="solid"
        @click="updateValues"
        :loading="loading"
        :label="__('Update {0} Records', [recordCount])"
      />
    </template>
  </Dialog>
</template>

<script setup>
import DatePicker from '@/components/Controls/DatePicker.vue'
import Link from '@/components/Controls/Link.vue'
import Autocomplete from '@/components/frappe-ui/Autocomplete.vue'
import { FormControl, call, createResource, TextEditor } from 'frappe-ui'
import { ref, computed, onMounted, h } from 'vue'
import { usersStore } from '@/stores/users'

const typeCheck = ['Check']
const typeLink = ['Link', 'Dynamic Link']
const typeNumber = ['Float', 'Int', 'Currency', 'Percent']
const typeSelect = ['Select']
const typeEditor = ['Text Editor']
const typeDate = ['Date', 'Datetime']

const props = defineProps({
  doctype: {
    type: String,
    required: true,
  },
  selectedValues: {
    type: Array,
    required: true,
  },

})

const show = defineModel()
const unselectAll = defineModel('unselectAll')
const { getUser } = usersStore()

const emit = defineEmits(['reload'])

const fields = createResource({
  url: 'crm.api.doc.get_fields',
  cache: ['fields', props.doctype],
  params: {
    doctype: props.doctype,
  }
})

onMounted(() => {
  if (fields.data?.length) return
  fields.fetch()
})

const recordCount = computed(() => props.selectedValues?.size || 0)

const field = ref({
  label: '',
  type: '',
  value: '',
  options: '',
})

const newValue = ref('')
const loading = ref(false)

function updateValues() {
  let fieldVal = newValue.value
  if (field.value.type == 'Check') {
    fieldVal = fieldVal == 'Yes' ? 1 : 0
  }
  loading.value = true
  call(
    'frappe.desk.doctype.bulk_update.bulk_update.submit_cancel_or_update_docs',
    {
      doctype: props.doctype,
      docnames: Array.from(props.selectedValues),
      action: 'update',
      data: {
        [field.value.value]: fieldVal || null,
      },
    }
  ).then(() => {
    field.value = {
      label: '',
      type: '',
      value: '',
      options: '',
    }
    newValue.value = ''
    loading.value = false
    show.value = false
    unselectAll.value()
    emit('reload')
  })
}

function changeField(f) {
  newValue.value = ''
  if (!f) return
  field.value = f
}

function updateValue(v) {
  let value = v.target ? v.target.value : v
  newValue.value = value
}

function getSelectOptions(options) {
  return options.split('\n')
}

function getValueComponent(f) {
  const { type, options } = f
  if (typeSelect.includes(type) || typeCheck.includes(type)) {
    const _options = type == 'Check' ? ['Yes', 'No'] : getSelectOptions(options)
    return h(FormControl, {
      type: 'select',
      options: _options.map((o) => ({
        label: o,
        value: o,
      })),
    })
  } else if (typeLink.includes(type)) {
    if (type == 'Dynamic Link') {
      return h(FormControl, { type: 'text' })
    }
    return h(Link, { class: 'form-control', doctype: options })
  } else if (typeNumber.includes(type)) {
    return h(FormControl, { type: 'number' })
  } else if (typeDate.includes(type)) {
    return h(DatePicker)
  } else if (typeEditor.includes(type)) {
    return h(TextEditor, {
      variant: 'outline',
      editorClass:
        '!prose-sm overflow-auto min-h-[80px] max-h-80 py-1.5 px-2 rounded border border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm focus:bg-white focus:border-gray-500 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400 text-gray-800 transition-colors',
      bubbleMenu: true,
      content: newValue.value,
    })
  }else if(type == "Rating"){
    return h(FormControl, {
      type: 'select',
      options: [
        {label: 1, value: 0.2},
        {label: 2, value: 0.4},
        {label: 3, value: 0.6},
        {label: 4, value: 0.8},
        {label: 5, value: 1}
      ],
    })
  }else {
    return h(FormControl, { type: 'text' })
  }
}
</script>
