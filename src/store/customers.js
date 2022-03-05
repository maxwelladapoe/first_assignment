import { defineStore } from "pinia";
import api from "../services/api.js";

export const useCustomersStore = defineStore("customers", {
  state: () => ({
    allCustomers: [],
    isLoadingData: false,
  }),

  actions: {
    async getAllCustomers() {
      this.isLoadingData = true;
      let response = await api.get("/customers");
      if (response.data) {
        // converting all string ids to int ids using map
        this.allCustomers = response.data.map(function (item) {
          item.id = parseInt(item.id);
          return item;
        });
        this.isLoadingData = false;
      }
      return response;
    },
    async deleteCustomer(id) {
      let response = await api.delete(`/customers/${id}`);
      if (response.data) {
        let getIndex = this.allCustomers.findIndex(
          (element) => element.id === parseInt(response.data.id)
        );
        if (getIndex >= 0) {
          this.allCustomers.splice(getIndex, 1);
        }
      }
      return response;
    },
  },
});
