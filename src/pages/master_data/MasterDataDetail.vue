<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPen,
  faPencil,
  faPlusCircle,
  faSearch,
  faTrash,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import Breadcumb from "@/components/Breadcumb.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { Page } from "@/router";
import { useRoute, useRouter } from "vue-router";
import AddShip from "@/pages/master_data/AddShip.vue";
import axios from "axios";
import ConfirmDelete from "@/components/ConfirmDelete.vue";
import Swal from "sweetalert2";
import AddPort from "./AddPort.vue";
import { Failed, Success } from "@/sweet";
import { PostData } from "@/api";
import AddBerth from "./AddBerth.vue";
import EditShip from "./EditShip.vue";
import EditPort from "./EditPort.vue";
import EditBerth from "./EditBerth.vue";
import AddCargo from "./AddCargo.vue";
import EditCargo from "./EditCargo.vue";

const routing = useRouter();
const route = useRoute();

var search = ref("");
var master = reactive({ data: [] });

var pops = reactive({
  add_ship: false,
  edit_ship: false,
  add_port: false,
  edit_port: false,
  add_berth: false,
  edit_berth: false,
  add_cargo: false,
  edit_cargo: false,
  delete: false,
});

watch([pops], (val) => {
  loadMaster();
});

onMounted(async () => {
  await loadMaster();
});

function setPopup(name, status) {
  pops[name] = status;
}

async function loadMaster() {
  const token = localStorage.getItem("auth_token");
  await axios
    .get(
      import.meta.env.VITE_API +
        `/list-master-${route.params.master}?search=` +
        search.value,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      master.data = res.data;
    });
}

var d_ship = reactive({ item_name: "", item_id: 0 });

var u_ship = reactive({ ship_id: 0, ship_name: "", ship_code: "" });
var u_port = reactive({ port_id: 0, port_name: "", port_code: "" });
var u_berth = reactive({ berth_id: 0, berth_name: "", berth_code: "" });
var u_cargo = reactive({ cargo_id: 0, cargo_name: "", cargo_code: "" });

function handleEditShip(a) {
  u_ship.ship_id = a.ship_id;
  u_ship.ship_name = a.ship_name;
  u_ship.ship_code = a.ship_code;
  setPopup("edit_ship", true);
}

function handleEditPort(a) {
  u_port.port_id = a.port_id;
  u_port.port_name = a.port_name;
  u_port.port_code = a.port_code;
  setPopup("edit_port", true);
}

function handleEditBerth(a) {
  u_berth.berth_id = a.berth_id;
  u_berth.berth_name = a.berth_name;
  u_berth.berth_code = a.berth_code;
  setPopup("edit_berth", true);
}

function handleEditCargo(a) {
  u_cargo.cargo_id = a.cargo_id;
  u_cargo.cargo_name = a.cargo_name;
  u_cargo.cargo_code = a.cargo_code;
  setPopup("edit_cargo", true);
}

function handleDelete(item, id) {
  d_ship.item_name = item;
  d_ship.item_id = id;
  setPopup("delete", true);
}

async function Delete(item, id) {
  const token = localStorage.getItem("auth_token");
  let res = await PostData(`/delete-master-${route.params.master}`, {
    ship_id: id,
  });
  if (res.data.affected) {
    Success(`${item.toUpperCase()} Deleted!`, () => {
      setPopup("delete", false);
      loadMaster();
    });
  } else {
    Failed("Not Deleted", () => {
      setPopup("delete", false);
    });
  }
}

function handleAdd() {
  let r = route.params.master;
  if (r == "ship") {
    setPopup("add_ship", true);
  } else if (r == "port") {
    setPopup("add_port", true);
  } else if (r == "berth") {
    setPopup("add_berth", true);
  } else if (r == "cargo") {
    setPopup("add_cargo", true);
  }
}

watch([search], async () => {
  await loadMaster();
});
</script>
<template>
  <Breadcumb
    title="Master Data"
    :title2="`Master Data ${route.params.master.toUpperCase()}`"
    info="Management user for another action"
  ></Breadcumb>
  <div class="grid grid-cols-2 p-2 gap-2">
    <div
      @click="handleAdd"
      class="cursor-pointer w-full md:w-fit rounded-full font-bold bg-blue-500 px-4 justify-center text-white text-xs p-2 flex items-center gap-2"
    >
      <FontAwesomeIcon :icon="faPlusCircle" class="pointer-events-none" />
      <div class="pointer-events-none whitespace-nowrap">
        Add Master {{ route.params.master.toUpperCase() }}
      </div>
    </div>
    <div
      class="rounded-full bg-gray-200 px-4 text-white text-xs flex items-center gap-2"
    >
      <FontAwesomeIcon :icon="faSearch" class="text-gray-400" />
      <input
        v-model="search"
        type="text"
        class="p-2 w-full bg-gray-200 text-gray-800 focus:outline-none"
        placeholder="Search"
      />
    </div>
  </div>
  <div class="p-2">
    <div v-show="master.data.length == 0 && search == ''">
      <div class="text-sm text-center text-gray-700 p-2">No Data</div>
    </div>
    <div v-show="master.data.length == 0 && search != ''">
      <div class="text-sm text-center text-gray-700 p-2">Data Not Found</div>
    </div>
    <div
      v-show="route.params.master == 'ship'"
      v-for="m in master.data"
      class="even:bg-white odd:bg-gray-200 py-3 px-3 text-xs grid grid-cols-5 grid-rows-auto"
    >
      <div class="col-span-2">
        {{ m.ship_name }}
      </div>
      <div class="col-span-2">
        {{ m.ship_code }}
      </div>
      <div class="flex gap-3 items-center">
        <FontAwesomeIcon
          @click="handleEditShip(m)"
          :icon="faPen"
          class="text-green-500 cursor-pointer"
        />
        <FontAwesomeIcon
          @click="handleDelete(m.ship_name, m.ship_id)"
          :icon="faTrashAlt"
          class="text-red-500 cursor-pointer"
        />
      </div>
    </div>
    <div
      v-show="route.params.master == 'port'"
      v-for="m in master.data"
      class="even:bg-white odd:bg-gray-200 py-3 px-3 text-xs grid grid-cols-5 grid-rows-auto"
    >
      <div class="col-span-2">
        {{ m.port_name }}
      </div>
      <div class="col-span-2">
        {{ m.port_code }}
      </div>
      <div class="flex gap-3 items-center">
        <FontAwesomeIcon
          @click="handleEditPort(m)"
          :icon="faPen"
          class="text-green-500 cursor-pointer"
        />
        <FontAwesomeIcon
          @click="handleDelete(m.port_name, m.port_id)"
          :icon="faTrashAlt"
          class="text-red-500 cursor-pointer"
        />
      </div>
    </div>
    <div
      v-show="route.params.master == 'berth'"
      v-for="m in master.data"
      class="even:bg-white odd:bg-gray-200 py-3 px-3 text-xs grid grid-cols-5 grid-rows-auto"
    >
      <div class="col-span-2">
        {{ m.berth_name }}
      </div>
      <div class="col-span-2">
        {{ m.berth_code }}
      </div>
      <div class="flex gap-3 items-center">
        <FontAwesomeIcon
          @click="handleEditBerth(m)"
          :icon="faPen"
          class="text-green-500 cursor-pointer"
        />
        <FontAwesomeIcon
          @click="handleDelete(m.berth_name, m.berth_id)"
          :icon="faTrashAlt"
          class="text-red-500 cursor-pointer"
        />
      </div>
    </div>
    <div
      v-show="route.params.master == 'cargo'"
      v-for="m in master.data"
      class="even:bg-white odd:bg-gray-200 py-3 px-3 text-xs grid grid-cols-5 grid-rows-auto"
    >
      <div class="col-span-2">
        {{ m.cargo_name }}
      </div>
      <div class="col-span-2">
        {{ m.cargo_code }}
      </div>
      <div class="flex gap-3 items-center">
        <FontAwesomeIcon
          @click="handleEditCargo(m)"
          :icon="faPen"
          class="text-green-500 cursor-pointer"
        />
        <FontAwesomeIcon
          @click="handleDelete(m.cargo_name, m.cargo_id)"
          :icon="faTrashAlt"
          class="text-red-500 cursor-pointer"
        />
      </div>
    </div>
  </div>

  <AddShip v-if="pops.add_ship" @close="setPopup('add_ship', false)"></AddShip>
  <EditShip
    v-if="pops.edit_ship"
    :data_ship="u_ship"
    @close="setPopup('edit_ship', false)"
  ></EditShip>

  <AddPort v-if="pops.add_port" @close="setPopup('add_port', false)"></AddPort>
  <EditPort
    v-if="pops.edit_port"
    :data_port="u_port"
    @close="setPopup('edit_port', false)"
  ></EditPort>

  <AddBerth
    v-if="pops.add_berth"
    @close="setPopup('add_berth', false)"
  ></AddBerth>
  <EditBerth
    v-if="pops.edit_berth"
    :data_berth="u_berth"
    @close="setPopup('edit_berth', false)"
  ></EditBerth>

  <AddCargo
    v-if="pops.add_cargo"
    @close="setPopup('add_cargo', false)"
  ></AddCargo>
  <EditCargo
    v-if="pops.edit_cargo"
    :data_cargo="u_cargo"
    @close="setPopup('edit_cargo', false)"
  ></EditCargo>

  <ConfirmDelete
    v-if="pops.delete"
    :title="route.params.master.toUpperCase()"
    :item="d_ship.item_name"
    @action="Delete(d_ship.item_name, d_ship.item_id)"
    @close="setPopup('delete', false)"
  />
</template>
