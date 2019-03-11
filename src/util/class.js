function newAdd() {
  let obj = {}
  obj = {
    objsz: {
      orderWaveId: null, // 规则id
      createdBy: null, // 描述
      itfSentFlag: null, // 订单类型
      orderWaveNum: null, // isp
      orderWaveStatus: null, // ict
      workstation: null, // 工作站模式
      merchantId: null, // 算法
      onOff: '0'
    },
    cn: {
      itfSentFlag_cn: null, // 订单类型中文
      orderWaveNum_cn: null, // isp中文
      orderWaveStatus_cn: null, // ict中文
      workstation_cn: null, // 工作站模式中文
      merchantId_cn: null// 算法中文
    },
    list: {
      list_num3: [
        {
          label: 'S',
          value: 'S'
        },
        {
          label: 'V',
          value: 'V'
        }
      ],
      list_num4: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      list_num5: [
        {
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      list_num6: [
        {
          label: '大',
          value: '20'
        },
        {
          label: '小',
          value: '10'
        }
      ],
      list_num7: [
        {
          label: 'MD5',
          value: '10'
        },
        {
          label: 'SHAR',
          value: '20'
        },
        {
          label: 'DIAG',
          value: '30'
        }
      ]
    }
  }
  return obj
}

export default newAdd
