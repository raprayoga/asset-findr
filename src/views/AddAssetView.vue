<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { type FormAsset } from '@/interface/assets'
import { getItemFromLocalStorage, setItemToLocalStorage } from '@/utils/store'

const form = ref<FormAsset>({
  AssetID: '',
  AssetName: '',
  Category: '',
  Status: '',
  ModelNumber: '',
  SerialNumber: '',
  Description: '',
  PurchaseDate: '',
  PurchaseCost: 0,
  VendorName: ''
})

const dateOrigin = ref<Date>(new Date())

const purchaseCost = computed({
  get(): string {
    return new Intl.NumberFormat('id-ID').format(form.value.PurchaseCost)
  },
  set(newValue: string) {
    if (!Number.isNaN(Number(newValue.replaceAll('.', '')))) {
      form.value.PurchaseCost = Number(newValue.replaceAll('.', ''))
    } else {
      form.value.PurchaseCost = 0
    }
  }
})
const ruleRequired = (value: string) => {
  if (value) return true
  return 'You must enter.'
}

const ruleMax = (value: string) => {
  if (value.length <= 200) return true
  return "can't greater than 200 characters."
}

const isFormAreValid = computed<boolean>(() => {
  let isValid = true
  const formTemp = JSON.parse(JSON.stringify(form.value))
  Object.keys(formTemp).forEach((key) => {
    if (formTemp[key] === '') isValid = false
  })

  return isValid
})

const formatDate = (date: Date): string => {
  if (!date) return ''
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

watch(dateOrigin, () => {
  form.value.PurchaseDate = formatDate(dateOrigin.value)
})

watch(dateOrigin, () => {
  form.value.PurchaseDate = formatDate(dateOrigin.value)
})

const handleSubmit = () => {
  if (!isFormAreValid.value) return

  const assets = getItemFromLocalStorage('assets') ?? []
  assets.push(form.value) 
  setItemToLocalStorage('assets', assets)
}
</script>

<template>
  <v-card style="min-height: 90%">
    <template v-slot:title>
      <v-btn icon="mdi-arrow-left" to="/assets" size="small" variant="plain"></v-btn>
      Add Asset
    </template>

    <v-row class="px-10">
      <v-col cols="6">
        <h6 class="text-h6 font-weight-bold mb-6">Asset Information</h6>
        <v-text-field
          v-model="form.AssetID"
          :rules="[ruleRequired]"
          label="Asset ID/Tag"
          required
          hide-details
          class="mb-6"
        ></v-text-field>

        <v-text-field
          v-model="form.AssetName"
          :rules="[ruleRequired]"
          label="Asset Name"
          required
          hide-details
          class="mb-6"
        ></v-text-field>

        <v-select
          v-model="form.Category"
          :rules="[ruleRequired]"
          label="Category"
          :items="['Tire', 'Vehicle']"
          class="mb-6"
        ></v-select>

        <v-select
          v-model="form.Status"
          :rules="[ruleRequired]"
          label="Status"
          :items="['Active', 'Inactive', 'InRepair']"
          class="mb-6"
        ></v-select>

        <v-text-field
          v-model="form.ModelNumber"
          :rules="[ruleRequired]"
          label="ModelNumber"
          required
          hide-details
          class="mb-6"
        ></v-text-field>

        <v-text-field
          v-model="form.SerialNumber"
          :rules="[ruleRequired]"
          label="SerialNumber"
          required
          hide-details
          class="mb-6"
        ></v-text-field>

        <v-textarea
          rows="1"
          counter="200"
          label="Text"
          :rules="[ruleRequired, ruleMax]"
          v-model="form.Description"
        ></v-textarea>
      </v-col>

      <v-col cols="6">
        <h6 class="text-h6 font-weight-bold mb-6">Purchase Information</h6>
        <v-text-field
          prefix="Rp "
          v-model="purchaseCost"
          label="Purchase Cost"
          required
          hide-details
          class="mb-6"
        ></v-text-field>

        <v-menu class="mb-6" ref="dob" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="form.PurchaseDate"
              label="Purchase Date"
              v-bind="props"
            ></v-text-field>
          </template>

          <v-date-picker color="primary" v-model="dateOrigin"></v-date-picker>
        </v-menu>

        <v-text-field
          v-model="form.VendorName"
          :rules="[ruleRequired]"
          label="VendorName"
          required
          hide-details
          class="mb-6"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mt-5 px-10">
      <v-btn :disabled="!isFormAreValid" color="blue-darken-3" size="large" class="w-50" @click="handleSubmit">Add Asset</v-btn>
    </v-row>
  </v-card>
</template>
