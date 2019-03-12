import Login from './pages/Login.vue'
import NotFound from './pages/404.vue'
import Layout from './pages/Layout.vue'
let routerlist = [
  {
    path: 'robot',
    childen: {
      BaseToggle: '基本状态切换',
      Anm: '动作控制',
      Power: '电池和充电管理',
      Paths: '路径规划',
      Mover: '移动管理',
      Charts: '分解动作最优化'
    },
    icon: 'robot',
    name: '机器人管理'
  }
]
const routes = [
  {
    path: '/login',
    component: Login,
    name: '登录',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '页面未找到',
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    icon: 'el-icon-tickets',
    name: '看板',
    children: [
      {
        path: 'kanban/order',
        component: () => import('@/pages/plate/Order'),
        name: '订单看板'
      },
      {
        path: 'kanban/robot',
        component: () => import('@/pages/plate/RobotInfo'),
        name: '机器人信息'
      },
      {
        path: '/kanban/ws',
        component: () => import('@/pages/plate/Workstation'),
        name: '工作站信息'
      },
      {
        path: '/kanban/charger',
        component: () => import('@/pages/plate/Charging'),
        name: '充电桩信息'
      },
      {
        path: '/kanban/stat',
        component: () => import('@/pages/plate/Statistical'),
        name: '统计信息'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '拣货管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/picking/task',
        component: () => import('@/pages/plate/StopReceive'),
        name: '停止恢复接收任务'
      },
      {
        path: '/picking/batch',
        component: () => import('@/pages/plate/CreateWavePick'),
        name: '创建波次'
      },
      {
        path: '/picking/taskRule',
        component: () => import('@/pages/plate/TaskAllocation'),
        name: '任务分配规则'
      },
      {
        path: '/picking/history',
        component: () => import('@/pages/plate/CreatWaveMRecord'),
        name: '波次历史记录'
      },
      {
        path: '/picking/print',
        component: () => import('@/pages/plate/ManualPrint'),
        name: '手动打印'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '上货管理',
    icon: 'el-icon-service',
    children: [
      {
        path: '/binning/task',
        component: () => import('@/pages/plate/StopReceiveBinning'),
        name: '停止恢复接收任务'
      },
      {
        path: '/binning/batch',
        component: () => import('@/pages/plate/CreateWaveBinning'),
        name: '创建波次'
      },
      {
        path: '/binning/history',
        component: () => import('@/pages/plate/CreatWaveMRecordBinning'),
        name: '波次历史记录'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '调仓',
    icon: 'el-icon-service',
    children: [
      {
        path: '/reloc/task',
        component: () => import('@/pages/plate/reloc/StopReceiveReloc'),
        name: '停止恢复接收任务'
      },
      {
        path: '/reloc/batch',
        component: () => import('@/pages/plate/reloc/CreateWaveReloc'),
        name: '创建波次'
      },
      {
        path: '/reloc/history',
        component: () => import('@/pages/plate/reloc/CreatWaveMReloc'),
        name: '波次历史记录'
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '盘点',
    icon: 'el-icon-service',
    children: [
      {
        path: '/reloc_out/task',
        component: () => import('@/pages/plate/stock/StopReceiveStock'),
        name: '停止恢复接收任务'
      },
      {
        path: '/reloc_out/batch',
        component: () => import('@/pages/plate/stock/CreateWaveStock'),
        name: '创建波次'
      },
      {
        path: '/reloc_out/history',
        component: () => import('@/pages/plate/stock/CreatWaveMRecordStock'),
        name: '波次历史记录'
      }
    ]
  }
]
for (let i in routerlist) {
  console.log(i)
}

export default routes
