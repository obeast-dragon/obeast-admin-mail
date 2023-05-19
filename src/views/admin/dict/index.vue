<template>
	<div class="main-box">
		<DictSelect
			label="description"
			title="字典列表(单选)"
			:data="dictSelectData"
			:defaultValue="initParam"
			@change="changeTreeFilter"
		/>
		<div class="table-box" style="width: calc(100% - 280px)">
			<ProTable
				ref="proTable"
				title="字典项列表"
				rowKey="id"
				:indent="30"
				:columns="columns"
				:requestApi="getTableList"
				:requestAuto="false"
				:initParam="initParam"
				:dataCallback="dataCallback"
				:searchCol="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
			>
				<!-- 表格 header 按钮 -->
				<template #tableHeader>
					<el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增</el-button>
					<el-button type="danger" :icon="Delete" plain> 删除 </el-button>
				</template>
				<!-- 表格操作 -->
				<template #operation="scope">
					<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
					<el-button type="danger" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
				</template>
			</ProTable>
			<DictDrawer ref="drawerRef" />
			<ImportExcel ref="dialogRef" />
		</div>
	</div>
</template>

<script setup lang="tsx" name="treeProTable">
import { onMounted, reactive, ref } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import DictSelect from "@/views/admin/dict/components/DictSelect/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import DictDrawer from "@/views/admin/dict/components/DictDrawer.vue";
import { CirclePlus, Delete, EditPen } from "@element-plus/icons-vue";
import { getDictItemPages, getDictList } from "@/api/modules/admin/dict";
import { SysDict, SysDictItem } from "@/api/interface/admin/dict";
import { addUser, deleteUser, updateUser } from "@/api/modules/admin/user";

const proTable = ref();

const initParam = reactive({ dictId: ""});

const dictSelectData = ref<SysDict.Entity[]>([]);

const dataCallback = (data: any) => {
	return {
		list: data.records,
		total: data.total,
		pageNum: data.current,
		pageSize: data.size
	};
};

const getTableList = (params: any) => {
	return getDictItemPages({
		size: params.pageSize,
		current: params.pageNum,
		dictId: params.dictId,
	});
};

/**
 * 树形筛选切换
 * @param val
 */
const changeTreeFilter = (val: any) => {
	proTable.value.pageable.pageNum = 1;
	initParam.dictId = val;
};

/**
 * 部门树初始化
 */
const getDictSelect = async () => {
	const { data } = await getDictList({});
	dictSelectData.value = data;
	initParam.dictId = null;
};

// 表格配置项
const columns: ColumnProps<SysDictItem.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 40 },
	{ prop: "dictKey", label: "类型" },
	{ prop: "value", label: "数据值" },
	{ prop: "label", label: "标签名" },
	{ prop: "description", label: "描述" },
	{ prop: "sortOrder", label: "排序" },
	{ prop: "remarks", label: "备注" },
	{ prop: "createTime", label: "创建时间", width: 180 },
	{ prop: "operation", label: "操作", width: 150, fixed: "right" }
];

// 删除用户信息
const deleteAccount = async (params: SysDictItem.Entity) => {
	await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.label}】字典`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof DictDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<SysDictItem.Entity> = {}) => {
	const params = {
		title,
		rowData: { ...rowData },
		isView: title === "查看",
		api: title === "新增" ? addUser : title === "编辑" ? updateUser : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};

onMounted(() => {
	getDictSelect();
});
</script>
