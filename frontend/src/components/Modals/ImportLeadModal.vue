<template>
    <Dialog v-model="show" :options="{
        size: '2xl',
        title: __('Import')
    }">
        <template #body-content>
            <div class="container-import">
                <div>
                    <div class="text-center my-3 text-icon">
                        <span>Chọn nguồn nhập dữ liệu leads theo định dạng excel, csv.</span>
                        <span> Tải dữ liệu mẫu <a href="javascript:;" @click="onDownloadTemplateExcel()"
                                class="text-temp">tại đây</a></span>
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
                        <div v-if="column.key === colPhone">
                            <div v-if="row.valid_phone" class="truncate w-full">
                                {{row[colPhone]}}
                            </div>
                            <div v-else class="flex items-center">
                                <span class="truncate w-full">{{row[colPhone]}}</span>
                                <Tooltip
                                :text="__('Invalid phone number')"
                                :placement="'top'"
                                >
                                    <FeatherIcon name="alert-triangle" class="h-4 w-4 text-red-500 mx-1" />
                                </Tooltip>
                            </div>
                            
                        </div>
                        <div v-else-if="column.key === colEmail">
                            <div v-if="row.valid_email" class="truncate w-full">
                                {{row[colEmail]}}
                            </div>
                            <div v-else class="flex items-center">
                                <span class="truncate w-full">{{row[colEmail]}}</span>
                                <Tooltip
                                :text="__('Invalid Email')"
                                :placement="'top'"
                                >
                                    <FeatherIcon name="alert-triangle" class="h-4 w-4 text-red-500 mx-1" />
                                </Tooltip>
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
                    <div style="width: 100%;">
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
                                                label: __('First Name'),
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
const colEmail = ref("")
const colPhone = ref("")
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
        { 'label': "Tên", 'cell': "A1", 'column': "A" },
        { 'label': "Email", 'cell': "B1", 'column': "B" },
        { 'label': "Số điện thoại", 'cell': "C1", 'column': "C" },
        { 'label': "Giới tính khách hàng", 'cell': "D1", 'column': "D" },
        { 'label': "Phân công cho", 'cell': "E1", 'column': "E" },
        { 'label': "Nguồn", 'cell': "F1", 'column': "F" },
        { 'label': "Trạng thái", 'cell': "G1", 'column': "G" },
        { 'label': "Khu vực", 'cell': "H1", 'column': "H" },
        { 'label': "Ngành nghề", 'cell': "I1", 'column': "I" }
    ];

    for (let i = 0; i < arrHeader.length; i++) {
        sheet.getCell(arrHeader[i].cell).value = arrHeader[i].label;
        sheet.getCell(arrHeader[i].cell).style = {
            font: { bold: true, name: "Times New Roman", size: 13 },
        };
    }

    let arrContent = [
        { 'label': "Họ tên khách hàng. VD: Trần Thanh An", 'cell': "A2" },
        { 'label': "Email khách hàng", 'cell': "B2" },
        { 'label': "Số điện thoại hợp lệ. Bắt đầu bằng 0 và chỉ gồm 10/11 số. VD: 0984641099", 'cell': "C2" },
        { 'label': "Gồm 3 trường: Nam, Nữ, Không tiết lộ. VD: Nam", 'cell': "D2" },
        { 'label': "Tên user được phân công. VD: Dieu Dieu", 'cell': "E2" },
        { 'label': `Các nguồn contact được admin thiết lập. VD: Zalo`, 'cell': "F2" },
        { 'label': `Bao gồm các trạng thái chăm sóc của khách hàng được admin thiết lập. Giá trị thiết lập bao gồm: Mới, Đang chăm sóc, Chất lượng.VD: Mới`, 'cell': "G2" },
        { 'label': "Quận huyện, thành phố của khách hàng. VD: Hà Nội", 'cell': "H2" },
        { 'label': "Ngành nghề khách hàng. VD: Bán lẻ", 'cell': "I2" }
    ];

    for (let i = 0; i < arrContent.length; i++) {
        sheet.getCell(arrContent[i].cell).value = arrContent[i].label;
        sheet.getCell(arrContent[i].cell).style = {
            font: { bold: false, name: "Times New Roman", size: 13 },
        };
    }

    // Lưu file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAsExcelFile(buffer, "sample_customer", false);
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
                let field_phone = "";
                let field_email = "";
                let arrFieldDist = [
                    {'field': "first_name", 'label': "Tên"},
                    {'field': "email", 'label': "Email"},
                    {'field': "mobile_no", 'label': "Số điện thoại"},
                    {'field': "gender", 'label': "Giới tính khách hàng"},
                    {'field': "lead_owner", 'label': "Phân công cho"},
                    {'field': "source", 'label': "Nguồn"},
                    {'field': "status", 'label': "Trạng thái"},
                    {'field': "territory", 'label': "Khu vực"},
                    {'field': "territory", 'label': "Ngành nghề"}
                ]
                for(let i = 0; i < jsonData[0].length; i++){
                    let itemColumn = {
                        key: jsonData[0][i], label: jsonData[0][i], width: i == 0? '180px' : '150px'
                    }
                    let fieldMapping = {
                        'label': jsonData[0][i], 'key': jsonData[0][i], 'field_dict': ""
                    }
                    let filterField = arrFieldDist.filter(x => x.label == jsonData[0][i]);
                    if(filterField.length > 0) fieldMapping["field_dict"] = filterField[0].field;
                    arrColumnDataPreview.push(itemColumn);
                    arrFieldMapping.push(fieldMapping);
                }
                for(let i = 1; i < jsonData.length; i++){
                    let leadImport = {};
                    for(let j = 0; j < jsonData[0].length; j++){
                        leadImport[jsonData[0][j]] = jsonData[i][j] != null? jsonData[i][j].toString() : null;
                        if(isNumeric(jsonData[i][j])){
                            field_phone = jsonData[0][j];
                        }
                        if(isEmail(jsonData[i][j])){
                            field_email = jsonData[0][j];
                        }
                    }
                    arrLeadImport.push(leadImport);
                }
                colEmail.value = field_email;
                colPhone.value = field_phone;
                for(let i = 0; i < arrLeadImport.length; i++){
                    if(arrLeadImport[i][field_phone] != null && arrLeadImport[i][field_phone] != ""){
                        if(regexSdt.test(arrLeadImport[i][field_phone].toString())) arrLeadImport[i]["valid_phone"] = true;
                        else arrLeadImport[i]["valid_phone"] = false;
                    }else{
                        arrLeadImport[i]["valid_phone"] = true;
                    }
                    if(arrLeadImport[i][field_email] != null && arrLeadImport[i][field_email] != ""){
                        if(regexEmail.test(arrLeadImport[i][field_email].toString())) arrLeadImport[i]["valid_email"] = true;
                        else arrLeadImport[i]["valid_email"] = false;
                    }else{
                        arrLeadImport[i]["valid_email"] = true;
                    }
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
    if(str != null && str.toString().includes("@") && str.toString().includes(".")) return true;
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
                let field_phone = "";
                let field_email = "";
                let arrFieldDist = [
                    {'field': "first_name", 'label': "Tên"},
                    {'field': "email", 'label': "Email"},
                    {'field': "mobile_no", 'label': "Số điện thoại"},
                    {'field': "gender", 'label': "Giới tính khách hàng"},
                    {'field': "lead_owner", 'label': "Phân công cho"},
                    {'field': "source", 'label': "Nguồn"},
                    {'field': "status", 'label': "Trạng thái"},
                    {'field': "territory", 'label': "Khu vực"},
                    {'field': "territory", 'label': "Ngành nghề"}
                ]
                for(let i = 0; i < data[0].length; i++){
                    let itemColumn = {
                        key: data[0][i], label: data[0][i], width: i == 0? '180px' : '150px'
                    }
                    let fieldMapping = {
                        'label': data[0][i], 'key': data[0][i], 'field_dict': ""
                    }
                    let filterField = arrFieldDist.filter(x => x.label == data[0][i]);
                    if(filterField.length > 0) fieldMapping["field_dict"] = filterField[0].field;
                    arrColumnDataPreview.push(itemColumn);
                    arrFieldMapping.push(fieldMapping);
                }
                for(let i = 1; i < data.length; i++){
                    let leadImport = {};
                    for(let j = 0; j < data[0].length; j++){
                        leadImport[data[0][j]] = data[i][j] != null? data[i][j].toString() : null;
                        if(isNumeric(jsonData[i][j])){
                            field_phone = jsonData[0][j];
                        }
                        if(isEmail(jsonData[i][j])){
                            field_email = jsonData[0][j];
                        }
                    }
                    arrLeadImport.push(leadImport);
                }
                for(let i = 0; i < arrLeadImport.length; i++){
                    if(arrLeadImport[i][field_phone] != null && arrLeadImport[i][field_phone] != ""){
                        if(regexSdt.test(arrLeadImport[i][field_phone].toString())) arrLeadImport[i]["valid_phone"] = true;
                        else arrLeadImport[i]["valid_phone"] = false;
                    }else{
                        arrLeadImport[i]["valid_phone"] = true;
                    }
                    if(arrLeadImport[i][field_email] != null && arrLeadImport[i][field_email] != ""){
                        if(regexEmail.test(arrLeadImport[i][field_email].toString())) arrLeadImport[i]["valid_email"] = true;
                        else arrLeadImport[i]["valid_email"] = false;
                    }else{
                        arrLeadImport[i]["valid_email"] = true;
                    }
                }
                columnsDataPreview.value = arrColumnDataPreview;
                rowsDataPreview.value = arrLeadImport;
                fieldsMapping.value = arrFieldMapping;
                showLinkModal.value = false;
                showPreviewData.value = true;
            }
        },
        onError(error){
            loadingReadLinkSheet.value = false;
            createToast({
                title: __('Error'),
                text: __("Trong quá trình đọc dữ liệu. Vui lòng liên hệ Admin để tiếp tục"),
                icon: 'x',
                iconClasses: 'text-red-600',
            })
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
    let valid_phone = true;
    for(let i = 0; i < rowsDataPreview.value.length; i++){
        if(!rowsDataPreview.value[i].valid_email){
            valid_email = false;
        }
        if(!rowsDataPreview.value[i].valid_phone){
            valid_phone = false;
        }
        if(valid_email == false && valid_phone == false) break;
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
    if(valid_phone == false){
        createToast({
            title: __('Error'),
            text: __("Sai định dạng số di động. Vui lòng kiểm tra lại"),
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
            loadingImport.value = false;
            createToast({
                title: __('Error'),
                text: __("Trong quá trình nhập tệp lỗi. Vui lòng liên hệ Admin để tiếp tục"),
                icon: 'x',
                iconClasses: 'text-red-600',
            })
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