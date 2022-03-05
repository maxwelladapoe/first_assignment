<script setup>
import {ref, onMounted, computed} from "vue";
import {useCustomersStore} from "./store/customers";
import CustomerTable from "./components/CustomerTable.vue";
import Loading from "./components/Loading.vue";

const customersStore = useCustomersStore();
const deleteCustomer = (customer) => {
  customersStore.deleteCustomer(customer.id)
};
let customers = computed(() => customersStore.allCustomers);
let isLoadingData = computed(() => customersStore.isLoadingData);

//mounted
onMounted(() => {
  customersStore.getAllCustomers().catch(e=>{
    console.log(e)
  });
});


</script>

<template>
  <div class="container">
    <h1 class="text-4xl font-bold">Customers</h1>

    <div class="mt-6">
      <Loading v-if="isLoadingData"/>
      <CustomerTable
          v-else
          :customers="customers"
          @deleteCustomer="deleteCustomer"
      />
    </div>
  </div>
</template>