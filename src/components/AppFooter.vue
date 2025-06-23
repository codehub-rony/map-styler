<template>
  <!-- <v-footer class="pa-0 d-flex justify-center app-footer">
    <div class="d-flex align-center">
      <div class="text-center text-caption mt-1" cols="12">
        {{ new Date().getFullYear() }} — <strong>Rony Nedkov</strong>
      </div>
    </div> -->
  <!-- </v-footer> -->
  <div class="outer">
    <v-sheet height="20" class="myfooter">sdfsafd</v-sheet>
  </div>
</template>

<script>
export default {};
</script>
<style>
.app-footer {
  position: fixed;
  bottom: 0px;
}

.myfooter {
  position: absolute;
  bottom: 2px;
  z-index: 10;
  width: 100%;
}
.outer {
  overflow: hidden;
}
</style>
