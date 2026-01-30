<template>
  <Breadcumb title="SSCL" info="Ship Shore Safety Checklist"></Breadcumb>
  <div class="grid grid-cols-2 p-2 gap-2">
    <div
      @click="AddPop"
      class="cursor-pointer w-full md:w-fit rounded-full font-bold bg-blue-500 px-4 justify-center text-white text-xs p-2 flex items-center gap-2"
    >
      <FontAwesomeIcon :icon="faPlusCircle" class="pointer-events-none" />
      <div class="pointer-events-none whitespace-nowrap">New SSCL</div>
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
        placeholder="Search Ship Shore Safety Checklist"
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
          <th class="p-2 whitespace-nowrap border border-gray-200">Bert</th>
          <th class="p-2 whitespace-nowrap border border-gray-200">Cargo</th>
          <th class="p-2 whitespace-nowrap border border-gray-200">
            Date of Arrival
          </th>
          <th class="p-2 whitespace-nowrap border border-gray-200">
            Time of Arrival
          </th>
          <th class="p-2 whitespace-nowrap border border-gray-200">
            Approve Status
          </th>
          <th class="p-2 whitespace-nowrap border border-gray-200">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="s in sscl.data"
          @click="Page('preview-sscl/' + s.sscl_id, routing)"
          class="cursor-pointer text-xs text-center"
        >
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ s.ship_name }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ s.port_name }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ s.berth_name }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ s.cargo_name }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ s.date_arrival }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            {{ s.time_arrival }}
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            <div v-if="s.status_sscl >= 0" class="flex justify-center">
              <FontAwesomeIcon
                :icon="s.status_sscl ? faCheckCircle : faXmarkCircle"
                :class="s.status_sscl ? 'text-green-500' : 'text-red-500'"
                size="2x"
              />
            </div>
            <div
              v-if="s.status_sscl == -1"
              class="rounded-full w-fit mx-auto px-4 py-1 bg-gray-600 text-white"
            >
              Need Approval
            </div>
          </td>
          <td class="p-2 whitespace-nowrap border border-gray-200">
            <div v-if="s.status_sscl != -1" class="flex justify-center">
              <FontAwesomeIcon
                :icon="faDownload"
                class="text-green-500"
                size="2x"
                @click="generateDoc($event, s.sscl_id)"
              />
            </div>
          </td>
        </tr>
        <tr v-if="!sscl.data.length && search == ''">
          <td
            colspan="8"
            class="text-center text-gray-800 py-2 text-sm border border-gray-200"
          >
            No Data
          </td>
        </tr>
        <tr v-if="!sscl.data.length && search != ''">
          <td
            colspan="8"
            class="text-center text-gray-800 py-2 text-sm border border-gray-200"
          >
            Data Not Found
          </td>
        </tr>
      </tbody>
    </table>

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
    <!-- <div class="py-2 flex flex-warp gap-2 justify-center w-full mx-auto px-10">
            <div
                v-for="(pagerange, index) in Math.ceil(PAGINATION.total_page / PAGINATION.step)"
                :key="index"
                @click="Pagination(index)"
                :class="Math.min((index + 1) * PAGINATION.step, PAGINATION.total_page)==PAGINATION.range_end ? 'bg-blue-700' : 'bg-gray-700'"
                class="hover:bg-blue-600 active:bg-blue-600 text-white py-1 px-2 text-xs w-fit rounded-sm cursor-pointer hover:bg-gray-600"
            >
                {{ (index * PAGINATION.step + 1) + ' - ' + Math.min((index + 1) * PAGINATION.step, PAGINATION.total_page) }}
            </div>
        </div> -->
  </div>
  <div></div>
  <AddSSCL v-if="ADDPOP" @close="AddPop"></AddSSCL>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Breadcumb from "@/components/Breadcumb.vue";
import { Page } from "@/router";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { ref, reactive, watch, onMounted, nextTick } from "vue";
import {
  faCheckCircle,
  faDownload,
  faPlusCircle,
  faSearch,
  faSquare,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { GetData } from "@/api";
import AddSSCL from "./AddSSCL.vue";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { SSCLSTORE } from "./ssclstore";

let PAGINATION = reactive({
  current_page: 1,
  total_page: 0,
  range_start: 1,
  range_end: 20,
  limit: 25,
  step: 3,
});
let routing = useRouter();
let ADDPOP = ref(false);
let search = reactive("");
let sscl = reactive({ data: [] });
let SSCL_STATE = SSCLSTORE();

let SSCLDOWNLOAD = reactive({ data: { sscl_checklist: [] } });
watch([search, PAGINATION], (v) => {
  loadSSCL();
});

onMounted(async () => {
  await loadSSCL();
});

function AddPop() {
  let change = !ADDPOP.value;
  ADDPOP.value = change;
  SSCL_STATE.resetSSCL();
  // console.log('pop',ADDPOP)
}
function Pagination(page) {
  PAGINATION.current_page = page;
}
async function loadSSCL() {
  let res = await GetData(
    "/list-sscl",
    `search=${search}&limit=${PAGINATION.limit}&current_page=${(PAGINATION.current_page - 1) * PAGINATION.limit}`,
  );
  sscl.data = res.data.lists;
  PAGINATION.total_page = Math.ceil(res.data.total_rows / PAGINATION.limit);
  // console.log(PAGINATION,sscl.data)
  // PAGINATION.current_page=1
  // PAGINATION.range_start = 1
  // PAGINATION.range_end = PAGINATION.total_page
}

async function handleSearch() {
  loadSSCL();
}

const generateDoc = async (e, SSCL_ID) => {
  e.stopPropagation();
  let res = await GetData("/sscl-view/" + SSCL_ID);
  let resrep = await GetData("/list-repetitive-checks/" + res.data.ship_id);
  let REPETITIVE = { ...resrep.data };
  SSCLDOWNLOAD.data = { ...res.data };
  await nextTick();
  // ambil file template .docx
  const response = await fetch("/sscl_template_v1.docx");
  const content = await response.arrayBuffer();

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter() {
      return "";
    },
  });

  let status = {};
  let remarks = {};
  SSCLDOWNLOAD.data.sscl_checklist.map((a) => {
    status[`${a.part_id}_${a.order_number}_status`] =
      a.checker && a.nahkoda ? "☑ Yes" : "☐ Yes";
    remarks[`${a.part_id}_${a.order_number}_remarks`] =
      a.remarks != "" ? a.remarks : "";
  });
  // REPETITIVE.summary.reverse()
  let part8 = {};
  let part9 = {};
  let HRSpart = {
    "8_HRS": REPETITIVE.summary[0].interval_8,
    "9_HRS": REPETITIVE.summary[0].interval_9,
  };
  let Tpart = {};
  let time6limit = 1;
  let summary = 0;
  for (const a of REPETITIVE.summary) {
    Tpart["8_T" + (summary + 1)] = a.time_8;
    Tpart["9_T" + (summary + 1)] = a.time_9;
    for (const b of REPETITIVE.detail[summary]) {
      if (a.sscl_id == b.id_sscl && b.part_id == "8") {
        part8["8_" + b.order_number + "_T" + time6limit] =
          b.checker && b.nahkoda ? "☑ Yes" : "☐ Yes";
        part8["8_" + b.order_number + "_remarks"] = b.remarks;
      }
      if (a.sscl_id == b.id_sscl && b.part_id == "9") {
        part9["9_" + b.order_number + "_T" + time6limit] =
          b.checker && b.nahkoda ? "☑ Yes" : "☐ Yes";
        part8["9_" + b.order_number + "_remarks"] = b.remarks;
      }
    }
    summary++;
    time6limit++;
  }
  console.log(REPETITIVE, part8);
  // isi data ke template
  doc.setData({
    mt_name: SSCLDOWNLOAD.data.mt_name,
    officer_name: SSCLDOWNLOAD.data.officer_name,
    officer_position: SSCLDOWNLOAD.data.officer_position,
    officer_contact: SSCLDOWNLOAD.data.officer_contact,
    date_arrival: SSCLDOWNLOAD.data.date_arrival,
    time_arrival: SSCLDOWNLOAD.data.time_arrival,
    ship_name: SSCLDOWNLOAD.data.ship_name,
    port_name: SSCLDOWNLOAD.data.port_name,
    berth_name: SSCLDOWNLOAD.data.berth_name,
    cargo_name: SSCLDOWNLOAD.data.cargo_name,
    ...status,
    ...remarks,
    ...part8,
    ...part9,
    ...HRSpart,
    ...Tpart,
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
  const filename = `SSCL-${SSCLDOWNLOAD.data.ship_name}-${formatted}-${random}.docx`;
  saveAs(out, filename);
};
</script>
