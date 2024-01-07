<script setup lang="ts"></script>

<template>
  <v-app>
    <v-navigation-drawer class="mt-6">
      <v-list-item class="d-flex justify-center">
        <img :width="149" aspect-ratio="16/9" cover src="@/assets/logo.png" alt="logo" />
      </v-list-item>

      <v-list nav>
        <v-list-item prepend-icon="mdi-home-outline" title="Home" value="home" to="/home">
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-wallet-outline"
          title="Manage Asset"
          value="assets"
          to="/assets"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-cog-outline"
          title="Settings"
          value="settings"
          to="/settings"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Manage Asset</v-app-bar-title>

      <template v-slot:append>
        <v-badge dot color="error">
          <v-icon icon="mdi-bell-badge-outline"></v-icon>
        </v-badge>
        <v-avatar class="ml-3">
          <img src="@/assets/avatar.png" alt="avatar" />
        </v-avatar>
      </template>
    </v-app-bar>
    <v-main style="height: 250px">
      <router-view />
    </v-main>
  </v-app>
</template>
