<template>
  <LayoutHeader>
    <template #left-header>
      <Breadcrumbs :items="breadcrumbs" />
    </template>
    <template #right-header>
      <CustomActions
        v-if="leadsListView?.customListActions"
        :actions="leadsListView.customListActions"
      />
      <Button
        variant="solid"
        :label="__('Create')"
        @click="showLeadModal = true"
      >
        <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
      </Button>
    </template>
  </LayoutHeader>
  <ViewControls
    ref="viewControls"
    v-model="leads"
    v-model:loadMore="loadMore"
    v-model:resizeColumn="triggerResize"
    v-model:updatedPageCount="updatedPageCount"
    doctype="CRM Lead"
    :filters="{ converted: 0 }"
    :showElement=true
    :showFuncImport=true
    :showFuncConvertTaskCustomer="showConvertTaskCustomer"
    :placeholderText="__('Search')"  
    @showImportModal="show"
    @afterConvertTaskCustomer="onAfterConvertTaskCustomer()"
    :docSelect="leadSelect"
  />
  <LeadsListView
    ref="leadsListView"
    v-if="leads.data && rows.length"
    v-model="leads.data.page_length_count"
    v-model:list="leads"
    :rows="rows"
    :columns="leads.data.columns"
    :options="{
      showTooltip: false,
      resizeColumn: true,
      rowCount: leads.data.row_count,
      totalCount: leads.data.total_count,
    }"
    @loadMore="() => loadMore++"
    @columnWidthUpdated="() => triggerResize++"
    @updatePageCount="(count) => (updatedPageCount = count)"
    @applyFilter="(data) => viewControls.applyFilter(data)"
    @rating="(data) => rating(data)"
    @update:selections="(selections) => onUpdateSelection(selections)"
  />
  <div v-else-if="leads.data" class="flex h-full items-center justify-center">
    <div
      class="flex flex-col items-center gap-3 text-xl font-medium text-gray-500"
    >
      <LeadsIcon class="h-10 w-10" />
      <span>{{ __('No {0} Found', [__('lead')]) }}</span>
      <Button :label="__('Create')" @click="showLeadModal = true">
        <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
      </Button>
    </div>
  </div>
  <LeadModal v-model="showLeadModal" />
  <ImportLeadModal v-model="showImportModal" @afterImportData="onAfterImportData()"/>
</template>

<script setup>
import CustomActions from '@/components/CustomActions.vue'
import LeadsIcon from '@/components/Icons/LeadsIcon.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import LeadsListView from '@/components/ListViews/LeadsListView.vue'
import LeadModal from '@/components/Modals/LeadModal.vue'
import ImportLeadModal from '@/components/Modals/ImportLeadModal.vue'
import ViewControls from '@/components/ViewControls.vue'
import { usersStore } from '@/stores/users'
import { organizationsStore } from '@/stores/organizations'
import { statusesStore } from '@/stores/statuses'
import {
  dateFormat,
  dateTooltipFormat,
  timeAgo,
  formatTime,
  createToast,
} from '@/utils'
import { createResource, Breadcrumbs } from 'frappe-ui'
import { ref, computed, onMounted } from 'vue'
import { sessionStore } from '@/stores/session'

const breadcrumbs = [{ label: __('Leads'), route: { name: 'Leads' } }]

const { getUser } = usersStore()
const { getOrganization } = organizationsStore()
const { getLeadStatus } = statusesStore()
const { roles } = sessionStore()

const showConvertTaskCustomer = ref(false)

onMounted(()=>{
  let arrRole = roles.data;
  for(let i = 0; i < arrRole.length; i++){
    if(arrRole[i] == "System Manager"){
      showConvertTaskCustomer.value = true;
      break;
    }
  }
})

const leadsListView = ref(null)
const showLeadModal = ref(false)
const showImportModal = ref(false)
// leads data is loaded in the ViewControls component
const leads = ref({})
const loadMore = ref(1)
const triggerResize = ref(1)
const updatedPageCount = ref(20)
const viewControls = ref(null)
const leadSelect = ref([])

// Rows
const rows = computed(() => {
  if (!leads.value?.data?.data) return []
  return leads.value?.data.data.map((lead) => {
    let _rows = {}
    leads.value?.data.rows.forEach((row) => {
      _rows[row] = lead[row]

      if (row == 'lead_name') {
        _rows[row] = {
          label: lead.first_name,
          image: lead.image,
          image_label: lead.first_name,
        }
      } else if (row == 'organization') {
        _rows[row] = {
          label: lead.organization,
          logo: getOrganization(lead.organization)?.organization_logo,
        }
      } else if (row == 'status') {
        _rows[row] = {
          label: lead.status,
          color: getLeadStatus(lead.status)?.iconColorClass,
        }
      } else if (row == 'sla_status') {
        let value = lead.sla_status
        let tooltipText = value
        let color =
          lead.sla_status == 'Failed'
            ? 'red'
            : lead.sla_status == 'Fulfilled'
            ? 'green'
            : 'orange'
        if (value == 'First Response Due') {
          value = timeAgo(lead.response_by)
          tooltipText = dateFormat(lead.response_by, dateTooltipFormat)
          if (new Date(lead.response_by) < new Date()) {
            color = 'red'
          }
        }
        _rows[row] = {
          label: tooltipText,
          value: value,
          color: color,
        }
      } else if (row == 'lead_owner') {
        _rows[row] = {
          label: lead.lead_owner && getUser(lead.lead_owner).full_name,
          ...(lead.lead_owner && getUser(lead.lead_owner)),
        }
      } else if (row == '_assign') {
        let assignees = JSON.parse(lead._assign) || []
        if (!assignees.length && lead.lead_owner) {
          assignees = [lead.lead_owner]
        }
        _rows[row] = assignees.map((user) => ({
          name: user,
          image: getUser(user).user_image,
          label: getUser(user).full_name,
        }))
      } else if (['modified', 'creation'].includes(row)) {
        _rows[row] = {
          label: dateFormat(lead[row], dateTooltipFormat),
          timeAgo: timeAgo(lead[row]),
        }
      } else if (
        ['first_response_time', 'first_responded_on', 'response_by'].includes(
          row
        )
      ) {
        let field = row == 'response_by' ? 'response_by' : 'first_responded_on'
        _rows[row] = {
          label: lead[field] ? dateFormat(lead[field], dateTooltipFormat) : '',
          timeAgo: lead[row]
            ? row == 'first_response_time'
              ? formatTime(lead[row])
              : timeAgo(lead[row])
            : '',
        }
      }
    })
    return _rows
  })
})
const rating = (data) => {
  let error_sum = 1;
  createResource({
    url: 'frappe.client.set_value',
    params: {
      doctype: 'CRM Lead',
      name: data.row?.name,
      fieldname:data.fieldname,
      value:data.newvalue
    },
    auto: true,
    onSuccess: () => {
      leads.value.reload()
      createToast({
        title: __('Lead updated'),
        icon: 'check',
        iconClasses: 'text-green-600',
      })
      
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
function show(){
  showImportModal.value = true;    
}
function onAfterConvertTaskCustomer(){
  leads.value.reload();
}
function onAfterImportData(){
  leads.value.reload();
}
function onUpdateSelection(selections){
  leadSelect.value = selections
}
</script>
