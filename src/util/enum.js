function EnumSelect() {
  let EnumObj = {}
  EnumObj = {
    openStatus: [
      {
        label: '开启',
        value: true
      },
      {
        label: '禁用',
        value: false
      }
    ],
    openStatus2: [
      {
        label: '开启',
        value: '1'
      },
      {
        label: '禁用',
        value: '0'
      }
    ],
    WS_STATUS: [
      {
        label: 'INACTIVE',
        value: 10
      },
      {
        label: 'ACTIVE',
        value: 20
      }
    ],
    KM_KID_TASK_TYPE: [
      {
        label: '待命/STANDBY',
        value: 1
      },
      {
        label: '移动/SIMPLE_MOVE',
        value: 2
      },
      {
        label: '负载移动/LOAD_MOVE',
        value: 3
      },
      {
        label: '充电/CHARGE',
        value: 4
      },
      {
        label: '退出/QUIT',
        value: 5
      }
    ],
    KM_KID_TASK_STATUS: [
      {
        label: '新建/NEW',
        value: 1
      },
      {
        label: '已分配/ASSIGNED',
        value: 2
      },
      {
        label: '已接受/ACCEPTED',
        value: 3
      },
      {
        label: '已拒绝/REJECTED',
        value: 4
      },
      {
        label: '运行中/EXECUTING',
        value: 5
      },
      {
        label: '完成/COMPLETED',
        value: 6
      },
      {
        label: '已抓取/PULLED',
        value: 98
      },
      {
        label: '失败/FAILED',
        value: 99
      }
    ],
    KID_BATTERY_FAULT_CODE: [
      {
        label: '向下摄像头解码失败',
        value: 1
      },
      {
        label: '向上摄像头解码失败',
        value: 2
      },
      {
        label: '左轮电机报警',
        value: 3
      },
      {
        label: '右轮电机报警',
        value: 4
      },
      {
        label: '旋转电机报警',
        value: 5
      },
      {
        label: '电机通讯失败',
        value: 6
      },
      {
        label: '举升失败',
        value: 7
      },
      {
        label: '下降失败',
        value: 8
      },
      {
        label: '归零失败',
        value: 9
      },
      {
        label: '空车时检测到前方有障碍物',
        value: 10
      },
      {
        label: '载重时检测到前方有障碍物',
        value: 11
      },
      {
        label: '电机计数器错误',
        value: 12
      }
    ],
    KM_KID_STATUS: [
      {
        label: '已注册/REGISTERED',
        value: 1
      },
      {
        label: '待命/STANDBY',
        value: 2
      },
      {
        label: '任务已分配/TASK_ASSIGNED',
        value: 3
      },
      {
        label: '任务执行中/TASK_EXECUTING',
        value: 4
      },
      {
        label: '充电中/CHARGING',
        value: 5
      },
      {
        label: '充电完成/COMPL_CHARGE',
        value: 6
      },
      {
        label: 'SERVER重启',
        value: 90
      },
      {
        label: '维修中/MAINTAINING',
        value: 98
      },
      {
        label: '断线/OFFLINE',
        value: 99
      }
    ],
    TM_MOVE_TASK_RELEASE_LOAD: [
      {
        label: '放下',
        value: 1
      },
      {
        label: '举升',
        value: 2
      }
    ]
  }
  return EnumObj
}

export default EnumSelect
