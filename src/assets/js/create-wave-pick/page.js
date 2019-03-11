Vue.directive('sort', {
    bind: function (el, binding, vnode) {
        //console.log('row-sort directive', "vnode", vnode, 'context', vnode.context );
        var formGroupIndex;
        var startIndex;
        var distGroupIndex;
        var stopIndex;
        $(el).sortable({
            // greedy: true,
            cursor: "move",
            connectWith: ".sortable",
            start: function (event, ui) {
                startIndex = $(ui.item).index();
            },
            stop: function (event, ui) {

                stopIndex = $(ui.item).index();
                formGroupIndex = +$(ui.item).data('from');
                distGroupIndex = +$(ui.item).siblings().eq(0).data('from');
                console.log('befor', vnode.context.dialogTableData[formGroupIndex].result, vnode.context.dialogTableData[distGroupIndex].result);
                var dragItem = vnode.context.dialogTableData[formGroupIndex].result.splice(startIndex, 1);
                vnode.context.dialogTableData[distGroupIndex].result.splice(stopIndex, 0, dragItem[0])
                console.log('after', vnode.context.dialogTableData[formGroupIndex].result, vnode.context.dialogTableData[distGroupIndex].result);
            }
        });

    }
});

new Vue({
    el: '#app',
    data: function () {
        return {
            // 查询参数
            search: {
                type: 's',
                isp: '',
                ict: '',
                currentPage: 1
            },
            isShowDialog: false,
            totalRows: -1,
            pageSize: -1,
            tableData: [],
            dialogTableData: [],
            multipleSelection: [],
            dialog: {
                systemReason: '',
                manualReason: ''
            },
            id: '', //点提交后服务器分配的id
            isShowInnerConfirmDialog: false,
            isShowOkDialog: false
        }
    },
    created: function () {
        this.getTableData();
    },
    mounted: function () {},
    methods: {
        // 弹层上操作
        showConfirmDialog: function(){
            this.isShowInnerConfirmDialog= true;
        },
        confirmReject: function () {
            $.ajax({
                url: globalApi.confirmReject,
                type:'get',
                data: $.extend(this.dialog, {
                    id: this.id
                }),
                dataType: 'json',
                type: 'get'
            }).always((r) => {
                if (r.data.result == true) {
                    //弹出层
                    this.isShowInnerConfirmDialog = false
                }
            });

        },
        confirmAssign: function () {
            const data = {};
            $.extend(data, this.dialog);
            data.result = this.dialogTableData;
            $.ajax({
                url: globalApi.confirmAssign,
                type:　'post',
                data: JSON.stringify({
                    data: data
                }),
                contentType: 'application/json',
                dataType: 'json',
                type: 'get'
            }).always((r) => {
                if (r.data.result == true) {
                    // 弹出层 分配成功
                    this.isShowOkDialog = true;
                }
            });

        },
        submit: function () {
            console.log('this.multipleSelection', this.multipleSelection);
            $.ajax({
                url: globalApi.submit,
                type:'post',
                data: JSON.stringify(this.multipleSelection),
                contentType: 'application/json',
                dataType: 'json',
                type: 'get'
            }).always((r) => {
                this.dialogTableData = r.data.result;
                this.id = r.data.id;
                this.isShowDialog = true;
            });
        },
        confirm: function () {
            this.search.currentPage = 1;
            this.getTableData();
        },
        cancel: function () {
            this.$refs.multipleTable.clearSelection();
        },
        handleTabClick: function (tab, event) {
            this.initParams();
            this.getTableData();
        },
        initParams() {
            this.search.ict = '';
            this.search.isp = '';
            this.search.currentPage = 1;
        },
        getTableData: function () {
            $.ajax({
                url: globalApi.getTable,
                data: this.search,
                dataType: 'json',
                type: 'get'
            }).always((r) => {
                if (r.status == 0) {
                    this.tableData = r.data;
                    this.totalRows = r.totalRows;
                    this.pageSize = r.pageSize;
                }
            });
        },
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
        },
        handleCurrentChange(val) {
            this.search.currentPage = val;
            this.getTableData();
        }
    }
});