<template>
  <Dialog
    v-model="show"
    :options="{
      title: editMode
        ? __('Edit View')
        : duplicateMode
        ? __('Duplicate View')
        : __('Create View'),
      actions: [
        {
          label: editMode
            ? __('Save Changes')
            : duplicateMode
            ? __('Duplicate')
            : __('Create'),
          variant: 'solid',
          onClick: () => (editMode ? update() : create()),
        },
      ],
    }"
  >
    <template #body-content>
      <FormControl
        variant="outline"
        size="md"
        type="text"
        :label="__('View Name')"
        :placeholder="__('My Open Deals')"
        v-model="view.label"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { call } from 'frappe-ui'
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  doctype: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    default: {
      afterCreate: () => {},
      afterUpdate: () => {},
    },
  },
})

const show = defineModel()
const view = defineModel('view')

const editMode = ref(false)
const duplicateMode = ref(false)

const _view = ref({
  name: '',
  label: '',
  filters: {},
  order_by: 'creation desc',
  columns: '',
  rows: '',
})

async function create() {
  view.value.doctype = props.doctype
  let v = await call(
    'crm.fcrm.doctype.crm_view_settings.crm_view_settings.create',
    { view: view.value }
  )
  show.value = false
  props.options.afterCreate?.(v)
}

async function update() {
  view.value.doctype = props.doctype
  await call('crm.fcrm.doctype.crm_view_settings.crm_view_settings.update', {
    view: view.value,
  })
  show.value = false
  props.options.afterUpdate?.(view.value)
}

watch(show, (value) => {
  if (!value) return
  editMode.value = false
  duplicateMode.value = false
  nextTick(() => {
    _view.value = { ...view.value }
    if (_view.value.name) {
      editMode.value = true
    } else if (_view.value.label) {
      duplicateMode.value = true
    }
  })
})
</script>
