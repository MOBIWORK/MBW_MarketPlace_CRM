<template>
  <Dialog
    v-model="show"
    :options="{
      size: '3xl',
      title: __('Create Lead'),
    }"
  >
    <template #body-content>
      <Fields :sections="sections" :data="lead" />
      <ErrorMessage class="mt-4" v-if="error" :message="__(error)" />
    </template>
    <template #actions>
      <div class="flex flex-row-reverse gap-2">
        <Button
          variant="solid"
          :label="__('Create')"
          :loading="isLeadCreating"
          @click="createNewLead"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import Fields from '@/components/Fields.vue'
import { usersStore } from '@/stores/users'
import { statusesStore } from '@/stores/statuses'
import { createResource, call } from 'frappe-ui'
import { computed, onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const { getUser } = usersStore()
const { getLeadStatus, statusOptions } = statusesStore()

const show = defineModel()
const router = useRouter()
const error = ref(null)
const isLeadCreating = ref(false)

const lead = reactive({
  salutation: '',
  first_name: '',
  last_name: '',
  email: '',
  mobile_no: '',
  gender: '',
  organization: '',
  website: '',
  no_of_employees: '',
  territory: '',
  annual_revenue: '',
  industry: '',
  status: '',
  lead_owner: '',
  note: '',
  assign_to: JSON.stringify([])
})

const sections = computed(() => {
  return [
    {
      section: 'Contact Details',
      fields: [
        {
          label: 'Salutation',
          name: 'salutation',
          type: 'link',
          placeholder: __('Select Salutation'),
          doctype: 'Salutation',
        },
        {
          label: 'First Name',
          name: 'first_name',
          mandatory: true,
          type: 'data'
        },
        // {
        //   label: 'Last Name',
        //   name: 'last_name',
        //   type: 'data',
        //   placeholder: '',
        // },
        {
          label: 'Email',
          name: 'email',
          type: 'data'
        },
        {
          label: 'Mobile No',
          name: 'mobile_no',
          type: 'data'
        },
        {
          label: 'Gender',
          name: 'gender',
          type: 'link',
          doctype: 'Gender',
          placeholder: __('Select Gender'),
        },
      ],
    },
    {
      section: 'Organization Details',
      fields: [
        {
          label: 'Organization',
          name: 'organization',
          type: 'data'
        },
        {
          label: 'Website',
          name: 'website',
          type: 'data'
        },
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
          label: 'Territory',
          name: 'territory',
          type: 'link',
          doctype: 'CRM Territory',
          placeholder: __('Select Territory'),
          emptydata: 'No territory have been created yet'
        },
        {
          label: 'Annual Revenue',
          name: 'annual_revenue',
          type: 'data'
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
    {
      section: 'Note Details',
      columns: 1,
      fields: [
        {
          label: '',
          name: 'note',
          type: 'dropdownNote',
          placeholder: '',
          doctype: '',
        },
      ],
    },
    {
      section: 'Other Details',
      columns: 2,
      fields: [
        {
          label: 'Status',
          name: 'status',
          type: 'select',
          options: leadStatuses.value,
          prefix: getLeadStatus(lead.status).iconColorClass,
        },
        {
          label: 'Lead Owner',
          name: 'lead_owner',
          type: 'user',
          placeholder: __('Lead Owner'),
          doctype: 'User',
          hidden_delete: true
        },
      ],
    },
  ]
})

const createLead = createResource({
  url: 'frappe.client.insert',
  makeParams(values) {
    return {
      doc: {
        doctype: 'CRM Lead',
        ...values,
      },
    }
  },
})

const leadStatuses = computed(() => {
  let statuses = statusOptions('lead')
  if (!lead.status) {
    lead.status = statuses[0].value
  }
  return statuses
})

async function createNewLead() {
  lead.assign_to = JSON.stringify([lead.lead_owner]);
  createLead.submit(lead, {
    validate() {
      error.value = null
      if (!lead.first_name) {
        error.value = __('First Name is mandatory')
        return error.value
      }
      if (lead.website && !lead.website.startsWith('http')) {
        lead.website = 'https://' + lead.website
      }
      if (lead.annual_revenue) {
        lead.annual_revenue = lead.annual_revenue.replace(/,/g, '')
        if (isNaN(lead.annual_revenue)) {
          error.value = __('Annual Revenue should be a number')
          return error.value
        }
      }
      const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/;
      if (lead.email && !emailRegex.test(lead.email)) {
        error.value = __('Invalid Email')
        return error.value
      }
      isLeadCreating.value = true
    },
    async onSuccess(data) {
      isLeadCreating.value = false
      show.value = false
      router.push({ name: 'Lead', params: { leadId: data.name } })
      if (lead.note != null && lead.note != "") {
        let d = await call('frappe.client.insert', {
          doc: {
            doctype: 'FCRM Note',
            title: data.name,
            content: lead.note,
            reference_doctype: 'CRM Lead',
            reference_docname: data.name,
          },
        })
      }
    },
  })
}

onMounted(() => {
  if (!lead.lead_owner) {
    lead.lead_owner = getUser().email
  }
})
</script>
