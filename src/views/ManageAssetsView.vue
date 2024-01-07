<script setup lang="ts">
import { ref, computed } from 'vue'
import assetsJson from '@/assets/assets.json'
import type { AssetItem } from '@/interface/assets';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@/utils/store'

if (!getItemFromLocalStorage('assets')) setItemToLocalStorage('assets', assetsJson)

const statusColor: { [key: string]: string } = {
  Active: 'green',
  Inactive: 'red',
  InRepair: 'yellow'
}
const assets = getItemFromLocalStorage('assets') ?? assetsJson as AssetItem[]
const keyword = ref<string>('')
const items = computed<AssetItem[]>(() => {
  return assets.filter((asset: AssetItem) => {
    return asset.AssetName.toLowerCase().includes(keyword.value.toLowerCase());
  })
})
</script>

<template>
  <v-card title="List Asset">
    <v-row justify="start" class="mx-4">
      <v-col cols="2">
        <router-link to="/assets/add">
          <v-btn color="blue-darken-3">+ Add Asset</v-btn>
        </router-link>
      </v-col>

      <v-col cols="3">
        <input v-model="keyword" type="text" placeholder="Search Asset..." />
      </v-col>
    </v-row>
    <v-table fixed-header>
      <thead>
        <tr style="height: 72px">
          <th id="asset_id">Asset ID/Tag</th>
          <th id="asset_name">Asset Name</th>
          <th id="desc">Description</th>
          <th id="purc_cost">Purchase Cost</th>
          <th id="purc_date">Purchase Date</th>
          <th id="status">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.AssetID" style="height: 72px">
          <td>{{ item.AssetID }}</td>
          <td>{{ item.AssetName }}</td>
          <td>{{ item.Description }}</td>
          <td>{{ item.PurchaseCost }}</td>
          <td>{{ item.PurchaseDate }}</td>
          <td>
            <v-chip :color="statusColor[item.Status]"> {{ item.Status }} </v-chip>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<style scoped>
input {
  border: 1px solid #eaecf0;
  border-radius: 8px;
  padding: 0 16px;
  height: 40px;
}

input:focus {
  outline: none;
}
</style>
