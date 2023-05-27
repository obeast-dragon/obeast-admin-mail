<template>
	<el-table :data="props.basicForm.spu.skus" style="width: 100%" row-key="skuName">
		<el-table-column label="属性组合">
			<el-table-column :label="item.attrName" v-for="(item, index) in props.basicForm.tableAttrColumn" :key="item.attrId">
				<template #default="scope">
					<span style="margin-left: 10px">{{ scope.row.attr[index].attrValue }}</span>
				</template>
			</el-table-column>
		</el-table-column>
		<el-table-column label="商品名称" prop="skuName">
			<template #default="scope">
				<el-input v-model="scope.row.skuName"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="标题" prop="skuTitle">
			<template #default="scope">
				<el-input v-model="scope.row.skuTitle"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="副标题" prop="skuSubtitle">
			<template #default="scope">
				<el-input v-model="scope.row.skuSubtitle"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="价格" prop="price">
			<template #default="scope">
				<el-input v-model="scope.row.price"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="详情" width="80">
			<template #default="scope">
				<el-button type="primary" link :icon="Edit" @click="openDrawer(scope.$index, scope.row)">编辑</el-button>
			</template>
		</el-table-column>
	</el-table>
	<SkuInfoDrawer ref="drawerRef" />
	<div style="margin-top: 20px">
		<el-button type="primary" @click="rollbackStepClick">上一步</el-button>
		<el-button type="success" @click="nextStepClick">下一步</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import SkuInfoDrawer from "@/views/mail/goods/spuAdd/components/SkuInfoDrawer.vue";
import { saveSpuInfo } from "@/api/modules/mail/spuInfo";

// 接收父组件参数并设置默认值
interface SalesProps {
	basicForm?: any;
}
const props = withDefaults(defineProps<SalesProps>(), {});

const nextStepClick = () => {
	handleClose(async () => {
		console.log(props.basicForm.spu);
		await saveSpuInfo(props.basicForm.spu);
		props.basicForm.activeStep = 5;
	});
};

const handleClose = (done: () => void) => {
	ElMessageBox.confirm("保存需要一段时间，是否继续？", "提示", {
		type: "warning",
		confirmButtonText: "保存",
		cancelButtonText: "取消"
	})
		.then(() => {
			done();
		})
		.catch(() => {
			// catch error
		});
};

const rollbackStepClick = () => {
	resetFrom();
	props.basicForm.activeStep = props.basicForm.activeStep - 1;
};

const resetFrom = () => {
	props.basicForm.tableAttrColumn = [];
	props.basicForm.spu.skus = [];
};

// 打开 drawer
const drawerRef = ref<InstanceType<typeof SkuInfoDrawer> | null>(null);
const openDrawer = (rowIndex: number, rowData: Partial<any> = {}) => {
	const params = {
		rowData: { ...rowData },
		basicForm: props.basicForm,
		rowIndex: rowIndex
	};
	drawerRef.value?.acceptParams(params);
};
</script>

<style lang="scss" scoped></style>
