<script setup>
    import { Page } from '@/router';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import AddMT from './AddMT.vue';
    const routing = useRouter()
    var ADDPOP = ref(false)
    function AddPop(){
    let change =  !ADDPOP.value
    ADDPOP.value= change
    }

</script>
<template>
    <div class="h-14 bg-blue-500 p-2 flex justify-center items-center text-white text-xs">
        TERMS AND CONDITIONS
    </div>
    <div class="p-2 text-xs">
        <div class="italic text-justify">
            Responsibility for the safe conduct of operations while your ship is at this terminal rests jointly with you, as Master of the ship, and with the responsible Terminal Representative. We wish, therefore, before operations start, to seek your full co-operation and understanding on the safety requirements set out in the Ship/Shore safety Check-List, which are based on safe practices that are widely accepted by the oil and tanker industries.
        </div>
        <div class="font-bold text-justify mb-2">
            Tanggung jawab untuk pelaksanaan operasi yang aman selama kapal Anda berada di terminal ini, menjadi tanggung jawab bersama antara Anda sebagai Nakhoda kapal dan dengan penanggung jawab terminal. Oleh karena itu kami berharap sebelum operasi dimulai, terjalin kerjasama dan pemahaman tentang persyaratan keselamatan sebagaimana ditetapkan dalam Ship / Shore Safety Check-List, dengan didasarkan pada praktek yang aman dan diterima secara luas oleh industri minyak dan kapal tanker.
        </div>
        <div class="italic text-justify">
            We expect you, and all under your command, to adhere strictly to these requirements throughout your ship’s stay alongside this terminal and we, for our part, will ensure that our personnel do likewise, and co-operate fully with you in the mutual interest of safe and efficient operations.
        </div>
        <div class="font-bold text-justify mb-2">
            Kami mengharapkan Anda dan semua yang berada di bawah komando Anda, untuk mematuhi secara ketat terhadap persyaratan selama kapal Anda bertambat di terminal kami. Dan kami akan memastikan bahwa personil kami melakukan hal yang sama, dan sepenuhnya bekerja sama dengan Anda untuk kepentingan operasional yang aman dan efisien.
        </div>
        <div class="italic text-justify">
            Before the start of operations, and from time to time thereafter, for our mutual safety, a member of the terminal staff, where appropriate together with a Responsible Officer, will make a routine inspection of your ship to ensure that elements addressed within the scope of the Ship/Shore Safety Check-List are being managed in an acceptable manner. Where corrective action is needed, we will not agree to operations commencing or, should they have been started, we will require them to be stopped.
        </div>
        <div class="font-bold text-justify mb-2">
            Sebelum dimulai dan selama pelaksanaan operasi untuk keselamatan kita bersama, anggota dari staf terminal dan apabila diperlukan bersama-sama dengan Petugas yang Bertanggung Jawab, akan melakukan pemeriksaan rutin kapal Anda untuk memastikan bahwa item-item yang dibahas dalam Ship / Shore Safety Check list sedang dikelola dengan cara yang benar. Apabila diperlukan tindakan perbaikan, kami tidak setuju kegiatan operasi untuk dimulai, atau apabila kegiatan operasi telah dimulai, kami akan meminta agar kegiatan operasi segera dihentikan.
        </div>
        <div class="italic text-justify">
            Similarly, if you consider that safety is being endangered by any action on the part of our staff or by any equipment under our control, you should demand immediate cessation of operations.
        </div>
        <div class="font-bold text-justify mb-2">
            Demikian pula, jika menurut Anda terdapat tindakan dari staf kami atau peralatan yang berada dibawah kontrol kami mengancam keselamatan, Anda harus segera meminta penghentian kegiatan operasi.
        </div>
         <div class="italic text-justify">
            There can be no compromise with safety
        </div>
        <div class="font-bold text-justify mb-2">
            Tidak ada kompromi terhadap keselamatan
        </div>
        <div class="flex gap-5 mx-auto text-center justify-end my-4 px-4">
            <div @click="AddPop" class="cursor-pointer rounded-lg py-2 px-4 bg-green-200 text-gray-800 font-bold text-xs">Continue</div>
        </div>
    </div>
    <AddMT v-if="ADDPOP"  @close="AddPop"></AddMT>
</template>