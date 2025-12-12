<script setup lang="ts"></script>
<template>
  <div class="modal-component">
    <div class="modal-component__wrapper">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, dignissimos quas officiis
      qui at animi optio tempore quos commodi sint voluptates architecto natus excepturi ex delectus
      vel explicabo. Ratione fugiat nulla exercitationem ipsum aliquid id facilis fuga voluptatum
      repudiandae iure officiis quisquam enim molestias repellendus vero praesentium libero et ullam
      ipsam officia, nisi corporis error tempora quas! Tempore nemo quas harum similique, eius,
      impedit voluptatum hic mollitia dolorem, quo illo labore recusandae eaque earum. Consequatur
      quidem cupiditate laudantium quis. Doloremque quidem hic facilis harum rem cum doloribus
      voluptatum sequi ipsum optio nemo, veritatis libero ratione fugit incidunt necessitatibus,
      atque dolores.
    </div>
  </div>
</template>
<style scoped lang="scss">
.modal-component {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.581);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.modal-component__wrapper {
  background-color: $white;
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: $border-radius;
  max-width: 650px;
}
</style>
