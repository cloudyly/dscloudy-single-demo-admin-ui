<script>
export default {
  name: 'base-dialog',
  data () {
    return {
      dialogVisible: false,
      data: null,
      confirmCallBack: null,
      cancelCallBack: null
    }
  },
  methods: {
    onBtnConfirmClick () {
      if (this.confirmCallBack && (typeof this.confirmCallBack === 'function')) {
        this.confirmCallBack(this.data)
      }
      this.dialogVisible = false
    },
    onBtnCancelClick () {
      if (this.cancelCallBack && (typeof this.cancelCallBack === 'function')) {
        this.cancelCallBack(this.data)
      }
      this.dialogVisible = false
    },
    show (data, confirmFun, cancelFun) {
      this.data = data
      this.confirmCallBack = confirmFun
      this.cancelCallBack = cancelFun
      console.log(this.data)
      console.log(this.confirmCallBack)
      console.log(this.cancelCallBack)
      this.dialogVisible = true
    }
  }
}
</script>
