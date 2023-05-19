<template>
	<div class="main-box">
		<div class="table-box">
			<ProTable
				ref="proTable"
				title="菜单管理"
				rowKey="id"
				:indent="30"
				:columns="columns"
				:requestApi="getTableList"
				:initParam="initParam"
				:pagination="false"
				:searchCol="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
				</template>
				<template #icon="scope">
					<el-icon :v-if="scope.row.icon !== null && scope.row.icon !== undefined" :size="50">
						<component :is="scope.row.icon"></component>
					</el-icon>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="primary" link :icon="Delete" @click="deleteMenuById(scope.row)">删除</el-button>
				</template>
			</ProTable>
			<MenuDrawer ref="drawerRef" />
			<ImportExcel ref="dialogRef" />
		</div>
	</div>
</template>

<script setup lang="tsx" name="treeProTable">
import { reactive, ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import MenuDrawer from "@/views/admin/menu/components/MenuDrawer.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { updateMenu, delMenu, menuTree, addMenu } from "@/api/modules/admin/menu";
import { Menu } from "@/api/interface/admin/menu";

const proTable = ref();

const initParam = reactive({});

const optionsParent = ref<any[]>([
	{
		id: "-1",
		parentId: "-2",
		name: "根节点",
		label: "根节点",
		children: null
	}
]);

const getTableList = async (params: any) => {
	const apiMenuTree = await menuTree({
		lazy: false,
		menuName: params.name
	});
	optionsParent.value[0].children = apiMenuTree.data; 
	return apiMenuTree;
};

// 表格配置项
const columns: ColumnProps<Menu.Res>[] = [
	{
		prop: "name",
		label: "菜单名称",
		search: {
			el: "input"
		}
	},
	{ prop: "sortOrder", label: "排序" },
	{
		prop: "icon",
		label: "图标"
	},
	{ prop: "path", label: "路由" },
	{ prop: "keepAlive", label: "缓存" },
	{
		prop: "type",
		label: "类型",
		render: scope => {
			return (
				<>
					<el-tag type={scope.row.type === "0" ? "" : "success"}>{scope.row.type === "0" ? "菜单" : "按钮"}</el-tag>
				</>
			);
		}
	},
	{ prop: "permission", label: "权限标识" },
	{ prop: "operation", label: "操作", width: 300, fixed: "right" }
];

// 删除信息
const deleteMenuById = async (params: Menu.Res) => {
	await useHandleData(delMenu, params.menuId, `删除【${params.name}】菜单`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof MenuDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Menu.Res> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addMenu : title === "编辑" ? updateMenu : undefined,
		getTableList: proTable.value.getTableList,
		options: optionsParent
	};
	drawerRef.value?.acceptParams(params);
};
</script>
