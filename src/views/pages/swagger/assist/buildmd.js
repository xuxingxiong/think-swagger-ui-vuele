export default {
  data() {
    return {
    }
  },
  methods: {
    buildMd: function() {
      let arrMds = []

      const reqMethod = this.menuInfo.reqMethod[this.activeName] || {}
      arrMds.push('# ' + reqMethod.summary)
      arrMds.push('## 请求头')
      arrMds.push('| 名称 | 描述 |')
      arrMds.push('| --- | --- |')
      arrMds.push('| 请求地址 | ' + this.methodForm.requestPath + ' |')
      arrMds.push('| 请求方式 | ' + this.activeName + ' |')
      arrMds.push('| 响应Content-Type | ' + this.methodForm.contentType + ' |\r\n')
      arrMds.push('## 请求参数')
      if (this.isPostJson) {
        arrMds.push('```')
        arrMds.push(JSON.stringify(JSON.parse(this.parameters[0].value), null, '\t'))
        arrMds.push('```')
      } else {
        arrMds.push('| 名称 | 描述 | 是否必填 | 参数类型 | 数据类型 |')
        arrMds.push('| --- | --- | --- | --- | --- |')
        this.parameters.forEach(item => {
          arrMds.push('| ' + item.name + ' | ' + (item.description || '') + ' | ' + item.required + ' | ' + item.in + ' | ' + item.type + ' |')
        })
      }

      arrMds.push('\r\n## 响应参数')
      if (this.responseResult) {
        try {
          arrMds.push('```')
          arrMds.push(JSON.stringify(this.responseResult, null, '  '))
          arrMds.push('```')
        } catch (err) {
          console.log(err)
        }
      }
      return arrMds.join('\r\n')
    }
  }
}
