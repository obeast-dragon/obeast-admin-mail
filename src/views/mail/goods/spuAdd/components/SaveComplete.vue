<template>
	<div>
		<el-button type="primary" @click="toSkuInfoList">商品列表</el-button>
		<el-button type="success" @click="addAgian">继续添加</el-button>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const originalForm = ref({
	stepTitle: ["基本信息", "规格参数", "销售属性", "SKU信息", "保存完成"],
	activeStep: 0,
	saleAttrs: [],
	memberLevels: [],
	tableAttrColumn: [],
	descImgsTemp: [], //商品详情
	goodsImgsTemp: [], //商品图集，最后sku也可以新增
	spu: {
		//要提交的数据
		spuName: "",
		spuDescription: "",
		categoryId: "",
		brandId: "",
		weight: 0,
		publishStatus: 0,
		descImgs: [], //商品详情
		goodsImgs: [], //商品图集，最后sku也可以新增
		bounds: {
			//积分
			buyBounds: 0,
			growBounds: 0
		},
		baseAttrs: [], //基本属性
		skus: []
	}
});

// 接收父组件参数并设置默认值
interface SaveCompleteProps {
	basicForm?: any;
	resetForm: () => void;
}
const props = withDefaults(defineProps<SaveCompleteProps>(), {});

const addAgian = () => {
	props.resetForm();
	props.basicForm.activeStep = 0;
};
const toSkuInfoList = () => {};
</script>

<style lang="scss" scoped></style>
