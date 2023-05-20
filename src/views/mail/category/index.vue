<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
	<div class="table-box">
		<ProTableV2
			ref="proTableV2"
			title="岗位列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:pagination="false"
			row-key="name"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
			</template>
		</ProTableV2>
		<CategoryDrawer ref="drawerRef" />
	</div>
</template>

<script setup lang="tsx" name="treeProTable">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Category } from "@/api/interface/mail/category";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { categoryTree, addCategory, updateCategory, delCategory } from "@/api/modules/mail/category";
import { reactive, ref } from "vue";
import { CirclePlus } from "@element-plus/icons-vue";
import { TableV2FixedDir } from "element-plus";
import CategoryDrawer from "@/views/mail/category/components/CategoryDrawer.vue";
import ProTableV2 from "@/components/ProTableV2/index.vue";
import type { Column } from "element-plus";

const proTableV2 = ref();

const initParam = reactive({});

const getTableList = (params: any) => {
	return categoryTree(params);
};

const columns: Column<any>[] = [
	{
		key: "name",
		dataKey: "name",
		title: "名称",
		align: "center",
		width: 500,
		label: "名称",
		prop: "name",
		search: {
			el: "input"
		}
	},
	{
		key: "sort",
		dataKey: "sort",
		title: "排序",
		align: "center",
		width: 120
	},
	{
		key: "icon",
		dataKey: "icon",
		title: "图标",
		align: "center",
		width: 300
	},
	{
		key: "showStatus",
		dataKey: "showStatus",
		align: "center",
		title: "状态",
		width: 120
	},
	{
		key: "handle",
		title: "操作",
		width: 300,
		align: "center",
		cellRenderer: () => (
			<>
				<el-button type="primary" link icon="View" onClick={openDrawer.bind(this, "查看")} >
					查看
				</el-button>
				<el-button type="primary" link icon="EditPen" onClick={openDrawer.bind(this, "编辑")}>
					编辑
				</el-button>
				<el-button type="primary" link icon="Delete" onClick={openDrawer.bind(this, "删除")}>
					删除
				</el-button>
			</>
		),
		fixed: TableV2FixedDir.RIGHT
	}
];

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof CategoryDrawer> | null>(null);
const openDrawer = (title: string, props?: any) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...props.rowData },
		api: title === "新增" ? addCategory : title === "编辑" ? updateCategory : undefined,
		getTableList: proTableV2.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
