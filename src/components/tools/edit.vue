<template>
  <div class="editButton">
      <slot name="before"></slot>
      <slot name="after"></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.editButton{
    position: absolute;
    bottom: 3vh;
    right: 3vh;
    width: 140px;
    height: 40px;
    background: #dfe6e9;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    transition: .3s linear;

    span {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #2d3436;
        color: #f1f1f1;
        text-align: center;
        line-height: 40px;
        z-index: 999;
        transition: .6s linear;
        border-radius: 20px;
    }

    a {
        flex: 1;
        font-size: 13px;
        color: #2d3436;
        text-align: center;
        transform:translateX(-100%);
        opacity: 0;
        transition: .3s linear;
    }

    a:nth-of-type(1) {
        transition-delay: 1s;
    }
    a:nth-of-type(2) {
        transition-delay: 0.8s;
    }
    a:nth-of-type(3) {
        transition-delay: 0.6s;
    }
}
.editButton:hover {
    transform: scale(1.1);

    span {
        transform: translateX(-100%);
        transition-delay: .3s;
    }

    a {
        opacity: 1;
        transform: translateX(0);
    }
}
i {
    background-color: black;
    border-radius: 30%;
    font-size: 21px;
    color:blanchedalmond;
    font-family: "montserrat", sans-serif;
}
</style>
