<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="商品库存列表"
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
				<el-button type="primary" link :icon="Delete" @click="deleteWareSkuById(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<WareSkuDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="wareProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import WareSkuDrawer from "@/views/stock/wareSku/components/WareSkuDrawer.vue";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { wareSkuPages, addWareSku, updateWareSku, delWareSku } from "@/api/modules/stock/wareSku";
import { wareInfoList } from "@/api/modules/stock/wareInfo";
import { WareSku } from "@/api/interface/stock/wareSku";
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
	return wareSkuPages({
		size: params.pageSize,
		current: params.pageNum,
		name: params.name
	});
};

const wareInfosRef = ref<WareInfo.Entity[]>([]);
const initWareInfoList = async () => {
 	const res = await wareInfoList();
	wareInfosRef.value = res.data;
	return res;
}

// 表格配置项
const columns: ColumnProps<WareSku.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	// 以下为后端字段
	{ prop: "id", label: "Id" },
	{
		prop: "skuId",
		label: "skuId",
		search: {
			el: "input"
		}
	},
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
	{ prop: "stock", label: "库存数量" },
	{ prop: "skuName", label: "skuName" },
	{ prop: "stockLocked", label: "锁定库存" },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除商品库存信息
const deleteWareSkuById = async (params: WareSku.Entity) => {
	await useHandleData(delWareSku, { id: [params.id] }, `删除【${params.skuName}】商品库存`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof WareSkuDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<WareSku.Entity> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addWareSku : title === "编辑" ? updateWareSku : undefined,
		getTableList: proTable.value.getTableList,
		wareInfos: wareInfosRef.value
	};
	drawerRef.value?.acceptParams(params);
};

</script>
