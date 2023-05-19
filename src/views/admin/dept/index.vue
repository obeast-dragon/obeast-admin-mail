<template>
	<div class="main-box">
		<div class="table-box">
			<ProTable
				ref="proTable"
				title="部门列表"
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
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="primary" link :icon="Delete" @click="deleteDeptById(scope.row)">删除</el-button>
				</template>
			</ProTable>
			<DeptDrawer ref="drawerRef" />
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
import DeptDrawer from "@/views/admin/dept/components/DeptDrawer.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { addDept, deleteDept, deptTree, updateDept } from "@/api/modules/admin/dept";
import { Department } from "@/api/interface/admin/dept";

const proTable = ref();

const initParam = reactive({});

const optionsParent = ref<any[]>([
	{
		id: "0",
		parentId: "-1",
		name: "根节点",
		label: "根节点",
		children: null
	}
]);

const getTableList = async (params: any) => {
     const apiDeptTree = await deptTree({
		deptName: params.deptName
	});
	optionsParent.value[0].children = apiDeptTree.data; 
	return apiDeptTree;
};

// 表格配置项
const columns: ColumnProps<Department.Res>[] = [
	{ type: "index", label: "#", width: 80 },
	{
		prop: "name",
		label: "部门名称",
		search: {
			el: "input"
		}
	},
	{ prop: "sortOrder", label: "排序" },
	{ prop: "createTime", label: "创建时间", width: 180 },
	{ prop: "operation", label: "操作", width: 300, fixed: "right" }
];

// 删除信息
const deleteDeptById = async (params: Department.Res) => {
	await useHandleData(deleteDept, { id: [params.id] }, `删除【${params.name}】部门`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof DeptDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Department.Res> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addDept : title === "编辑" ? updateDept : undefined,
		getTableList: proTable.value.getTableList,
		options: optionsParent
	};
	drawerRef.value?.acceptParams(params);
};
</script>
