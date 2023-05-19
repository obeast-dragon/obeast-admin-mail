<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="文件列表"
			:columns="columns"
			:requestApi="getTableList"
			:initParam="initParam"
			:dataCallback="dataCallback"
		>
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" :icon="CirclePlus" @click="openDialog('新增')">新增</el-button>
			</template>
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link :icon="View" @click="openDialog('查看', scope.row)">查看</el-button>
				<el-button type="primary" link :icon="Delete" @click="deleteFile(scope.row)">删除</el-button>
			</template>
		</ProTable>
		<FileDialog ref="dialogRef" />
	</div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import FileDialog from "@/views/admin/file/components/FileDialog.vue";
import { CirclePlus, Delete, View } from "@element-plus/icons-vue";
import { SysFile } from "@/api/interface//admin/file";
import { getFilePages, delFile, getFileUrl } from "@/api/modules/admin/file";

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
	return getFilePages({
		size: params.pageSize,
		current: params.pageNum,
		postName: params.postName === undefined ? "" : params.postName
	});
};

// 表格配置项
const columns: ColumnProps<SysFile.Entity>[] = [
	{ type: "selection", fixed: "left", width: 40 },
	{ type: "index", label: "#", width: 40 },
	// 以下为后端字段
	{ prop: "fileName", label: "文件名称" },
	{ prop: "bucketName", label: "桶名称" },
	{ prop: "original", label: "原文件名称" },
	{ prop: "type", label: "文件类型" },
	{
		prop: "fileSize",
		label: "文件大小(B)",
		render: scope => {
			return <>{`${scope.row.fileSize}`}</>;
		}
	},
	{ prop: "createTime", label: "创建时间", width: 180 },
	{ prop: "operation", label: "操作", fixed: "right", width: 220 }
];

// 删除岗位信息
const deleteFile = async (params: SysFile.Entity) => {
	await useHandleData(delFile, { id: [params.id] }, `删除【${params.original}】文件`);
	proTable.value.getTableList();
};

// 打开 dialog(新增、查看、编辑)
const dialogRef = ref<InstanceType<typeof FileDialog> | null>(null);
const openDialog = async (title: string, rowData: Partial<SysFile.Entity> = {}) => {
	let imgUrl = "";
	if (title === "查看") {
		const { data } = await getFileUrl(rowData);
		imgUrl = data;
	}
	const params = {
		title,
		isView: false,
		rowData: { ...rowData },
		getTableList: proTable.value.getTableList,
		imageUrl: imgUrl
	};
	dialogRef.value?.acceptParams(params);
};
</script>
