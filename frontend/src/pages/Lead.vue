<template>
  <LayoutHeader v-if="lead.data">
    <template #left-header>
      <Breadcrumbs :items="breadcrumbs" />
    </template>
    <template #right-header>
      <CustomActions
        v-if="lead.data._customActions"
        :actions="lead.data._customActions"
      />
      <component :is="lead.data._assignedTo?.length == 1 ? 'Button' : 'div'">
        <MultipleAvatar
          :avatars="lead.data._assignedTo"
          @click="showAssignmentModal = true"
        />
      </component>
      <Dropdown :options="statusOptions('lead', updateField)">
        <template #default="{ open }">
          <Button
            :label="__(lead.data.status)"
            :class="getLeadStatus(lead.data.status).colorClass"
          >
            <template #prefix>
              <IndicatorIcon />
            </template>
            <template #suffix>
              <FeatherIcon
                :name="open ? 'chevron-up' : 'chevron-down'"
                class="h-4"
              />
            </template>
          </Button>
        </template>
      </Dropdown>
      <Button
        :label="__('Convert to Deal')"
        variant="solid"
        @click="showConvertToDealModal = true"
      />
    </template>
  </LayoutHeader>
  <div v-if="lead?.data" class="flex h-full overflow-hidden">
    <Tabs v-model="tabIndex" v-slot="{ tab }" :tabs="tabs">
      <Activities
        ref="activities"
        doctype="CRM Lead"
        :title="tab.name"
        v-model:reload="reload"
        v-model:tabIndex="tabIndex"
        v-model="lead"
      />
    </Tabs>
    <Resizer class="flex flex-col justify-between border-l" side="right">
      <div
        class="flex h-10.5 cursor-copy items-center border-b px-5 py-2.5 text-lg font-medium"
        @click="copyToClipboard(lead.data.name)"
      >
        {{ __(lead.data.name) }}
      </div>
      <FileUploader
        @success="(file) => updateField('image', file.file_url)"
        :validateFile="validateFile"
      >
        <template #default="{ openFileSelector, error }">
          <div class="flex items-center justify-start gap-5 border-b p-5">
            <div class="group relative size-12">
              <Avatar
                size="3xl"
                class="size-12"
                :label="lead.data.first_name || __('Untitled')"
                :image="lead.data.image"
              />
              <component
                :is="lead.data.image ? Dropdown : 'div'"
                v-bind="
                  lead.data.image
                    ? {
                        options: [
                          {
                            icon: 'upload',
                            label: lead.data.image
                              ? __('Change image')
                              : __('Upload image'),
                            onClick: openFileSelector,
                          },
                          {
                            icon: 'trash-2',
                            label: __('Remove image'),
                            onClick: () => updateField('image', ''),
                          },
                        ],
                      }
                    : { onClick: openFileSelector }
                "
                class="!absolute bottom-0 left-0 right-0"
              >
                <div
                  class="z-1 absolute bottom-0.5 left-0 right-0.5 flex h-9 cursor-pointer items-center justify-center rounded-b-full bg-black bg-opacity-40 pt-3 opacity-0 duration-300 ease-in-out group-hover:opacity-100"
                  style="
                    -webkit-clip-path: inset(12px 0 0 0);
                    clip-path: inset(12px 0 0 0);
                  "
                >
                  <CameraIcon class="size-4 cursor-pointer text-white" />
                </div>
              </component>
            </div>
            <div class="flex flex-col gap-2.5 truncate">
              <Tooltip :text="lead.data.lead_name || __('Set first name')">
                <div class="truncate text-2xl font-medium">
                  {{ lead.data.lead_name || __('Untitled') }}
                </div>
              </Tooltip>
              <div class="flex gap-1.5">
                <Tooltip v-if="callEnabled" :text="__('Make a call')">
                  <Button
                    class="h-7 w-7"
                    @click="
                      () =>
                        lead.data.mobile_no
                          ? makeCall(lead.data.mobile_no)
                          : errorMessage(__('No phone number set'))
                    "
                  >
                    <PhoneIcon class="h-4 w-4" />
                  </Button>
                </Tooltip>
                <Tooltip :text="__('Send an email')">
                  <Button class="h-7 w-7">
                    <EmailIcon
                      class="h-4 w-4"
                      @click="
                        lead.data.email
                          ? openEmailBox()
                          : errorMessage(__('No email set'))
                      "
                    />
                  </Button>
                </Tooltip>
                <Tooltip :text="__('Go to website')">
                  <Button class="h-7 w-7">
                    <LinkIcon
                      class="h-4 w-4"
                      @click="
                        lead.data.website
                          ? openWebsite(lead.data.website)
                          : errorMessage(__('No website set'))
                      "
                    />
                  </Button>
                </Tooltip>
              </div>
              <ErrorMessage :message="__(error)" />
            </div>
          </div>
        </template>
      </FileUploader>
      <SLASection
        v-if="lead.data.sla_status"
        v-model="lead.data"
        @updateField="updateField"
      />
      <div
        v-if="detailSections.length"
        class="flex flex-1 flex-col justify-between overflow-hidden"
      >
        <div class="flex flex-col overflow-y-auto">
          <div
            v-for="(section, i) in detailSections"
            :key="section.label"
            class="flex flex-col p-3"
            :class="{ 'border-b': i !== detailSections.length - 1 }"
          >
            <Section :is-opened="section.opened" :label="section.label">
              <SectionFields
                :fields="section.fields"
                v-model="lead.data"
                @update="updateField"
              />
            </Section>
          </div>
        </div>
      </div>
    </Resizer>
  </div>
  <AssignmentModal
    v-if="lead.data"
    :doc="lead.data"
    v-model="showAssignmentModal"
    v-model:assignees="lead.data._assignedTo"
    @update="onUpdateLead"
  />
  <Dialog
    v-model="showConvertToDealModal"
    :options="{
      title: __('Convert to Deal'),
      size: 'xl',
      actions: [
        {
          label: __('Convert'),
          variant: 'solid',
          onClick: convertToDeal,
        },
      ],
    }"
  >
    <template #body-content>
      <div class="mb-3 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <OrganizationsIcon class="h-4 w-4" />
          <label class="block text-base">{{ __('Select organization from the list') }}</label>
        </div>
        <Switch v-model="existingOrganizationChecked" />
      </div>
      <div class="ml-6">
        <Link
          v-if="existingOrganizationChecked"
          class="form-control mt-2.5"
          variant="outline"
          size="md"
          :value="existingOrganization"
          doctype="CRM Organization"
          @change="(data) => (existingOrganization = data)"
          :emptyText="'No organization'"
        />
        <div v-else class="mt-2.5 text-base text-gray-600">
          {{
            __(
              'New organization will be created based on the data in details section'
            )
          }}
        </div>
      </div>

      <div class="mb-3 mt-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <ContactsIcon class="h-4 w-4" />
          <label class="block text-base">{{ __('Select contact from the list') }}</label>
        </div>
        <Switch v-model="existingContactChecked" />
      </div>
      <div class="ml-6">
        <Link
          v-if="existingContactChecked"
          class="form-control mt-2.5"
          variant="outline"
          size="md"
          :value="existingContact"
          doctype="FCRM Contact"
          @change="(data) => (existingContact = data)"
          :emptyText="'No contact'"
        />
        <div v-else class="mt-2.5 text-base text-gray-600">
          {{ __("New contact will be created based on the person's details") }}
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script setup>
import Resizer from '@/components/Resizer.vue'
import ActivityIcon from '@/components/Icons/ActivityIcon.vue'
import EmailIcon from '@/components/Icons/EmailIcon.vue'
import PhoneIcon from '@/components/Icons/PhoneIcon.vue'
import TaskIcon from '@/components/Icons/TaskIcon.vue'
import NoteIcon from '@/components/Icons/NoteIcon.vue'
import WhatsAppIcon from '@/components/Icons/WhatsAppIcon.vue'
import CommentIcon from '@/components/Icons/CommentIcon.vue'
import IndicatorIcon from '@/components/Icons/IndicatorIcon.vue'
import CameraIcon from '@/components/Icons/CameraIcon.vue'
import LinkIcon from '@/components/Icons/LinkIcon.vue'
import OrganizationsIcon from '@/components/Icons/OrganizationsIcon.vue'
import ContactsIcon from '@/components/Icons/ContactsIcon.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import Activities from '@/components/Activities.vue'
import AssignmentModal from '@/components/Modals/AssignmentModal.vue'
import MultipleAvatar from '@/components/MultipleAvatar.vue'
import Link from '@/components/Controls/Link.vue'
import Section from '@/components/Section.vue'
import SectionFields from '@/components/SectionFields.vue'
import SLASection from '@/components/SLASection.vue'
import CustomActions from '@/components/CustomActions.vue'
import {
  openWebsite,
  createToast,
  setupAssignees,
  setupCustomActions,
  errorMessage,
  copyToClipboard,
} from '@/utils'
import { globalStore } from '@/stores/global'
import { contactsStore } from '@/stores/contacts'
import { organizationsStore } from '@/stores/organizations'
import { statusesStore } from '@/stores/statuses'
import { whatsappEnabled, callEnabled } from '@/stores/settings'
import {
  createResource,
  FileUploader,
  Dropdown,
  Tooltip,
  Avatar,
  Tabs,
  Switch,
  Breadcrumbs,
  call,
} from 'frappe-ui'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { $dialog, makeCall } = globalStore()
const { getContactByName, contacts } = contactsStore()
const { organizations } = organizationsStore()
const { statusOptions, getLeadStatus } = statusesStore()
const router = useRouter()

const props = defineProps({
  leadId: {
    type: String,
    required: true,
  },
})

const lead = createResource({
  url: 'crm.fcrm.doctype.crm_lead.api.get_lead',
  params: { name: props.leadId },
  cache: ['lead', props.leadId],
  transform(data){
    for(let i = 0; i < data.doctype_fields.length; i++){
      for(let j = 0; j < data.doctype_fields[i].fields.length; j++){
        if(data.doctype_fields[i].fields[j].name == "lead_owner"){
          data.doctype_fields[i].fields[j]["hidden_delete"] = true
        }
      }
    }
    return data
  },
  onSuccess: (data) => {
    setupAssignees(data)
    setupCustomActions(data, {
      doc: data,
      $dialog,
      router,
      updateField,
      createToast,
      deleteDoc: deleteLead,
      call,
    })
  },
})

onMounted(() => {
  if (lead.data) return
  lead.fetch()
  if(window.location.hash != null && window.location.hash != ""){
    tabIndex.value = 4;
  }
})

const reload = ref(false)
const showAssignmentModal = ref(false)

function onUpdateLead(){
  lead.fetch()
}

function updateLead(fieldname, value, callback) {
  value = Array.isArray(fieldname) ? '' : value

  if (!Array.isArray(fieldname) && validateRequired(fieldname, value)) return
  let error_sum = 1;
  createResource({
    url: 'frappe.client.set_value',
    params: {
      doctype: 'CRM Lead',
      name: props.leadId,
      fieldname,
      value,
    },
    auto: true,
    onSuccess: () => {
      lead.reload()
      reload.value = true
      createToast({
        title: __('Lead updated'),
        icon: 'check',
        iconClasses: 'text-green-600',
      })
      callback?.()
    },
    onError: (err) => {
      if(error_sum > 0){
        createToast({
          title: __('Error updating lead'),
          text: __(err.messages?.[0]),
          icon: 'x',
          iconClasses: 'text-red-600',
        })
        error_sum -= 1;
      }
    },
  })
}

function validateRequired(fieldname, value) {
  let meta = lead.data.all_fields || {}
  if (meta[fieldname]?.reqd && !value) {
    createToast({
      title: __('Error Updating Lead'),
      text: __('{0} is a required field', [meta[fieldname].label]),
      icon: 'x',
      iconClasses: 'text-red-600',
    })
    return true
  }
  return false
}

const breadcrumbs = computed(() => {
  let items = [{ label: __('Leads'), route: { name: 'Leads' } }]
  items.push({
    label: lead.data.first_name || __('Untitled'),
    route: { name: 'Lead', params: { leadId: lead.data.name } },
  })
  return items
})

const tabIndex = ref(0)

const tabs = computed(() => {
  let tabOptions = [
    {
      name: 'Activity',
      label: __('Activity'),
      icon: ActivityIcon,
    },
    {
      name: 'Emails',
      label: __('Emails'),
      icon: EmailIcon,
    },
    {
      name: 'Calls',
      label: __('Calls'),
      icon: PhoneIcon,
      condition: () => callEnabled.value,
    },
    {
      name: 'Tasks',
      label: __('Tasks'),
      icon: TaskIcon,
    },
    {
      name: 'Notes',
      label: __('Notes'),
      icon: NoteIcon,
    },
    {
      name: 'Comment',
      label: __('Comment'),
      icon: CommentIcon,
    },
    {
      name: 'WhatsApp',
      label: __('WhatsApp'),
      icon: WhatsAppIcon,
      condition: () => whatsappEnabled.value,
    },
  ]
  return tabOptions.filter((tab) => (tab.condition ? tab.condition() : true))
})

function validateFile(file) {
  let extn = file.name.split('.').pop().toLowerCase()
  if (!['png', 'jpg', 'jpeg'].includes(extn)) {
    return __('Only PNG and JPG images are allowed')
  }
}

const detailSections = computed(() => {
  let data = lead.data
  if (!data) return []
  let doctype_fields = data.doctype_fields
  for(let i = 0; i < doctype_fields.length; i++){
    for(let j = 0; j < doctype_fields[i].fields.length; j++){
      if(doctype_fields[i].fields[j].name == "territory"){
        doctype_fields[i].fields[j]["emptydata"] = "No territory have been created yet"
      }else if(doctype_fields[i].fields[j].name == "industry"){
        doctype_fields[i].fields[j]["emptydata"] = "No industry have been created yet"
      }
    }
  }
  return doctype_fields
})

function updateField(name, value, callback) {
  updateLead(name, value, () => {
    lead.data[name] = value
    callback?.()
  })
  if(name == "status" && value == "Chất lượng"){
    showConvertToDealModal.value = true;
  }
}

async function deleteLead(name) {
  await call('frappe.client.delete', {
    doctype: 'CRM Lead',
    name,
  })
  router.push({ name: 'Leads' })
}

// Convert to Deal
const showConvertToDealModal = ref(false)
const existingContactChecked = ref(false)
const existingOrganizationChecked = ref(false)

const existingContact = ref('')
const existingOrganization = ref('')

async function convertToDeal(updated) {
  let valueUpdated = false

  if (existingContactChecked.value && !existingContact.value) {
    createToast({
      title: __('Error'),
      text: __('Please select an existing contact'),
      icon: 'x',
      iconClasses: 'text-red-600',
    })
    return
  }

  if (existingOrganizationChecked.value && !existingOrganization.value) {
    createToast({
      title: __('Error'),
      text: __('Please select an existing organization'),
      icon: 'x',
      iconClasses: 'text-red-600',
    })
    return
  }

  if (existingContactChecked.value && existingContact.value) {
    lead.data.salutation = getContactByName(existingContact.value).salutation
    lead.data.first_name = getContactByName(existingContact.value).first_name
    lead.data.last_name = getContactByName(existingContact.value).last_name
    lead.data.email_id = getContactByName(existingContact.value).email_id
    lead.data.mobile_no = getContactByName(existingContact.value).mobile_no
    existingContactChecked.value = false
    valueUpdated = true
  }

  if (existingOrganizationChecked.value && existingOrganization.value) {
    lead.data.organization = existingOrganization.value
    existingOrganizationChecked.value = false
    valueUpdated = true
  }

  if (valueUpdated) {
    updateLead(
      {
        salutation: lead.data.salutation,
        first_name: lead.data.first_name,
        last_name: lead.data.last_name,
        email_id: lead.data.email_id,
        mobile_no: lead.data.mobile_no,
        organization: lead.data.organization,
      },
      '',
      () => convertToDeal(true)
    )
    showConvertToDealModal.value = false
  } else {
    let deal = await call(
      'crm.api.doc.convert_to_deal',
      {
        lead: lead.data.name,
      }
    )
    if (deal) {
      if (updated) {
        await organizations.reload()
        await contacts.reload()
      }
      router.push({ name: 'Deal', params: { dealId: deal } })
    }
  }
}

const activities = ref(null)

function openEmailBox() {
  activities.value.emailBox.show = true
}
</script>
