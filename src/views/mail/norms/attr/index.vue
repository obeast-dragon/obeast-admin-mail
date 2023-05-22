<template>
	<div class="table-box">
		<div class="card mb10 pt0 pb0">
			<SelectFilter :data="selectFilterData" :defaultValues="selectFilterValues" @change="changeSelectFilter" />
		</div>
		<ProTable
			ref="proTable"
			title="规格属性列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="selectFilterValues"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="remove(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<AttrDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="AttrProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import AttrDrawer from "@/views/mail/attr/components/AttrDrawer.vue";
import { CirclePlus, Delete, View, EditPen } from "@element-plus/icons-vue";
import { attrPages, addAttr, updateAttr, delAttr } from "@/api/modules/mail/attr";
import { MailAttr } from "@/api/interface/mail/attr";
import SelectFilter from "@/components/SelectFilter/index.vue";

const proTable = ref();

const selectFilterValues = ref({ valueType: -1 });

const selectFilterData = reactive([
	{
		title: "规格类型",
		key: "valueType",
		options: [
			{
				label: "全部",
				value: -1
			},
			{
				label: "规格参数",
				value: 0
			},
			{
				label: "销售属性",
				value: 1
			}
		]
	}
]);

const changeSelectFilter = (value: typeof selectFilterValues.value) => {
	proTable.value.pageable.pageNum = 1;
	selectFilterValues.value.valueType = value.valueType;
};

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params?: any) => {
	return attrPages({
		size: params.pageSize,
		current: params.pageNum,
		attrName: params.attrName === undefined ? "" : params.attrName,
		valueType: params.valueType
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
		render: scope => {
			return (
				<>
					<el-tag type={scope.row.enable === 0 ? "success" : "danger"}>{scope.row.enable === 0 ? "正常" : "禁用"}</el-tag>
				</>
			);
		},
		width: 80
	},
	{ prop: "sort", label: "排序", width: 80 },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除规格属性信息
const remove = async (params: MailAttr.Entity) => {
	await useHandleData(delAttr, { id: [params.attrId] }, `删除【${params.attrName}】规格属性`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof AttrDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<MailAttr.Entity> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addAttr : title === "编辑" ? updateAttr : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
