<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faBars, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
  let region = {'Balikpapan':{total:1},'Banjarmasin':{total:100},'Kotabaru':{total:120},'Pangkalan Bun':{total:200},'Pontianak':{total:24},'Jakarta':{total:34}};
</script>
<template>
    <div class="bg-white min-h-screen">
        <div class="h-40 bg-blue-500 p-2">
            <div class="flex gap-1 text-xs text-white items-center">
                <FontAwesomeIcon :icon="faChevronRight" class="text-white"/>
                <div>Dashboard</div>
            </div>
            <div class="text-xs text-white py-2">Ship Share Safety Checklist</div>
            <div class="w-full md:w-[100%] absoulte p-5 flex gap-1 flex-col left-0 right-0">
                <div class="rounded-md bg-white">
                    <div class="flex justify-between text-xs pt-2 px-4">
                        <div class="text-blue-500 font-bold">Port</div>
                        <div class="text-orange-500 font-medium">Juni 2025 <FontAwesomeIcon :icon="faChevronDown"/></div>
                    </div>
                    <div class="border text-[0.6rem] mt-2 border-gray-200 shadow-sm p-4 mx-4 rounded-sm flex flex-col gap-2">
                        <div v-for="(city,i) in region" :key="i" class="grid grid-cols-4 w-full items-end gap-3">
                            <div class="col-span-3 flex flex-col gap-2 w-full">
                                <div class="text-blue-500 font-bold">{{ i }}</div>
                                <div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="flex flex-col justify-center rounded-full overflow-hidden bg-orange-500 text-xs text-white text-center whitespace-nowrap transition duration-500" style="width:35%"></div>
                                </div>
                            </div>
                            <div class="text-orange-500 text-center">{{ city.total }}</div>
                        </div>
                    </div>
                </div>
                <div class="rounded-md bg-white text-xs py-2 hover:bg-gray-200 active:bg-gray-200">
                    <div class="flex justify-between px-4">
                        <div class="text-blue-500 font-bold">Port</div>
                        <div class="text-orange-500 font-medium">Juni 2025 <FontAwesomeIcon :icon="faChevronRight"/></div>
                    </div>
                </div>
                <div class="rounded-md bg-white text-xs py-2 hover:bg-gray-200 active:bg-gray-200">
                    <div class="flex justify-between px-4">
                        <div class="text-blue-500 font-bold">Port</div>
                        <div class="text-orange-500 font-medium">Juni 2025 <FontAwesomeIcon :icon="faChevronRight"/></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>