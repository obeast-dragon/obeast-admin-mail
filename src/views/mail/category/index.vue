<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
	<div class="main-box">
		<div class="table-box">
			<el-table-v2
				:columns="columns"
				:data="data"
				:width="700"
				:expand-column-key="expandColumnKey"
				:height="400"
				fixed
			/>
		</div>
	</div>
</template>

<script setup lang="tsx" name="treeProTable">
import { Category } from "@/api/interface/mail/category";
import { categoryTree } from "@/api/modules/mail/category";
import { onMounted, ref } from "vue";

const expandColumnKey = 'id'

const data = ref<Category.Entity[]>([]);

onMounted(() => {
	getTableList();
});

const columns = [
	{
		key: "id",
		dataKey: "id", //需要渲染当前列的数据字段，如{id:9527,name:'Mike'}，则填id
		title: "id", //显示在单元格表头的文本
		width: 80, //当前列的宽度，必须设置
		fixed: true //是否固定列
	},
	{
		key: "name",
		dataKey: "name", //需要渲染当前列的数据字段，如{id:9527,name:'Mike'}，则填name
		title: "名称",
		width: 100,
		fixed: true
	},
	{
		key: "sort",
		dataKey: "sort",
		title: "排序",
		width: 120
	},
	{
		key: "icon",
		dataKey: "icon",
		title: "图标",
		width: 120
	},
	{
		key: "showStatus",
		dataKey: "showStatus",
		title: "状态",
		width: 120
	},
	{
		key: "handle",
		title: "操作",
		width: 100,
		align: "center",
		cellRenderer: () => (
			<>
				<el-button type="danger" icon="Delete" >
					删除
				</el-button>
			</>
		)
	}
];

const getTableList = async () => {
	const res = await categoryTree();
	data.value = res.data;
};
</script>
