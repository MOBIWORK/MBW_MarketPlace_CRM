<template>
    <Dialog v-model="show" :options="{
        size: '2xl',
        title: __('Import')
    }">
        <template #body-content>
            <div class="container-import">
                <div>
                    <div class="text-center my-3 text-icon">
                        <span>{{__("Select data source Leads by format")}} excel, csv. </span>
                        <span> {{__("Download sample")}} <a href="javascript:;" @click="onDownloadTemplateExcel()"
                                class="text-temp">{{__("here")}}</a></span>
                    </div>
                    <div class="flex action-import">
                        <div class="m-item-5 flex-container cursor-pointer" @click="onActiveDevice()">
                            <div class="flex-item icon-import">
                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7v2h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2H4a2 2 0 0 1-2-2V5zm18 11V5H4v11h16z"
                                        fill="#0D0D0D" />
                                </svg>
                            </div>
                            <div class="text-icon">{{ __('Device') }}</div>
                        </div>
                        <div class="flex-container cursor-pointer" @click="onActiveDrive()">
                            <div class="flex-item icon-import">
                                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10,17.55,8.23,19.27a2.47,2.47,0,0,1-3.5-3.5l4.54-4.55a2.46,2.46,0,0,1,3.39-.09l.12.1a1,1,0,0,0,1.4-1.43A2.75,2.75,0,0,0,14,9.59a4.46,4.46,0,0,0-6.09.22L3.31,14.36a4.48,4.48,0,0,0,6.33,6.33L11.37,19A1,1,0,0,0,10,17.55ZM20.69,3.31a4.49,4.49,0,0,0-6.33,0L12.63,5A1,1,0,0,0,14,6.45l1.73-1.72a2.47,2.47,0,0,1,3.5,3.5l-4.54,4.55a2.46,2.46,0,0,1-3.39.09l-.12-.1a1,1,0,0,0-1.4,1.43,2.75,2.75,0,0,0,.23.21,4.47,4.47,0,0,0,6.09-.22l4.55-4.55A4.49,4.49,0,0,0,20.69,3.31Z" />
                                </svg>
                            </div>
                            <div class="text-icon">{{ __('Drive') }}</div>
                        </div>
                    </div>
                </div>
                <input type="file" id="fileInput" style="display: none;" @change="onFileSelected">
            </div>
        </template>
        <template #actions>
            <div class="flex flex-row-reverse gap-2">
                <Button variant="solid" :label="__('Close')" @click="onClose()" />
            </div>
        </template>
    </Dialog>

    <Dialog v-model="showLinkModal">
        <template #body-title>
            <h3>Gán đường dẫn tệp ở đây</h3>
        </template>
        <template #body-content>
            <FormControl
                :type="'text'"
                size="sm"
                variant="subtle"
                placeholder="https://docs.google.com/spreadsheets/d/1YlO0Goasa7ZsG21ZJrNkdSz3yB85EF3H/edit#gid=764214855"
                :disabled="false"
                label="Link file"
                v-model="txtLinkFile"
            />
        </template>
        <template #actions>
            <div class="flex flex-row-reverse gap-2">
                <Button variant="solid" :label="__('Next')" @click="onNextModalPreviewFromDriver()" :loading="loadingReadLinkSheet"/>
                <Button variant="solid" :label="__('Back')" @click="onBackModalChooseActionFromDriver()" />
            </div>
        </template>
    </Dialog>

    <Dialog v-model="showPreviewData" :options="{
        size: '2xl',
        title: __('Preview')
    }">
        <template #body-content>
            <ListView
                class="h-[250px]"
                :columns="columnsDataPreview"
                :rows="rowsDataPreview"
                :options="{
                    selectable: false,
                    showTooltip: true,
                    resizeColumn: false
                }"
                row-key="name"
            >
                <ListHeader />
                <ListRows id="list-rows">
                    <ListRow
                        v-for="row in rowsDataPreview"
                        :key="row.name"
                        v-slot="{ idx, column, item }"
                        :row="row"
                    >
                        <div v-if="column.col_numeric">
                            <div v-if="row[column.key_invalid]" class="flex items-center">
                                <span class="truncate w-full">{{row[column.key]}}</span>
                                <Tooltip
                                :text="__('Invalid phone number')"
                                :placement="'top'"
                                >
                                    <FeatherIcon name="alert-triangle" class="h-4 w-4 text-red-500 mx-1" />
                                </Tooltip>
                            </div>
                            <div v-else class="truncate w-full">
                                {{row[column.key]}}
                            </div>
                        </div>
                        <div v-else-if="column.col_email">
                            <div v-if="row[column.key_invalid]" class="flex items-center">
                                <span class="truncate w-full">{{row[column.key]}}</span>
                                <Tooltip
                                :text="__('Invalid Email')"
                                :placement="'top'"
                                >
                                    <FeatherIcon name="alert-triangle" class="h-4 w-4 text-red-500 mx-1" />
                                </Tooltip>
                            </div>
                            <div v-else class="truncate w-full">
                                {{row[column.key]}}
                            </div>
                        </div>
                        <div v-else-if="column.col_obj_email">
                            <div v-if="row[column.key_invalid]" class="flex items-center">
                                <span class="truncate w-full">{{row[column.key]}}</span>
                                <Tooltip
                                :text="__('Invalid Email')"
                                :placement="'top'"
                                >
                                    <FeatherIcon name="alert-triangle" class="h-4 w-4 text-red-500 mx-1" />
                                </Tooltip>
                            </div>
                            <div v-else class="truncate w-full">
                                {{row[column.key]}}
                            </div>
                        </div>
                        <ListRowItem v-else :item="item">
                            <template #default="{ label }">
                                <div class="truncate text-base">
                                    {{ __(label) }}
                                </div>
                            </template>
                        </ListRowItem>
                    </ListRow>
                </ListRows>
            </ListView>
        </template>
        <template #actions>
            <div class="flex flex-row-reverse gap-2">
                <Button variant="solid" :label="__('Next')" @click="onNextModalMapping()" />
                <Button variant="solid" :label="__('Back')" @click="onBackModalChooseAction()" />
            </div>
        </template>
    </Dialog>

    <Dialog v-model="showMappingData" :options="{
        size: '2xl',
        title: __('Mapping Columns')
    }">
        <template #body-content>
            <div style="padding: 0px 20px;"> 
                <div style="color: #525252;">{{__('Map columns from file to fields in Lead')}}</div>
                <div class="flex" style="align-items: center;justify-items: center;">
                    <div style="width: 100%;overflow-y: auto;max-height: 580px;">
                        <div style="border-top:1px solid #ededed;padding:0 7px 7px;" v-for="(item, index) in fieldsMapping" :key="index">
                            <div class="flex" style="margin-top: 10px;margin-bottom:0.5rem;">
                                <div style="width: 50%;padding-right:15px;">
                                    <div style="margin-bottom: 6px;color:#525252;font-size: 14px;font-weight: 420;letter-spacing: 0.02em;background-color:#f8f8f8;border-radius: 8px;min-height:28px;padding:3px 8px;">
                                        {{item.label}}
                                    </div>
                                </div>
                                <div style="width: 50%;padding-left: 15px;">
                                    <Select
                                        :options="[
                                            {
                                                label: __(`Don't Import`),
                                                value: 'none',
                                            },
                                            {
                                                label: __('Full Name'),
                                                value: 'first_name',
                                            },
                                            {
                                                label: __('Email'),
                                                value: 'email',
                                            },
                                            {
                                                label: __('Mobile No'),
                                                value: 'mobile_no',
                                            },
                                            {
                                                label: __('Gender'),
                                                value: 'gender',
                                            },
                                            {
                                                label: __('Lead Owner'),
                                                value: 'lead_owner',
                                            },
                                            {
                                                label: __('Assign To'),
                                                value: 'assign_to',
                                            },
                                            {
                                                label: __('Source'),
                                                value: 'source',
                                            },{
                                                label: __('Status'),
                                                value: 'status',
                                            },{
                                                label: __('Territory'),
                                                value: 'territory',
                                            },{
                                                label: __('Industry'),
                                                value: 'industry',
                                            },{
                                                label: __('Job Title'),
                                                value: 'job_title',
                                            },{
                                                label: __('Organization'),
                                                value: 'organization',
                                            },{
                                                label: __('Website'),
                                                value: 'website',
                                            },{
                                                label: __('Annual Revenue'),
                                                value: 'annual_revenue',
                                            },{
                                                label: __('No. of Employees'),
                                                value: 'no_of_employees',
                                            }
                                        ]"
                                        v-model="item.field_dict"
                                        :placeholder="__('Select the mapping field')"
                                    />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #actions>
            <div class="flex flex-row-reverse gap-2">
                <Button variant="solid" :label="__('Import')" @click="onImportData()" :loading="loadingImport"/>
                <Button variant="solid" :label="__('Back')" @click="onBackModalPreviewData()" />
            </div>
        </template>
    </Dialog>

</template>

<script setup>
import { createResource,ListView, Select, FormControl,
  ListHeader,
  ListRows,
  ListRow,
  ListRowItem,
  FeatherIcon,
  Tooltip } from 'frappe-ui'
import { computed, ref, reactive, onMounted, nextTick } from 'vue'
import * as ExcelJS from "exceljs";
import * as FileSaver from "file-saver";
import * as XLSX from 'xlsx';
import { createToast } from '@/utils'


const show = defineModel()
const showPreviewData = ref(false)
const showMappingData = ref(false)
const showLinkModal = ref(false)
const txtLinkFile = ref('')
const loadingReadLinkSheet = ref(false);
const columnsDataPreview = ref([])
const rowsDataPreview = ref([])
const fieldsMapping = ref([])
const loadingImport = ref(false)
const emit = defineEmits(['afterImportData'])
onMounted(() => {
})

async function onDownloadTemplateExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sheet1");
    sheet.properties.defaultColWidth = 30;

    let arrHeader = [
        { 'label': "Họ tên", 'cell': "A1", 'column': "A" },
        { 'label': "Email", 'cell': "B1", 'column': "B" },
        { 'label': "Số điện thoại", 'cell': "C1", 'column': "C" },
        { 'label': "Giới tính khách hàng", 'cell': "D1", 'column': "D" },
        { 'label': "Lead Owner", 'cell': "E1", 'column': "E" }, 
        { 'label': "Phân công cho", 'cell': "F1", 'column': "F" },
        { 'label': "Nguồn", 'cell': "G1", 'column': "G" },
        { 'label': "Trạng thái", 'cell': "H1", 'column': "H" },
        { 'label': "Khu vực", 'cell': "I1", 'column': "I" },
        { 'label': "Ngành nghề", 'cell': "J1", 'column': "J" },
        { 'label': "Chức danh", 'cell': "K1", 'column': "K" },
        { 'label': "Tổ chức", 'cell': "L1", 'column': "L" },
        { 'label': "Trang web", 'cell': "M1", 'column': "M" },
        { 'label': "Doanh thu hàng năm", 'cell': "N1", 'column': "N" },
        { 'label': "Quy mô tổ chức", 'cell': "O1", 'column': "O" }
    ];

    for (let i = 0; i < arrHeader.length; i++) {
        sheet.getCell(arrHeader[i].cell).value = arrHeader[i].label;
        sheet.getCell(arrHeader[i].cell).style = {
            font: { bold: true, name: "Times New Roman", size: 13 },
        };
    }

    let arrContent = [
        { 'label': "", 'cell': "A2" },
        { 'label': "", 'cell': "B2" },
        { 'label': "", 'cell': "C2" },
        { 'label': "Nam", 'cell': "D2" },
        { 'label': "example@gmail.com", 'cell': "E2" },
        { 'label': "example1@gmail.com;example2@gmail.com", 'cell': "F2" },
        { 'label': "Facebook", 'cell': "G2" },
        { 'label': "Mới", 'cell': "H2" },
        { 'label': "Hà Nội", 'cell': "I2" },
        { 'label': "Bán lẻ", 'cell': "J2" },
        { 'label': "Business Analyst", 'cell': "K2" },
        { 'label': "Mobiwork Cloud", 'cell': "L2" },
        { 'label': "", 'cell': "M2" },
        { 'label': "1,000,000,000", 'cell': "N2" },
        { 'label': "1-10", 'cell': "O2" },
    ];

    for (let i = 0; i < arrContent.length; i++) {
        sheet.getCell(arrContent[i].cell).value = arrContent[i].label;
        sheet.getCell(arrContent[i].cell).style = {
            font: { bold: false, name: "Times New Roman", size: 13 },
        };
    }
    // Lưu file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAsExcelFile(buffer, "sample_lead", false);
}

function saveAsExcelFile(buffer, fileName, convertName = true) {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    let fileNameExport = fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION;
    if (!convertName) fileNameExport = fileName + EXCEL_EXTENSION;
    FileSaver.saveAs(data, fileNameExport);
}

function onClose() {
    show.value = false;
}

function onActiveDevice() {
    document.getElementById('fileInput').click();
}

function onActiveDrive() {
    show.value = false;
    showLinkModal.value = true;
}

async function onFileSelected(event){
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            // Đọc sheet đầu tiên
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            // Chuyển đổi nội dung sheet thành JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            if(jsonData.length > 0){
                let arrLeadImport = [];
                let arrColumnDataPreview = [];
                let arrFieldMapping = [];
                let regexSdt = /^(\+84|0)\d{9}$/;
                let regexEmail = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/;
                let arrFieldDist = [
                    {'field': "first_name", 'label': __("Name")},
                    {'field': "email", 'label': "Email"},
                    {'field': "mobile_no", 'label': __("Phone number")},
                    {'field': "gender", 'label': __("Gender customer")},
                    {'field': "lead_owner", 'label': "Lead Owner"},
                    {'field': "assign_to", 'label': __("Assign To")},
                    {'field': "source", 'label': __("Source")},
                    {'field': "status", 'label': __("Status")},
                    {'field': "territory", 'label': __("Territory")},
                    {'field': "industry", 'label': __("Industry")},
                    {'field': "job_title", 'label': __("Job Title")},
                    {'field': "organization", 'label': __("Organization")},
                    {'field': "website", 'label': __("Website")},
                    {'field': "annual_revenue", 'label': __("Annual Revenue")},
                    {'field': "no_of_employees", 'label': __("No. of Employees")}
                ]
                for(let i = 0; i < jsonData[0].length; i++){
                    let itemColumn = {
                        key: jsonData[0][i], label: jsonData[0][i], width: i == 0? '180px' : '150px'
                    }
                    let fieldMapping = {
                        'label': jsonData[0][i], 'key': jsonData[0][i], 'field_dict': ""
                    }
                    if(isEmail(jsonData[1][i])){
                        if(jsonData[1][i].includes(";")){
                            let arrEmail = jsonData[1][i].split(";");
                            for(let t = 0; t < arrEmail.length; t++){
                                if(isEmail(arrEmail[t])){
                                    itemColumn["col_obj_email"] = true;
                                    itemColumn['key_invalid'] = `key_${itemColumn.key}`;
                                }
                            }
                        }else{
                            itemColumn["col_email"] = true;
                            itemColumn['key_invalid'] = `key_${itemColumn.key}`;
                        }
                    }
                    if(isNumeric(jsonData[1][i])){
                        itemColumn["col_numeric"] = true;
                        itemColumn['key_invalid'] = `key_${itemColumn.key}`;
                    }
                    let filterField = arrFieldDist.filter(x => x.label == jsonData[0][i]);
                    if(filterField.length > 0) fieldMapping["field_dict"] = filterField[0].field;
                    arrColumnDataPreview.push(itemColumn);
                    arrFieldMapping.push(fieldMapping);
                }
                for(let i = 1; i < jsonData.length; i++){
                    let leadImport = {};
                    let isPush = false;
                    for(let j = 0; j < jsonData[0].length; j++){
                        leadImport[jsonData[0][j]] = jsonData[i][j] != null? jsonData[i][j].toString() : null;
                        if(jsonData[i][j] != null && jsonData[i][j].toString() != "") isPush = true;
                        if(jsonData[i][j] != null && jsonData[i][j].toString().includes(";")){
                            let arrEmails = jsonData[i][j].split(";");
                            console.log(arrEmails);
                            for(let t = 0; t < arrEmails.length; t++){
                                if(arrColumnDataPreview[j].col_obj_email){
                                    if(!regexEmail.test(arrEmails[t])) leadImport[`key_${jsonData[0][j]}`] = true;
                                }
                            }
                        }else if(jsonData[i][j] != null){
                            jsonData[i][j] = jsonData[i][j].toString();
                            if(!jsonData[i][j].includes("[")){
                                if(arrColumnDataPreview[j].col_email){
                                    if(!regexEmail.test(jsonData[i][j])) leadImport[`key_${jsonData[0][j]}`] = true;
                                }
                                if(arrColumnDataPreview[j].col_numeric){
                                    if(!regexSdt.test(jsonData[i][j])) leadImport[`key_${jsonData[0][j]}`] = true;
                                }
                            }
                        }
                    }
                    if(isPush) arrLeadImport.push(leadImport);
                }
                columnsDataPreview.value = arrColumnDataPreview;
                rowsDataPreview.value = arrLeadImport;
                fieldsMapping.value = arrFieldMapping;
                show.value = false;
                showPreviewData.value = true;
                showMappingData.value = false;
            }
        };
        reader.readAsArrayBuffer(file);
    }
}

function isNumeric(str){
    if(str == null) return false;
    return /^\d+$/.test(str.toString());
}

function isEmail(str){
    if(str != null && str.toString().includes("@")) return true;
    return false;
}

function onNextModalMapping(){
    show.value = false;
    showPreviewData.value = false;
    showMappingData.value = true;
}

function onBackModalChooseAction(){
    showPreviewData.value = false;
    show.value = true;
    showMappingData.value = false;
}

function onBackModalChooseActionFromDriver(){
    showLinkModal.value = false;
    show.value = true;
}

function onNextModalPreviewFromDriver(){
    loadingReadLinkSheet.value = true;
    let error_sum = 1;
    let linkFile = createResource({
        url: 'crm.api.doc.get_content_by_google_sheet',
        method: 'POST',
        params: {
            google_sheet_url: txtLinkFile.value,
        },
        onSuccess(data){
            loadingReadLinkSheet.value = false;
            if(data.length > 1){
                let arrLeadImport = [];
                let arrColumnDataPreview = [];
                let arrFieldMapping = [];
                let regexSdt = /^(\+84|0)\d{9}$/;
                let regexEmail = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/;
                let arrFieldDist = [
                    {'field': "first_name", 'label': __("Name")},
                    {'field': "email", 'label': "Email"},
                    {'field': "mobile_no", 'label': __("Phone number")},
                    {'field': "gender", 'label': __("Gender customer")},
                    {'field': "lead_owner", 'label': "Lead Owner"},
                    {'field': "assign_to", 'label': __("Assign To")},
                    {'field': "source", 'label': __("Source")},
                    {'field': "status", 'label': __("Status")},
                    {'field': "territory", 'label': __("Territory")},
                    {'field': "industry", 'label': __("Industry")},
                    {'field': "job_title", 'label': __("Job Title")},
                    {'field': "organization", 'label': __("Organization")},
                    {'field': "website", 'label': __("Website")},
                    {'field': "annual_revenue", 'label': __("Annual Revenue")},
                    {'field': "no_of_employees", 'label': __("No. of Employees")}
                ]

                for(let i = 0; i < data[0].length; i++){
                    let itemColumn = {
                        key: data[0][i], label: data[0][i], width: i == 0? '180px' : '150px'
                    }
                    let fieldMapping = {
                        'label': data[0][i], 'key': data[0][i], 'field_dict': ""
                    }
                    if(isEmail(data[1][i])){
                        if(data[1][i].includes(";")){
                            let arrEmail = data[1][i].split(";");
                            for(let t = 0; t < arrEmail.length; t++){
                                if(isEmail(arrEmail[t])){
                                    itemColumn["col_obj_email"] = true;
                                    itemColumn['key_invalid'] = `key_${itemColumn.key}`;
                                }
                            }
                        }else{
                            itemColumn["col_email"] = true;
                            itemColumn['key_invalid'] = `key_${itemColumn.key}`;
                        }
                    }
                    if(isNumeric(data[1][i])){
                        itemColumn["col_numeric"] = true;
                        itemColumn['key_invalid'] = `key_${itemColumn.key}`;
                    }
                    let filterField = arrFieldDist.filter(x => x.label == data[0][i]);
                    if(filterField.length > 0) fieldMapping["field_dict"] = filterField[0].field;
                    arrColumnDataPreview.push(itemColumn);
                    arrFieldMapping.push(fieldMapping);
                }
                for(let i = 1; i < data.length; i++){
                    let leadImport = {};
                    let isPush = false;
                    for(let j = 0; j < data[0].length; j++){
                        leadImport[data[0][j]] = data[i][j] != null? data[i][j].toString() : null;
                        if(data[i][j] != null && data[i][j].toString() != "") isPush = true;
                        if(data[i][j] != null && data[i][j].toString().includes(";")){
                            let arrEmails = data[i][j].split(";");
                            for(let t = 0; t < arrEmails.length; t++){
                                if(arrColumnDataPreview[j].col_obj_email){
                                    if(!regexEmail.test(arrEmails[t])) leadImport[`key_${data[0][j]}`] = true;
                                }
                            }
                        }else if(data[i][j] != null){
                            data[i][j] = data[i][j].toString();
                            if(!data[i][j].includes("[")){
                                if(arrColumnDataPreview[j].col_email){
                                    if(!regexEmail.test(data[i][j])) leadImport[`key_${data[0][j]}`] = true;
                                }
                                if(arrColumnDataPreview[j].col_numeric){
                                    if(!regexSdt.test(data[i][j])) leadImport[`key_${data[0][j]}`] = true;
                                }
                            }
                        }
                    }
                    if(isPush) arrLeadImport.push(leadImport);
                }
                columnsDataPreview.value = arrColumnDataPreview;
                rowsDataPreview.value = arrLeadImport;
                fieldsMapping.value = arrFieldMapping;
                showLinkModal.value = false;
                showPreviewData.value = true;
            }
        },
        onError(error){
            if(error_sum > 0){
                loadingReadLinkSheet.value = false;
                createToast({
                    title: __('Error'),
                    text: __("Trong quá trình đọc dữ liệu. Vui lòng liên hệ Admin để tiếp tục"),
                    icon: 'x',
                    iconClasses: 'text-red-600',
                })
                error_sum -= 1;
            }
        }
    })
    linkFile.fetch();
}

function onBackModalPreviewData(){
    showPreviewData.value = true;
    showMappingData.value = false;
    show.value = false;
}

function onImportData(){
    loadingImport.value = true;
    let valid_email = true;
    let error_sum = 1;
    for(let i = 0; i < rowsDataPreview.value.length; i++){
        for(let j = 0; j < columnsDataPreview.value.length; j++){
            if(columnsDataPreview.value[j].col_email || columnsDataPreview.value[j].col_obj_email){
                if(rowsDataPreview.value[i][columnsDataPreview.value[j].key_invalid]){
                    valid_email = false;
                    break;
                }
            }
        }
    }
    if(valid_email == false){
        createToast({
            title: __('Error'),
            text: __("Sai định dạng email. Vui lòng kiểm tra lại"),
            icon: 'x',
            iconClasses: 'text-red-600',
        })
        loadingImport.value = false;
        return;
    }
    let leadsImport = createResource({
        url: 'crm.api.doc.import_data_leads',
        method: 'POST',
        params: {
            source_leads: rowsDataPreview.value,
            fields_dict: fieldsMapping.value
        },
        onSuccess(data){
            loadingImport.value = true;
            if(data == "ok"){
                createToast({
                    title: __('Đã nhập tệp dữ liệu thành công'),
                    icon: 'check',
                    iconClasses: 'text-green-600',
                })
                showMappingData.value = false;
                emit('afterImportData');
            }
        },
        onError(error){
            if(error_sum > 0){
                loadingImport.value = false;
                createToast({
                    title: __('Error'),
                    text: __("Trong quá trình nhập tệp lỗi. Vui lòng liên hệ Admin để tiếp tục"),
                    icon: 'x',
                    iconClasses: 'text-red-600',
                })
                error_sum -= 1;
            }
        }
    })
    leadsImport.fetch()
}

</script>
<style scoped>
.container-import {
    min-height: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #999393;
    border-radius: 8px;
    background-color: #fff;
}

.text-temp {
    color: blue;
}

.action-import {
    align-items: center;
    justify-content: center;
}

.flex-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.flex-item {
    margin: 5px;
    /* Khoảng cách giữa SVG và text */
}

.m-item-5 {
    margin-right: 10px;
}

.icon-import {
    background: #e7e2e2;
    padding: 6px;
    border-radius: 50%;
}

.text-icon {
    color: #525252;
    font-weight: 420;
    font-size: 15px;
    margin-top: 1.5px !important;
}
</style>