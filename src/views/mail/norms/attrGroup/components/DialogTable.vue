<template>
	<el-dialog v-model="dialogVisible" title="规格属性分组列表" width="50%">
		<ProTable
			ref="proTable"
			title="规格属性分组列表"
			rowKey="id"
			:columns="columns"
			:requestApi="getTableList"
			:requestAuto="true"
			:initParam="initParam"
			:dataCallback="dataCallback"
			:searchCol="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
			:showPrintJS="false"
		/>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="submitClick"> 确定 </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="tsx" name="treeProTable">
import { reactive, ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import { attrPages } from "@/api/modules/mail/attr";
import { MailAttr } from "@/api/interface/mail/attr";

const proTable = ref();

const initParam = reactive({});

const dialogVisible = ref<boolean>(false);

interface DialogProps {
	attrGroupId: number;
	api?: (params: any) => Promise<any>;
	getTableList?: () => void;
}

const dialogProps = ref<DialogProps>({
	attrGroupId: null
});

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params: any) => {
	return attrPages({
		size: params.pageSize,
		current: params.pageNum,
		catelogId: params.catelogId,
		attrName: params.attrName === undefined ? "" : params.attrName
	});
};

// 表格配置项
const columns: ColumnProps<MailAttr.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 80 },
	// 以下为后端字段
	{
		prop: "attrName",
		label: "规格名称",
		search: {
			el: "input"
		},
		width: 200
	},
	{
		prop: "valueSelect",
		label: "可选值列表",
		render: scope => {
			return (
				<>
					{scope.row.valueSelect
						? scope.row.valueSelect.split(";").map(item => {
								return <el-tag type="">{item}</el-tag>;
						  })
						: "--"}
				</>
			);
		}
	},
	{
		prop: "enable",
		label: "显示",
		isShow: false,
		render: scope => {
			return (
				<>
					<el-tag type={scope.row.enable === 0 ? "success" : "danger"}>{scope.row.enable === 0 ? "正常" : "禁用"}</el-tag>
				</>
			);
		},
		width: 80
	},
	{ prop: "sort", label: "排序", width: 80 }
];
const acceptDialogParams = (params: any) => {
	dialogProps.value = params;
	dialogVisible.value = true;
};

interface EmitType {
	(e: "selectListParams", params: MailAttr.Entity[]): void;
}
const emit = defineEmits<EmitType>();
const submitClick = () => {
	if (proTable.value.isSelected) {
		emit("selectListParams", proTable.value.selectedList);
	}
	dialogVisible.value = false;
	proTable.value.element.clearSelection();
};

defineExpose({
	acceptDialogParams
});
</script>
