//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    identyItems: [
      {name: '消费者', value: 'customm'},
      {name: '企业', value: 'ent', checked: 'true'}
    ],
    sexItems: [
      {name: '男', value: 'man'},
      {name: '女', value: 'woman', checked: 'true'}
    ],
    checkboxItems: [
      {name: '报纸、电视广告', value: 'adv'},
      {name: '网络宣传', value: 'network', checked: 'true'},
      {name: '手机', value: 'phone'},
      {name: '饭店、超市、药店、保健品专卖店', value: 'supermarket'},
      {name: '他人推荐', value: 'other_pro'},
      {name: '其他', value: 'other'}
    ]
  },
  result_data:{
    identy: '',
    sex: '',
    from: '',
    telephone: '',
  },

  onLoad: function() {

  },

  identyRadioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const identyItems = this.data.identyItems
    this.result_data.identy = e.detail.value
    for (let i = 0, len = identyItems.length; i < len; ++i) {
      identyItems[i].checked = identyItems[i].value === e.detail.value
    }


  },


  sexRadioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.result_data.sex = e.detail.value
    const sexItems = this.data.sexItems
    for (let i = 0, len = sexItems.length; i < len; ++i) {
      sexItems[i].checked = sexItems[i].value === e.detail.value
    }


  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const checkboxItems = this.data.checkboxItems
    const values = e.detail.value
    
    console.log('携带value的length为：', values.length)
    for (let i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value === values[j]) {
          checkboxItems[i].checked = true
          break
        }
      }
    }
    this.result_data.from =e.detail.value


  },

  bindTelephoneInput: function (e) {
      this.result_data.telephone = e.detail.value
  },

  submit(e) 
  {
    const db = wx.cloud.database()
    db.collection('shaji').add({
      data: {
        answer: this.result_data
      },
      success(res) {
        console.log(res._id);
        wx.showModal({
          content: '已提交成功',
        })

      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    }) 

  }

})
