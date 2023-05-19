<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="岗位列表"
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
				<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
				<el-button type="primary" link :icon="Delete" @click="deletePostById(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<PostDrawer ref="drawerRef" />
		<ImportExcel ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import PostDrawer from "@/views/admin/post/components/PostDrawer.vue";
import { CirclePlus, Delete, View, EditPen } from "@element-plus/icons-vue";
import { addPost, getPostPages, updatePost, deletePost } from "@/api/modules/admin/post";
import { Post } from "@/api/interface/admin/post";

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
	return getPostPages({
		size: params.pageSize,
		current: params.pageNum,
		postName: params.postName === undefined ? "" : params.postName
	});
};

// 表格配置项
const columns: ColumnProps<Post.Res>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 40 },
	// 以下为后端字段
	{ prop: "postCode", label: "岗位编码" },
	{
		prop: "postName",
		label: "岗位名称",
		search: {
			el: "input"
		}
	},
	{ prop: "postSort", label: "岗位排序" },
	{ prop: "remark", label: "岗位描述" },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除岗位信息
const deletePostById = async (params: Post.Res) => {
	await useHandleData(deletePost, { id: [params.postId] }, `删除【${params.postName}】岗位`);
	proTable.value.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof PostDrawer> | null>(null);
const openDrawer = (title: string, rowData: Partial<Post.Res> = {}) => {
	const params = {
		title,
		isView: title === "查看",
		rowData: { ...rowData },
		api: title === "新增" ? addPost : title === "编辑" ? updatePost : undefined,
		getTableList: proTable.value.getTableList
	};
	drawerRef.value?.acceptParams(params);
};
</script>
