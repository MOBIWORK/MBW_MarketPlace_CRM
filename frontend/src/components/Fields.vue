<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="section in sections"
      :key="section.section"
      class="first:border-t-0 first:pt-0"
      :class="section.hideBorder ? '' : 'border-t pt-4'"
    >
      <div
        class="grid gap-4"
        :class="
          section.columns ? 'grid-cols-' + section.columns : 'grid-cols-3'
        "
      >
        <div v-for="field in section.fields" :key="field.name">
          
            <div class="mb-2 text-sm text-gray-600" style="display: flex; justify-content: space-between;">
            {{ __(field.label) }}
            <span class="text-red-500" v-if="field.mandatory">*</span>
            
            <FeatherIcon v-if="error[field.name]" name="alert-triangle" class="h-4 w-4 text-red-500" />
          </div>
          
         
          
          <FormControl
            v-if="field.type === 'select'"
            type="select"
            class="form-control"
            :class="field.prefix ? 'prefix' : ''"
            :options="field.options"
            v-model="data[field.name]"
            :placeholder="__(field.placeholder)"
          >
            <template v-if="field.prefix" #prefix>
              <IndicatorIcon :class="field.prefix" />
            </template>
          </FormControl>
          <Link
            v-else-if="field.type === 'link'"
            class="form-control"
            :value="data[field.name]"
            :doctype="field.doctype"
            @change="(v) => (data[field.name] = v)"
            :placeholder="__(field.placeholder)"
            :onCreate="field.create"
          />
          <Link
            v-else-if="field.type === 'user'"
            class="form-control"
            :value="getUser(data[field.name]).full_name"
            :doctype="field.doctype"
            @change="(v) => (data[field.name] = v)"
            :placeholder="__(field.placeholder)"
            :hideMe="true"
          >
            <template #prefix>
              <UserAvatar class="mr-2" :user="data[field.name]" size="sm" />
            </template>
            <template #item-prefix="{ option }">
              <UserAvatar class="mr-2" :user="option.value" size="sm" />
            </template>
            <template #item-label="{ option }">
              <Tooltip :text="option.value">
                <div class="cursor-pointer">
                  {{ getUser(option.value).full_name }}
                </div>
              </Tooltip>
            </template>
          </Link>
          <div v-else-if="field.type === 'dropdown'">
            <NestedPopover>
              <template #target="{ open }">
                <Button
                  :label="data[field.name]"
                  class="dropdown-button flex w-full items-center justify-between rounded border border-gray-100 bg-gray-100 px-2 py-1.5 text-base text-gray-800 placeholder-gray-500 transition-colors hover:border-gray-200 hover:bg-gray-200 focus:border-gray-500 focus:bg-white focus:shadow-sm focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400"
                >
                  <div class="truncate">{{ data[field.name] }}</div>
                  <template #suffix>
                    <FeatherIcon
                      :name="open ? 'chevron-up' : 'chevron-down'"
                      class="h-4 text-gray-600"
                    />
                  </template>
                </Button>
              </template>
              <template #body>
                <div
                  class="my-2 space-y-1.5 divide-y rounded-lg border border-gray-100 bg-white p-1.5 shadow-xl"
                >
                  <div>
                    <DropdownItem
                      v-if="field.options?.length"
                      v-for="option in field.options"
                      :key="option.name"
                      :option="option"
                    />
                    <div v-else>
                      <div class="p-1.5 px-7 text-base text-gray-500">
                        {{ __('No {0} Available', [field.label]) }}
                      </div>
                    </div>
                  </div>
                  <div class="pt-1.5">
                    <Button
                      variant="ghost"
                      class="w-full !justify-start"
                      :label="__('Create New')"
                      @click="field.create()"
                    >
                      <template #prefix>
                        <FeatherIcon name="plus" class="h-4" />
                      </template>
                    </Button>
                  </div>
                </div>
              </template>
            </NestedPopover>
          </div>
          <div v-else-if="field.type === 'dropdownNote'">
            <NestedPopover class="relative w-[100px]">
              <template #target="{ open }">
                <Button
                  :label="__('Note')"
                  class="dropdown-button flex w-full items-center justify-between rounded border border-gray-100 bg-gray-100 px-2 py-1.5 text-base text-gray-800 placeholder-gray-500 transition-colors hover:border-gray-200 hover:bg-gray-200 focus:border-gray-500 focus:bg-white focus:shadow-sm focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400"
                >
                  <!-- <div style="width: 185px;" class="truncate">
  <span >{{ data[field.name] }}</span>
</div> -->
                  <template #suffix>
                    <FeatherIcon
                      :name="open ? 'chevron-up' : 'chevron-down'"
                      class="h-4 text-gray-600"
                    />
                  </template>
                </Button>
              </template>
              <template #body>
                <div
                  class="my-2 space-y-1.5 divide-y rounded-lg border border-gray-100 bg-white p-1.5 shadow-xl"
                  style="position: absolute; left: 105px; top: -36px"
                >
                  <div class="min-w-[180px]">
                    <TextEditor
                      variant="outline"
                      ref="content"
                      editor-class="!prose-sm overflow-auto min-h-[180px]  max-h-80 py-1.5 px-2 rounded border border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm focus:bg-white focus:border-gray-500 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400 text-gray-800 transition-colors"
                      :bubbleMenu="true"
                      :value="data[field.name]"
                      :placeholder="__('Write Content...')"
                      @change="(v) => (data[field.name] = v)"
                    />
                    <!-- Đây là text area -->
                    <!-- <textarea v-model="data[field.name]" @input="updateLabel($event.target.value,field.name)" class="w-full h-22 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 "></textarea> -->
                  </div>
                </div>
              </template>
            </NestedPopover>
          </div>
          <FormControl
            v-else
            type="text"
            :placeholder="__(field.placeholder)"
            v-model="data[field.name]"
            @focus="handleFocus(data[field.name], field.name)"
            @blur="handleBlur(data[field.name], field.name)"
          />
          <!-- <span v-if="error[field.name]" class="error-message">{{ error[field.name] }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TextEditor } from 'frappe-ui'
import NestedPopover from '@/components/NestedPopover.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import IndicatorIcon from '@/components/Icons/IndicatorIcon.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import Link from '@/components/Controls/Link.vue'
import { usersStore } from '@/stores/users'
import { Tooltip ,FeatherIcon} from 'frappe-ui'
import { reactive } from 'vue';
const { getUser } = usersStore();

const props = defineProps({
  sections: Array,
  data: Object,
});

const error = reactive({}); // object to store validation errors

const handleFocus = (value, fieldName) => {
  // Clear error message when the field is focused
  
};

const handleBlur = (value, fieldName) => {
  // Perform validation based on your requirements
  // For example, check if the value is empty
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/;
  
  if(value !=''){
    if(fieldName == 'email' || fieldName == 'email_id'){
    if (!value.match(emailRegex)) {
      error[fieldName] = 'Invalid email format';
    }else{
      error[fieldName] = '';
    }
    }else if(fieldName == 'mobile_no'||fieldName == 'actual_mobile_no'){
      const cleanedValue = value.replace(/\s+/g, '').replace(/^(\+?84|0)/, '0');
      props.data[fieldName] = cleanedValue
      if (isNaN(cleanedValue) || cleanedValue.length !== 10) {
    error[fieldName] = __('Mobile No should be a number');
  } else {
    error[fieldName] = ''; // Số điện thoại hợp lệ
  }
     
    }
  }else{
    error[fieldName] = '';
  }
  
  
};
</script>

<style scoped>
:deep(.form-control.prefix select) {
  padding-left: 2rem;
}
.error-message {
  color: red;
  font-size: 0.8rem;
}
</style>
