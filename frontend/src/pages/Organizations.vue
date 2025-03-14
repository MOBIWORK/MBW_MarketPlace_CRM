<template>
  <LayoutHeader>
    <template #left-header>
      <Breadcrumbs :items="breadcrumbs" />
    </template>
    <template #right-header>
      <CustomActions
        v-if="organizationsListView?.customListActions"
        :actions="organizationsListView.customListActions"
      />
      <Button
        variant="solid"
        :label="__('Create')"
        @click="showOrganizationModal = true"
      >
        <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
      </Button>
    </template>
  </LayoutHeader>
  <ViewControls
    ref="viewControls"
    v-model="organizations"
    v-model:loadMore="loadMore"
    v-model:resizeColumn="triggerResize"
    v-model:updatedPageCount="updatedPageCount"
    doctype="CRM Organization"
    :showElement=true
    :placeholderText="__('Search organization')"
    :docSelect="organizationSelect"
  />
  <OrganizationsListView
    ref="organizationsListView"
    v-if="organizations.data && rows.length"
    v-model="organizations.data.page_length_count"
    v-model:list="organizations"
    :rows="rows"
    :columns="organizations.data.columns"
    :options="{
      showTooltip: false,
      resizeColumn: true,
      rowCount: organizations.data.row_count,
      totalCount: organizations.data.total_count,
    }"
    @loadMore="() => loadMore++"
    @columnWidthUpdated="() => triggerResize++"
    @updatePageCount="(count) => (updatedPageCount = count)"
    @applyFilter="(data) => viewControls.applyFilter(data)"
    @update:selections="(selections) => onUpdateSelection(selections)"
  />
  <div
    v-else-if="organizations.data"
    class="flex h-full items-center justify-center"
  >
    <div
      class="flex flex-col items-center gap-3 text-xl font-medium text-gray-500"
    >
      <OrganizationsIcon class="h-10 w-10" />
      <span>{{ __('No {0} Found', [__('organizations')]) }}</span>
      <Button :label="__('Create')" @click="showOrganizationModal = true">
        <template #prefix><FeatherIcon name="plus" class="h-4" /></template>
      </Button>
    </div>
  </div>
  <OrganizationModal v-model="showOrganizationModal" />
</template>
<script setup>
import CustomActions from '@/components/CustomActions.vue'
import OrganizationsIcon from '@/components/Icons/OrganizationsIcon.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import OrganizationModal from '@/components/Modals/OrganizationModal.vue'
import OrganizationsListView from '@/components/ListViews/OrganizationsListView.vue'
import ViewControls from '@/components/ViewControls.vue'
import { Breadcrumbs } from 'frappe-ui'
import {
  dateFormat,
  dateTooltipFormat,
  timeAgo,
  formatNumberIntoCurrency,
} from '@/utils'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const organizationsListView = ref(null)
const showOrganizationModal = ref(false)
const organizationSelect = ref([])

const currentOrganization = computed(() => {
  return organizations.value?.data?.data?.find(
    (organization) => organization.name === route.params.organizationId
  )
})

const breadcrumbs = computed(() => {
  let items = [{ label: __('Organizations'), route: { name: 'Organizations' } }]
  if (!currentOrganization.value) return items
  items.push({
    label: __(currentOrganization.value.name),
    route: {
      name: 'Organization',
      params: { organizationId: currentOrganization.value.name },
    },
  })
  return items
})

// organizations data is loaded in the ViewControls component
const organizations = ref({})
const loadMore = ref(1)
const triggerResize = ref(1)
const updatedPageCount = ref(20)
const viewControls = ref(null)

const rows = computed(() => {
  if (!organizations.value?.data?.data) return []
  return organizations.value?.data.data.map((organization) => {
    let _rows = {}
    organizations.value?.data.rows.forEach((row) => {
      _rows[row] = organization[row]

      if (row === 'organization_name') {
        _rows[row] = {
          label: organization.organization_name,
          logo: organization.organization_logo,
        }
      } else if (row === 'website') {
        _rows[row] = website(organization.website)
      } else if (row === 'annual_revenue') {
        _rows[row] = formatNumberIntoCurrency(organization.annual_revenue)
      } else if (['modified', 'creation'].includes(row)) {
        _rows[row] = {
          label: dateFormat(organization[row], dateTooltipFormat),
          timeAgo: __(timeAgo(organization[row])),
        }
      }
    })
    return _rows
  })
})

function website(url) {
  return url && url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
}
function onUpdateSelection(selections){
  organizationSelect.value = selections
}
</script>
