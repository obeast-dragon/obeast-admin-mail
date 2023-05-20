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
			:rowHeight="100"
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
import { categoryTree, addCategory, updateCategory, delCategory } from "@/api/modules/mail/category";
import { reactive, ref } from "vue";
import { CirclePlus } from "@element-plus/icons-vue";
import { TableV2FixedDir } from "element-plus";
import CategoryDrawer from "@/views/mail/category/components/CategoryDrawer.vue";
import ProTableV2 from "@/components/ProTableV2/index.vue";
import type { Column } from "element-plus";
import { Category } from "@/api/interface/mail/category";
import { useHandleData } from "@/hooks/useHandleData";

const proTableV2 = ref();

const initParam = reactive({});

const optionsCategory = ref<any[]>([
	{
		id: "-1",
		parentId: "-2",
		name: "根节点",
		label: "根节点",
		children: null
	}
]);

const getTableList = async (params: any) => {
	const res = await categoryTree(params);
	optionsCategory.value[0].children = res.data;
	return res;
};

const columns: Column<any>[] = [
	{
		key: "id",
		dataKey: "id",
		title: "#",
		align: "center",
		width: 120,
		hidden: true
	},
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
		cellRenderer: (data: any) => (
			<>
				{data.rowData.icon ? (
					<el-image style="width: 80px; height: 80px" src={data.rowData.icon} fit="cover" />
				) : (
					<div style="width: 80px; height: 80px"></div>
				)}
			</>
		),
		width: 300
	},
	{
		key: "showStatus",
		dataKey: "showStatus",
		align: "center",
		title: "显示",
		width: 120,
		cellRenderer: (data: any) => (
			<>
				<el-tag type={data.rowData.showStatus === 0 ? "success" : "danger"}>{data.rowData.showStatus === 0 ? "正常" : "禁用"}</el-tag>
			</>
		),
	},
	{
		key: "handle",
		title: "操作",
		width: 300,
		align: "center",
		cellRenderer: (data: any) => (
			<>
				<el-button type="primary" link icon="View" onClick={openDrawer.bind(this, "查看", data)}>
					查看
				</el-button>
				<el-button type="primary" link icon="EditPen" onClick={openDrawer.bind(this, "编辑", data)}>
					编辑
				</el-button>
				<el-button type="primary" link icon="Delete" onClick={remove.bind(this, data)}>
					删除
				</el-button>
			</>
		),
		fixed: TableV2FixedDir.RIGHT
	}
];

const remove = async (props: { rowData: Category.Entity}) => {
	await useHandleData(delCategory, { id: [props.rowData.id] }, `删除【${props.rowData.name}】商品分类`);
	proTableV2.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof CategoryDrawer> | null>(null);
const openDrawer = (title: string, props?: any) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: title === "新增" ? {} : { ...props.rowData },
		api: title === "新增" ? addCategory : title === "编辑" ? updateCategory : undefined,
		getTableList: proTableV2.value.getTableList,
		options: optionsCategory
	};
	drawerRef.value?.acceptParams(params);
};
</script>
