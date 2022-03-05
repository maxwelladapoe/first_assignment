<script setup>
import Dialog from "./Dialog.vue";
import { ref, computed } from "vue";

const props = defineProps({
  customers: {
    type: Object,
    required: true,
  },
  showCount: {
    type: Boolean,
    default: () => true,
  },
  showSortDetails: {
    type: Boolean,
    default: () => true,
  },
});
const emits = defineEmits(["deleteCustomer"]);
let currentCustomer = ref({});
let dialogTitle = ref("");
let dialogMessage = ref("");
let isShowingDeleteConfirmation = ref(false);

const showDeleteConfirmation = (customer) => {
  currentCustomer.value = customer;
  isShowingDeleteConfirmation.value = true;
  dialogTitle.value = `Are you sure you want to delete this customer with id (${customer.id})?`;
  dialogMessage.value = `This process cannot be reversed`;
};

const cancelDelete = () => {
  currentCustomer.value = {};
  isShowingDeleteConfirmation.value = false;
};

const deleteCustomer = () => {
  isShowingDeleteConfirmation.value = false;
  emits("deleteCustomer", currentCustomer.value);
};

//for sorting and filtering of customers
let sortProperty = ref("id");
let sortDirection = ref("asc");
let filterBy = ref(null);
const sortCustomersBy = (property) => {
  //if a different sort property is selected set the property and change the order to the default
  if (sortProperty.value !== property) {
    sortProperty.value = property;
    sortDirection.value = "asc";
  } else {
    //else if the sort property is not selected just change the order
    if (sortDirection.value === "asc") {
      sortDirection.value = "desc";
    } else if (sortDirection.value === "desc") {
      sortDirection.value = "asc";
    }
  }
};
const sortFunction = (property = "id", order = "asc") => {
  let sortOrder = 1;
  if (order === "desc") {
    sortOrder = -1;
  }
  return (a, b) => {
    let result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};
const sortedAndFilteredCustomers = computed(() => {
  let customersArray = props.customers;
  if (filterBy.value != null) {
    customersArray = props.customers.filter((item) => item.state === filterBy.value);
  }
  //to reset the array sort
  customersArray.sort(sortFunction);

  return customersArray.sort(sortFunction(sortProperty.value, sortDirection.value));
});
const numberOfCustomers = computed(
  () => sortedAndFilteredCustomers.value.length
);
</script>

<template>
  <Dialog
    @approve="deleteCustomer"
    @cancel="cancelDelete"
    key="delete-dialog"
    v-if="isShowingDeleteConfirmation"
    :title="dialogTitle"
    :message="dialogMessage"
  />
  <div class="flex items-center mb-3">
    <div class="mr-4 active-sort" v-if="showSortDetails">
      <p>Sorted by: {{sortProperty}} Order: {{sortDirection}} </p>
    </div>
    <div v-if="showCount">
      <p>Count: {{ numberOfCustomers }}</p>
    </div>
    <div class="flex items-center ml-auto">
      <img src="../assets/filter.svg" class="inline h-2 w-4 mr-1" />
      <label class="mr-2"> Status </label>
      <select class="border h-8 w-36" v-model="filterBy">
        <option :value="null">All</option>
        <option :value="true">Active</option>
        <option :value="false">Inactive</option>
      </select>
    </div>
  </div>
  <table class="table-auto w-full min-w-full">
    <thead>
      <tr class="bg-gray-200 border">
        <th class="table-header">
          <div class="sortable" @click="sortCustomersBy('id')">
            ID
            <img
              src="../assets/sortBoth.svg"
              class="h-3 w-4"
              alt="sort-image"
            />
          </div>
        </th>
        <th class="table-header">
          <div class="sortable" @click="sortCustomersBy('name')">
            Name
            <img
              src="../assets/sortBoth.svg"
              class="h-3 w-4"
              alt="sort-image"
            />
          </div>
        </th>
        <th class="table-header">
          <div class="sortable" @click="sortCustomersBy('state')">
            State
            <img
              src="../assets/sortBoth.svg"
              class="h-3 w-4"
              alt="sort-image"
            />
          </div>
        </th>
        <th class="table-header">Email</th>
        <th class="table-header">Phone Number</th>
        <th class="table-header">Joined At</th>
        <th class="table-header">Action</th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="customer in sortedAndFilteredCustomers"
        :key="customer.id"
      >
        <tr class="table-row">
          <td class="table-data">{{ customer.id }}</td>
          <td class="table-data">{{ customer.name }}</td>
          <td class="table-data">
            {{ customer.state ? "active" : "inactive" }}
          </td>
          <td class="table-data">{{ customer.email }}</td>
          <td class="table-data">{{ customer.phone_number }}</td>
          <td class="table-data">{{ customer.joined_at }}</td>
          <td class="table-data">
            <button
              @click="showDeleteConfirmation(customer)"
              :disabled="currentCustomer.id == customer.id"
              class="delete-btn"
            >
              Delete
            </button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>