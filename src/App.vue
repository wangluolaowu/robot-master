<template>
	<div id="app">
		<router-view></router-view>      
	</div>
</template>
<script>
export default {
  name: 'app',
  components: {
  }
}
</script>
<style lang="less">
body {
	margin: 0px;
	padding: 0px;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

// .el-submenu [class^=fa] {
// 	vertical-align: baseline;
// 	margin-right: 10px;
// }

// .el-menu-item [class^=fa] {
// 	vertical-align: baseline;
// 	margin-right: 10px;
// }
// .el-menu-item,.el-submenu__title{
// 	color: #fff!important;
// }
// .el-submenu__title+.el-menu,.el-submenu__title{
//     background: #2c323a!important;
// }
// .el-submenu__title+.el-menu li:hover,.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active,.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover, .el-menu-item:hover{
// 	background: #20a0ff!important
// }
// .toolbar {
// 	background: #f2f2f2;
// 	padding: 10px;
// 	//border:1px solid #dfe6ec;
// 	margin: 10px 0px;
// 	.el-form-item {
// 		margin-bottom: 10px;
// 	}
// }
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}
.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>