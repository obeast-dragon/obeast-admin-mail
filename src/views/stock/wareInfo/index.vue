<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="仓库列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteWareInfoById(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<WareInfoDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="wareProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import WareInfoDrawer from "@/views/stock/wareInfo/components/WareInfoDrawer.vue";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { wareInfoPages, addWareInfo, updateWareInfo, delWareInfo } from "@/api/modules/stock/wareInfo";
import { WareInfo } from "@/api/interface/stock/wareInfo";

const proTable = ref();

const initParam = reactive({ type: 1 });

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params: any) => {
	return wareInfoPages({
		size: params.pageSize,
		current: params.pageNum,
		name: params.name 
	});
};

// 表格配置项
const columns: ColumnProps<WareInfo.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	// 以下为后端字段
	{ prop: "id", label: "Id" },
	{
		prop: "name",
		label: "仓库名",
		search: {
			el: "input"
		}
	},
	{ prop: "address", label: "仓库地址" },
	{ prop: "areaCode", label: "区域编码" },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除仓库信息
const deleteWareInfoById = async (params: WareInfo.Entity) => {
	await useHandleData(delWareInfo, { id: [params.id] }, `删除【${params.name}】仓库`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof WareInfoDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<WareInfo.Entity> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addWareInfo : title === "编辑" ? updateWareInfo : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
