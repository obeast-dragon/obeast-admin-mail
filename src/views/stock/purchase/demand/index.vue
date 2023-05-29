<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="采购需求列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
				<el-dropdown style="margin-left: 10px;">
					<el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected">批量操作</el-button>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="batchDel">批量删除</el-dropdown-item>
							<el-dropdown-item @click="mergePuchase">合并整单</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="remove(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<DemandDrawer ref="drawerRef" />
		<DemandDialog ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="wareProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import DemandDrawer from "@/views/stock/purchase/demand/components/DemandDrawer.vue";
import DemandDialog from "@/views/stock/purchase/demand/components/DemandDialog.vue";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { wareInfoList } from "@/api/modules/stock/wareInfo";
import { demandPages, delDemand, updateDemand, addDemand } from "@/api/modules/stock/purchase";
import { WareInfo } from "@/api/interface/stock/wareInfo";
import { Purchase } from "@/api/interface/stock/purchase";

const proTable = ref();

const initParam = reactive({});

const statusRef = ref([
	{ label: "新建", value: "0" },
	{ label: "已分配", value: "1" },
	{ label: "正在采购", value: "2" },
	{ label: "已完成", value: "3" },
	{ label: "采购失败", value: "4" }
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
	return demandPages({
		size: params.pageSize,
		current: params.pageNum,
		wareId: params.wareId,
		status: params.status,
		skuId: params.skuId
	});
};

const wareInfosRef = ref<WareInfo.Entity[]>([]);
const initWareInfoList = async () => {
	const res = await wareInfoList();
	wareInfosRef.value = res.data;
	return res;
};

// 表格配置项
const columns: ColumnProps<Purchase.Demand>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	// 以下为后端字段
	{ prop: "id", label: "Id" },
	{ prop: "purchaseId", label: "采购单Id" },
	{
		prop: "skuId",
		label: "采购商品Id",
		search: {
			el: "input"
		}
	},
	{ prop: "skuNum", label: "采购数量" },
	{ prop: "skuPrice", label: "采购金额" },
	{
		prop: "wareId",
		label: "仓库Id",
		enum: initWareInfoList,
		search: {
			el: "select",
			props: { filterable: true }
		},
		fieldNames: { label: "name", value: "id" }
	},
	{
		prop: "status",
		label: "状态",
		enum: statusRef.value,
		search: {
			el: "select"
		},
		render: scope => {
			switch (scope.row.status) {
				case 0:
					return <el-tag type="">新建</el-tag>;
				case 1:
					return <el-tag type="">已分配</el-tag>;
				case 2:
					return <el-tag type="">正在采购</el-tag>;
				case 3:
					return <el-tag type="success">已完成</el-tag>;
				case 4:
					return <el-tag type="danger">采购失败</el-tag>;
			}
		}
	},
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除采购需求信息
const remove = async (params: Purchase.Demand) => {
	await useHandleData(delDemand, { id: [params.id] }, `删除【${params.id}】采购需求`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof DemandDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Purchase.Demand> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addDemand : title === "编辑" ? updateDemand : undefined,
		getTableList: proTable.value.getTableList,
		wareInfos: wareInfosRef.value
	};
	drawerRef.value?.acceptParams(params);
};

const batchDel = (rowData: Partial<Purchase.Demand> = {}) => {
	console.log(rowData);

}

const dialogRef = ref<InstanceType<typeof DemandDialog> | null>(null);
const mergePuchase = (rowData: Partial<Purchase.Demand> = {}) => {
	console.log(rowData);
	const params = {
		rowData: { ...rowData },
		getTableList: proTable.value.getTableList,
	};
	dialogRef.value?.acceptParams(params);
}
</script>
