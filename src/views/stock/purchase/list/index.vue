<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="采购单列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
				<el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected">
					批量删除
				</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('分配', scope.row)">分配</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="deletePurchaseById(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<ListDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="wareProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import ListDrawer from "@/views/stock/purchase/list/components/ListDrawer.vue";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { purchasePages, delPurchase, updatePurchase, addPurchase } from "@/api/modules/stock/purchase";
import { Purchase } from "@/api/interface/stock/purchase";

const proTable = ref();

const initParam = reactive({ });

const statusRef = ref([
	{ label: "新建", value: "0" },
	{ label: "已分配", value: "1" },
	{ label: "已领取", value: "2" },
	{ label: "已完成", value: "3" },
	{ label: "有异常", value: "4" }
]);

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params: any) => {
	return purchasePages({
		size: params.pageSize,
		current: params.pageNum,
		name: params.name
	});
};

// 表格配置项
const columns: ColumnProps<Purchase.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	// 以下为后端字段
	{ prop: "id", label: "采购单Id" },
	{ prop: "assigneeId", label: "采购人Id" },
	{ prop: "assigneeName", label: "采购人名" },
	{ prop: "phone", label: "联系方式" },
	{ prop: "priority", label: "优先级" },
	{
		prop: "status",
		label: "状态",
		enum: statusRef.value,
		search: {
			el: "input"
		}
	},
	{ prop: "wareId", label: "仓库Id" },
	{ prop: "amount", label: "总金额" },
	{ prop: "createTime", label: "创建日期", width: 200  },
	{ prop: "updateTime", label: "创建日期", width: 200 },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除采购单信息
const deletePurchaseById = async (params: Purchase.Entity) => {
	await useHandleData(delPurchase, { id: [params.id] }, `删除【${params.assigneeName}】采购单`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof ListDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Purchase.Entity> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addPurchase : title === "编辑" ? updatePurchase : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};

</script>
