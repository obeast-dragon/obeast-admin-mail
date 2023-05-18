<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="日志列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template  #tableHeader="scope">
				<el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">
					批量删除
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteEntity(scope.row)">删除</el-button>
	
			</template>
		</ProTable>
		<LogDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import LogDrawer from "@/views/admin/log/components/LogDrawer.vue";
import { Delete, View } from "@element-plus/icons-vue";
import { getLogPages, deleteLog } from "@/api/modules/log";
import { Log } from "@/api/interface/log";

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
	return getLogPages({
		size: params.pageSize,
		current: params.pageNum
	});
};

// 表格配置项
const columns: ColumnProps<Log.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 100 },
	// 以下为后端字段
	{
		prop: "type",
		label: "类型",
		render: scope => {
			return (
				<>
					<el-tag type={scope.row.delFlag === "0" ? "" : "danger"}>{scope.row.delFlag === "0" ? "正常" : "失败"}</el-tag>
				</>
			);
		}
	},
	{ prop: "title", label: "标题" },
	{ prop: "remoteAddr", label: "IP地址" },
	{ prop: "method", label: "请求方式" },
	{ prop: "serviceId", label: "客户端" },
	{ prop: "createBy", label: "创建人" },
	{ prop: "createTime", label: "创建时间", sortable: true },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除日志信息
const deleteEntity = async (params: Log.Entity) => {
	await useHandleData(deleteLog, { id: [params.id] }, `删除【${params.id}】日志`);
	proTable.value.getTableList();
};

// 批量删除用户信息
const batchDelete = async (id: string[]) => {
	await useHandleData(deleteLog, { id }, "删除所选用户信息");
	proTable.value.clearSelection();
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof LogDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Log.Entity> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
