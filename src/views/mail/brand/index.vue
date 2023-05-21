<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="品牌列表"
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
				<el-button type="primary" link :icon="Delete" @click="remove(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<BrandDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import BrandDrawer from "@/views/mail/brand/components/BrandDrawer.vue";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { brandPages, addBrand, updateBrand, delBrand } from "@/api/modules/mail/brand";
import { Brand } from "@/api/interface/mail/brand";

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
	return brandPages({
		size: params.pageSize,
		current: params.pageNum,
		name: params.name === undefined ? "" : params.name
	});
};

// 表格配置项
const columns: ColumnProps<Brand.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 80 },
	// 以下为后端字段
	{
		prop: "name",
		label: "品牌名称",
		search: {
			el: "input"
		}
	},
	{
		prop: "logo",
		label: "品牌logo",
		render: scope => {
			return (
				<>
					<el-image  src={scope.row.logo} fit="cover" />
				</>
			);
		}
	},
	{ prop: "description", label: "品牌描述" },
	{
		prop: "showStatus",
		label: "显示",
		render: scope => {
			return (
				<>
					<el-tag type={scope.row.showStatus === 0 ? "" : "danger"}>{scope.row.showStatus === 0 ? "正常" : "禁用"}</el-tag>
				</>
			);
		}
	},
	{ prop: "firstLetter", label: "检索首字母" },
	{ prop: "sort", label: "品牌排序" },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除品牌信息
const remove = async (params: Brand.Entity) => {
	await useHandleData(delBrand, { id: [params.brandId] }, `删除【${params.name}】品牌`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof BrandDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Brand.Entity> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addBrand : title === "编辑" ? updateBrand : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
