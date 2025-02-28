<template>
  <Menu as="div" class="relative inline-block text-left" v-slot="{ open }">
    <Popover
      :transition="dropdownTransition"
      :show="open"
      :placement="popoverPlacement"
    >
      <template #target>
        <MenuButton as="div" style="width:100%">
          <slot v-if="$slots.default" v-bind="{ open }" />
          <Button v-else :active="open" v-bind="button">
            {{ button ? button?.label || null : 'Options' }}
          </Button>
        </MenuButton>
      </template>

      <template #body>
        <div
          class="rounded-lg bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <MenuItems
            class="mt-2 min-w-40 divide-y divide-gray-100"
            :class="{
              'left-0 origin-top-left': placement == 'left',
              'right-0 origin-top-right': placement == 'right',
              'inset-x-0 origin-top': placement == 'center',
            }"
          >
            <div v-for="group in groups" :key="group.key" class="p-1.5">
              <div
                v-if="group.group && !group.hideLabel"
                class="flex h-7 items-center px-2 text-sm font-medium text-gray-500"
              >
                {{ group.group }}
              </div>
              <MenuItem
                v-for="item in group.items"
                :key="item.label"
                v-slot="{ active }"
              >
                <component
                  v-if="item.component"
                  :is="item.component"
                  :active="active"
                />
                <button
                  v-else
                  :class="[
                    active ? 'bg-gray-100' : 'text-gray-800',
                    'group flex h-7 w-full items-center rounded px-2 text-base',
                  ]"
                  @click="item.onClick"
                >
                  <FeatherIcon
                    v-if="item.icon && typeof item.icon === 'string'"
                    :name="item.icon"
                    class="mr-2 h-4 w-4 flex-shrink-0 text-gray-700"
                    aria-hidden="true"
                  />
                  <component
                    class="mr-2 h-4 w-4 flex-shrink-0 text-gray-700"
                    v-else-if="item.icon"
                    :is="item.icon"
                  />
                  <span class="whitespace-nowrap">
                    {{ item.label }}
                  </span>
                </button>
              </MenuItem>
            </div>
          </MenuItems>
          <div v-if="slots.footer" class="border-t p-1.5">
            <slot name="footer"></slot>
          </div>
        </div>
      </template>
    </Popover>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Popover, Button, FeatherIcon } from 'frappe-ui'
import { computed, useSlots } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  button: {
    type: Object,
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  placement: {
    type: String,
    default: 'left',
  },
})

const router = useRouter()
const slots = useSlots()
const dropdownTransition = {
  enterActiveClass: 'transition duration-100 ease-out',
  enterFromClass: 'transform scale-95 opacity-0',
  enterToClass: 'transform scale-100 opacity-100',
  leaveActiveClass: 'transition duration-75 ease-in',
  leaveFromClass: 'transform scale-100 opacity-100',
  leaveToClass: 'transform scale-95 opacity-0',
}

const groups = computed(() => {
  let groups = props.options[0]?.group
    ? props.options
    : [{ group: '', items: props.options }]

  return groups.map((group, i) => {
    return {
      key: i,
      group: group.group,
      hideLabel: group.hideLabel || false,
      items: filterOptions(group.items),
    }
  })
})

const popoverPlacement = computed(() => {
  if (props.placement === 'left') return 'bottom-start'
  if (props.placement === 'right') return 'bottom-end'
  if (props.placement === 'center') return 'bottom-center'
  return 'bottom'
})

function normalizeDropdownItem(option) {
  let onClick = option.onClick || null
  if (!onClick && option.route && router) {
    onClick = () => router.push(option.route)
  }

  return {
    label: option.label,
    icon: option.icon,
    group: option.group,
    component: option.component,
    onClick,
  }
}

function filterOptions(options) {
  return (options || [])
    .filter(Boolean)
    .filter((option) => (option.condition ? option.condition() : true))
    .map((option) => normalizeDropdownItem(option))
}
</script>
