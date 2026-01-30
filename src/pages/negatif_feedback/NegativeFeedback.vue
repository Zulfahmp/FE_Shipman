<template>
  <Breadcumb
    title="Negative Feedback"
    info="Your feedback helps others"
  ></Breadcumb>
  <div class="grid grid-cols-2 p-2 gap-2">
    <div
      @click="AddPop"
      class="cursor-pointer rounded-full font-bold bg-blue-500 px-4 w-full md:w-fit justify-center text-white text-xs p-2 flex items-center gap-2"
    >
      <FontAwesomeIcon :icon="faPlusCircle" class="pointer-events-none" />
      <div class="pointer-events-none whitespace-nowrap">Add Feedback</div>
    </div>
    <div
      class="rounded-full w-full bg-gray-200 px-4 text-white text-xs flex items-center gap-2"
    >
      <FontAwesomeIcon :icon="faSearch" class="text-gray-400" />
      <input
        @keyup="handleSearch"
        v-model="search"
        type="text"
        class="p-2 w-full bg-gray-200 text-gray-800 focus:outline-none"
        placeholder="Search Negative Feedback"
      />
    </div>
  </div>
  <div class="text-xs flex gap-1 items-center ml-3 mb-2">
    <div>Rows</div>
    <select
      v-model="PAGINATION.limit"
      class="border rounded-sm p-1 outline-none"
    >
      <option>25</option>
      <option>50</option>
      <option>100</option>
      <option>150</option>
      <option>200</option>
    </select>
  </div>
  <div class="overflow-x-scroll scrollbar-thin w-full px-2">
    <table class="w-full table-auto">
      <thead>
        <tr class="bg-gray-100 text-xs">
          <th class="p-2 whitespace-nowrap border border-gray-200">
            Ship Name
          </th>
          <th class="p-2 whitespace-nowrap border border-gray-200">Port</th>
          <th class="p-2 whitespace-nowrap border border-gray-200">
            Next Port
          </th>
          <th class="p-2 whitespace-nowrap border border-gray-200">Date</th>
          <th class="p-2 whitespace-nowrap border border-gray-200">
            Approve Status
          </th>
          <th class="p-2 whitespace-nowrap border border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="n in NF.data"
          @click="
            GoApproval(
              n.nf_id,
              n.ship_name,
              n.port_name,
              n.status_nf,
              n.approver,
            )
          "
          class="text-xs text-center cursor-pointer"
        >
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ n.ship_name }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ n.port_name }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ n.port_next_name }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ n.date_of_report }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            <div class="flex justify-center">
              <div v-if="n.status_nf >= 0" class="flex justify-center">
                <FontAwesomeIcon
                  :icon="n.status_nf ? faCheckCircle : faXmarkCircle"
                  :class="n.status_nf ? 'text-green-500' : 'text-red-500'"
                  size="2x"
                />
              </div>
              <div
                v-if="n.status_nf == -1"
                class="rounded-full w-fit mx-auto px-4 py-1 bg-gray-600 text-white"
              >
                Need Approval
              </div>
            </div>
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            <div
              v-if="n.status_nf >= 0"
              class="flex justify-center"
              @click="generateDoc($event, n.nf_id)"
            >
              <FontAwesomeIcon
                :icon="faDownload"
                class="text-green-500"
                size="2x"
              />
            </div>
          </td>
        </tr>
        <tr v-if="!NF.data.length && search == ''">
          <td
            colspan="8"
            class="text-center text-gray-800 py-2 text-sm border border-gray-200"
          >
            No Data
          </td>
        </tr>
        <tr v-if="!NF.data.length && search != ''">
          <td
            colspan="8"
            class="text-center text-gray-800 py-2 text-sm border border-gray-200"
          >
            Data Not Found
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="NF.data.length == 0 && search == ''">
      <div class="text-sm text-center text-gray-700 p-2">No Data</div>
    </div>
    <div
      class="py-2 flex flex-wrap gap-2 justify-center w-full mx-auto px-10 mt-5"
    >
      <div
        v-for="page in PAGINATION.total_page <= 20
          ? PAGINATION.total_page
          : PAGINATION.range_end"
        :id="page"
        @click="Pagination(page)"
        :class="page == PAGINATION.current_page ? 'bg-blue-700' : 'bg-gray-700'"
        class="cursor-pointer hover:bg-blue-600 active:bg-blue-600 text-white py-1 px-2 text-xs w-fit rounded-sm"
      >
        {{ page }}
      </div>
    </div>
  </div>
  <div></div>
  <AddFeedback v-if="ADDPOP" @close="AddPop"></AddFeedback>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Breadcumb from "@/components/Breadcumb.vue";
import { Page } from "@/router";
import { useRouter } from "vue-router";
const routing = useRouter();
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import {
  faCheckCircle,
  faDownload,
  faPlusCircle,
  faSearch,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import AddFeedback from "@/pages/negatif_feedback/AddFeedback.vue";
import { GetData } from "@/api";
import { NFAPRSTORE } from "./negativeaprstore";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
const NFAPR = NFAPRSTORE();
let PAGINATION = reactive({
  current_page: 1,
  total_page: 0,
  range_start: 1,
  range_end: 20,
  limit: 25,
  step: 3,
});
var ADDPOP = ref(false);
var search = reactive("");
var NF = reactive({ data: [] });
let NFDOWNLOAD = reactive({ data: { detail: [] } });

watch([search, PAGINATION], (v) => {
  loadNF();
});

onMounted(async () => {
  await loadNF();
});

function AddPop() {
  let change = !ADDPOP.value;
  ADDPOP.value = change;
}

function Pagination(page) {
  PAGINATION.current_page = page;
}

async function loadNF() {
  let res = await GetData(
    "/list-negative-feedback",
    `search=${search}&limit=${PAGINATION.limit}&current_page=${(PAGINATION.current_page - 1) * PAGINATION.limit}`,
  );
  NF.data = res.data.lists;
  PAGINATION.total_page = Math.ceil(res.data.total_rows / PAGINATION.limit);
}

async function handleSearch() {
  loadNF();
}

function GoApproval(nf_id, ship_name, port, status_nf, approver) {
  NFAPR.nf_id = nf_id;
  NFAPR.ship_name = ship_name;
  NFAPR.approver = approver;
  NFAPR.port = port;
  NFAPR.status_nf = status_nf;
  Page("negative-feedback-action", routing);
}

const generateDoc = async (e, NF_ID) => {
  e.stopPropagation();
  let res = await GetData("/nf-view/" + NF_ID);
  NFDOWNLOAD.data = { ...res.data };
  console.log(res);
  await nextTick();
  // ambil file template .docx
  const response = await fetch("/negative_feedback_template_v1.docx");
  const content = await response.arrayBuffer();

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  let status = {};
  let remarks = {};
  let nflist = { itemsnf: [] };
  NFDOWNLOAD.data.detail.map((a, i) => {
    // status[`${a.part_id}_${a.order_number}_status`]= a.checker && a.nahkoda ? '☑ Yes' : '☐ Yes' ;
    // remarks[`${a.ref_number}_remarks`]= a.remarks!="" ? a.remarks : '';
    nflist.itemsnf.push({
      no: i + 1,
      ref_number: a.ref_number,
      remarks: a.remarks,
    });
  });
  // isi data ke template
  doc.setData({
    SHIP_NAME: NFDOWNLOAD.data.ship_name,
    PORT_NAME: NFDOWNLOAD.data.port_name,
    CREATED_BY: NFDOWNLOAD.data.created_by,
    CREATED_AT: NFDOWNLOAD.data.created_at,
    ...nflist,
    // ...status,
    // ...remarks
  });

  try {
    doc.render();
  } catch (error) {
    console.error(error);
    alert("Gagal render dokumen");
    return;
  }

  // hasilkan file dan simpan
  const out = doc.getZip().generate({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const now = new Date();
  const formatted =
    now.getFullYear() +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    ("0" + now.getDate()).slice(-2) +
    "_" +
    ("0" + now.getHours()).slice(-2) +
    ("0" + now.getMinutes()).slice(-2) +
    ("0" + now.getSeconds()).slice(-2);

  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  const filename = `NegativeFeedbcak-${NFDOWNLOAD.data.ship_name}-${formatted}-${random}.docx`;
  saveAs(out, filename);
};
</script>
