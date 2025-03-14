<template>
  <Dialog v-model="show" :options="dialogOptions">
    <template #body>
      <div class="bg-white px-4 pb-6 pt-5 sm:px-6">
        <div class="mb-5 flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-semibold leading-6 text-gray-900">
              {{ __(dialogOptions.title) || __('Untitled') }}
            </h3>
          </div>
          <div class="flex items-center gap-1">
            <Button
              v-if="detailMode"
              variant="ghost"
              class="w-7"
              @click="detailMode = false"
            >
              <EditIcon class="h-4 w-4" />
            </Button>
            <Button variant="ghost" class="w-7" @click="show = false">
              <FeatherIcon name="x" class="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <div v-if="detailMode" class="flex flex-col gap-3.5">
            <div
              class="flex h-7 items-center gap-2 text-base text-gray-800"
              v-for="field in fields"
              :key="field.name"
            >
              <div class="grid w-7 place-content-center">
                <component :is="field.icon" />
              </div>
              <div>{{ field.value }}</div>
            </div>
          </div>
          <Fields v-else :sections="sections" :data="_organization" />
        </div>
      </div>
      <div v-if="!detailMode" class="px-4 pb-7 pt-4 sm:px-6">
        <div class="space-y-2">
          <Button
            class="w-full"
            v-for="action in dialogOptions.actions"
            :key="action.label"
            v-bind="action"
            :label="__(action.label)"
            :loading="loading"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import Fields from '@/components/Fields.vue'
import EditIcon from '@/components/Icons/EditIcon.vue'
import WebsiteIcon from '@/components/Icons/WebsiteIcon.vue'
import OrganizationsIcon from '@/components/Icons/OrganizationsIcon.vue'
import TerritoryIcon from '@/components/Icons/TerritoryIcon.vue'
import { call, FeatherIcon } from 'frappe-ui'
import { ref, nextTick, watch, computed, h } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  options: {
    type: Object,
    default: {
      redirect: true,
      detailMode: false,
      afterInsert: () => {},
    },
  },
})

const router = useRouter()
const show = defineModel()
const organization = defineModel('organization')

const loading = ref(false)
const title = ref(null)
const detailMode = ref(false)
const editMode = ref(false)
let _organization = ref({
  organization_name: '',
  website: '',
  annual_revenue: '',
  no_of_employees: '1-10',
  industry: '',
})

let doc = ref({})

async function updateOrganization() {
  const old = { ...doc.value }
  const newOrg = { ..._organization.value }

  const nameChanged = old.organization_name !== newOrg.organization_name
  delete old.organization_name
  delete newOrg.organization_name

  const otherFieldChanged = JSON.stringify(old) !== JSON.stringify(newOrg)
  const values = newOrg

  if (!nameChanged && !otherFieldChanged) {
    show.value = false
    return
  }

  let name
  loading.value = true
  if (nameChanged) {
    name = await callRenameDoc()
  }
  if (otherFieldChanged) {
    name = await callSetValue(values)
  }
  handleOrganizationUpdate({ name }, nameChanged)
}

async function callRenameDoc() {
  const d = await call('frappe.client.rename_doc', {
    doctype: 'CRM Organization',
    old_name: doc.value?.organization_name,
    new_name: _organization.value.organization_name,
  })
  loading.value = false
  return d
}

async function callSetValue(values) {
  const d = await call('frappe.client.set_value', {
    doctype: 'CRM Organization',
    name: _organization.value.name,
    fieldname: values,
  })
  loading.value = false
  return d.name
}

async function callInsertDoc() {
  const doc = await call('frappe.client.insert', {
    doc: {
      doctype: 'CRM Organization',
      ..._organization.value,
    },
  })
  loading.value = false
  doc.name && handleOrganizationUpdate(doc)
}

function handleOrganizationUpdate(doc, renamed = false) {
  if (doc.name && (props.options.redirect || renamed)) {
    router.push({
      name: 'Organization',
      params: { organizationId: doc.name },
    })
  } else {
    organization.value.reload?.()
  }
  show.value = false
  props.options.afterInsert && props.options.afterInsert(doc)
}

const dialogOptions = computed(() => {
  let title = !editMode.value
    ? __('New Organization')
    : __(_organization.value.organization_name)
  let size = detailMode.value ? '' : 'xl'
  let actions = detailMode.value
    ? []
    : [
        {
          label: editMode.value ? __('Save') : __('Create'),
          variant: 'solid',
          onClick: () =>
            editMode.value ? updateOrganization() : callInsertDoc(),
        },
      ]

  return { title, size, actions }
})

const fields = computed(() => {
  let details = [
    {
      icon: OrganizationsIcon,
      name: 'organization_name',
      value: _organization.value.organization_name,
    },
    {
      icon: WebsiteIcon,
      name: 'website',
      value: _organization.value.website,
    },
    {
      icon: TerritoryIcon,
      name: 'territory',
      value: _organization.value.territory,
    },
    {
      icon: h(FeatherIcon, { name: 'dollar-sign', class: 'h-4 w-4' }),
      name: 'annual_revenue',
      value: _organization.value.annual_revenue,
    },
    {
      icon: h(FeatherIcon, { name: 'hash', class: 'h-4 w-4' }),
      name: 'no_of_employees',
      value: _organization.value.no_of_employees,
    },
    {
      icon: h(FeatherIcon, { name: 'briefcase', class: 'h-4 w-4' }),
      name: 'industry',
      value: _organization.value.industry,
    },
  ]

  return details.filter((field) => field.value)
})

const sections = computed(() => {
  return [
    {
      section: 'Organization Name',
      columns: 1,
      fields: [
        {
          label: 'Organization Name',
          name: 'organization_name',
          type: 'data'
        },
      ],
    },
    {
      section: 'Website & Revenue',
      columns: 2,
      hideBorder: true,
      fields: [
        {
          label: 'Website',
          name: 'website',
          type: 'data'
        },
        {
          label: 'Annual Revenue',
          name: 'annual_revenue',
          type: 'data'
        },
      ],
    },
    {
      section: 'Territory',
      columns: 1,
      hideBorder: true,
      fields: [
        {
          label: 'Territory',
          name: 'territory',
          type: 'link',
          doctype: 'CRM Territory',
          placeholder: __('Select Territory'),
          emptydata: 'No territory have been created yet'
        },
      ],
    },
    {
      section: 'No of Employees & Industry',
      columns: 2,
      hideBorder: true,
      fields: [
        {
          label: 'No of Employees',
          name: 'no_of_employees',
          type: 'select',
          options: [
            { label: __('1-10'), value: '1-10' },
            { label: __('11-50'), value: '11-50' },
            { label: __('51-200'), value: '51-200' },
            { label: __('201-500'), value: '201-500' },
            { label: __('501-1000'), value: '501-1000' },
            { label: __('1001-5000'), value: '1001-5000' },
            { label: __('5001-10000'), value: '5001-10000' },
            { label: __('10001+'), value: '10001+' },
          ],
          placeholder: __('Select No Of Employees'),
        },
        {
          label: 'Industry',
          name: 'industry',
          type: 'link',
          doctype: 'CRM Industry',
          placeholder: __('Select Industry'),
          emptydata: 'No industry have been created yet'
        },
      ],
    },
  ]
})

watch(
  () => show.value,
  (value) => {
    if (!value) return
    editMode.value = false
    detailMode.value = props.options.detailMode
    nextTick(() => {
      // TODO: Issue with FormControl
      // title.value.el.focus()
      doc.value = organization.value?.doc || organization.value || {}
      _organization.value = { ...doc.value }
      if (_organization.value.name) {
        editMode.value = true
      }
    })
  }
)
</script>
