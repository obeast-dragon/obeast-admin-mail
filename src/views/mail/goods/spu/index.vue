<template>
	<div class="table-box">
		<ProTable ref="proTable" title="Spu列表" :columns="columns" :requestApi="getTableList" :dataCallback="dataCallback">
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button v-if="scope.row.publishStatus === 0" type="success" link :icon="ArrowUp" @click="publishStatus(1, scope.row)"
					>上架</el-button
				>
				<el-button v-else type="warning" link :icon="ArrowDown" @click="publishStatus(0, scope.row)">下架</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('规格', scope.row)">规格</el-button>
			</template>
		</ProTable>
		<SpuDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import ProTable from "@/components/ProTable/index.vue";
import SpuDrawer from "@/views/mail/goods/spu/components/SpuDrawer.vue";
import { EditPen, ArrowUp, ArrowDown } from "@element-plus/icons-vue";
import { SpuInfo } from "@/api/interface/mail/spuInfo";
import { spuInfoPages, updatePublishStatus, specification } from "@/api/modules/mail/spuInfo";
import { categoryTree } from "@/api/modules/mail/category";
import { brandList } from "@/api/modules/mail/brand";

const proTable = ref();

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params: any) => {
	return spuInfoPages({
		size: params.pageSize,
		current: params.pageNum,
		categoryId: params.categoryId,
		brandId: params.brandId,
		publishStatus: params.publishStatus,
		spuName: params.spuName
	});
};

// 表格配置项
const columns: ColumnProps<SpuInfo.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 80 },
	// 以下为后端字段
	{
		prop: "spuName",
		label: "商品名称",
		search: {
			el: "input"
		}
	},
	{
		prop: "spuDescription",
		label: "商品描述"
	},
	{
		prop: "categoryId",
		label: "所属分类Id",
		enum: categoryTree,
		search: {
			el: "cascader",
			props: { props: { emitPath: false } }
		},
		fieldNames: { label: "name", value: "id" },
		render: scope => <>{scope.row.categoryId}</>
	},
	{
		prop: "brandId",
		label: "所属品牌Id",
		enum: brandList,
		search: {
			el: "select",
			props: { filterable: true, emitPath: false }
		},
		fieldNames: { label: "name", value: "brandId" },
		render: scope => <>{scope.row.brandId}</>
	},
	{ prop: "weight", label: "重量", render: scope => <>{`${scope.row.weight} kg`}</> },
	{
		prop: "publishStatus",
		label: "上架状态",
		search: {
			el: "input"
		},
		render: scope => {
			switch (scope.row.publishStatus) {
				case 0:
					return <el-tag type="info">下架</el-tag>;
				case 1:
					return <el-tag type="success">上架</el-tag>;
			}
		}
	},
	{ prop: "createTime", label: "创建时间", width: 180 },
	{ prop: "updateTime", label: "更新时间", width: 180 },
	{ prop: "operation", label: "操作", fixed: "right", width: 200 }
];

const publishStatus = async (status: number, rowData: Partial<SpuInfo.Entity> = {}) => {
	await updatePublishStatus(status, rowData.id);
	proTable.value.getTableList();
}

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof SpuDrawer> | null>(null);
const openDrawer = async (title: string, rowData: Partial<SpuInfo.Entity> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		api: title === "规格" ? specification :  undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
