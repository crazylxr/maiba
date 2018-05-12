<template>
  <div id="site-nav">
      <ul>
          <li>你好，<a href="http://localhost:8081/#/my">xxx</a></li>
          <li><a href="#">我的订单</a></li>
          <li><a href="#">我的购物车</a></li>
      </ul>
  </div>
</template>

<style lang="less" scoped>

#site-nav {
    height: 40px;
    background: #66b1f1;

    ul {
        display: flex;
        margin: 0 auto;
        padding: 0;
        width: 1000px;
        height: 100%;
        list-style: none;
        align-items: center;
        justify-content: flex-end;

        li {
            padding: 0 10px;
            font-size: 14px;
        }
    }
}

a {
    text-decoration: none;
    color: #fff;
}
</style>
