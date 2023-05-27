<template>
	<div class="card content-box">
		<el-steps style="width: 100%" :active="basicForm.activeStep" finish-status="success">
			<el-step :title="basicForm.stepTitle[0]" />
			<el-step :title="basicForm.stepTitle[1]" />
			<el-step :title="basicForm.stepTitle[2]" />
			<el-step :title="basicForm.stepTitle[3]" />
			<el-step :title="basicForm.stepTitle[4]" />
		</el-steps>
		<div class="form-box-parent">
			<div class="form-box">
				<div class="form-title">
					<span v-if="basicForm.activeStep <= 4" style="font-size: 28px; font-weight: bolder">{{ basicForm.stepTitle[basicForm.activeStep] }}</span>
					<span v-else style="font-size: 28px; font-weight: bolder">{{ basicForm.stepTitle[basicForm.activeStep - 1] }}</span>
				</div>
				<BasicInfo :basic-form="basicForm" v-if="basicForm.activeStep === 0" />
				<Specification :basic-form="basicForm" v-else-if="basicForm.activeStep === 1" />
				<Sales :basic-form="basicForm" v-else-if="basicForm.activeStep === 2" />
				<SkuInfo :basic-form="basicForm" v-else-if="basicForm.activeStep === 3" />
				<SaveComplete :reset-form="resetForm" :basic-form="basicForm" v-else-if="basicForm.activeStep === 5" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="dynamicForm">
import BasicInfo from "@/views/mail/goods/spuAdd/components/Basic.vue";
import Specification from "@/views/mail/goods/spuAdd/components/Specification.vue";
import SkuInfo from "@/views/mail/goods/spuAdd/components/SkuInfo.vue";
import Sales from "@/views/mail/goods/spuAdd/components/Sales.vue";
import SaveComplete from "@/views/mail/goods/spuAdd/components/SaveComplete.vue";
import { memberLevelList } from "@/api/modules/vip/memberLevel";
import { reactive, onMounted } from "vue";

const initForm = () => {
	return {
		stepTitle: ["基本信息", "规格参数", "销售属性", "SKU信息", "保存完成"],
		activeStep: 0,
		saleAttrs: [] as any[],
		memberLevels: [] as any[],
		tableAttrColumn: [] as any[],
		descImgsTemp: [] as any[], //商品详情
		goodsImgsTemp: [] as any[], //商品图集，最后sku也可以新增
		spu: {
			//要提交的数据
			spuName: "",
			spuDescription: "",
			categoryId: "",
			brandId: "",
			weight: 0,
			publishStatus: 0,
			descImgs: [] as any[], //商品详情
			goodsImgs: [] as any[], //商品图集，最后sku也可以新增
			bounds: {
				//积分
				buyBounds: 0,
				growBounds: 0
			},
			baseAttrs: [] as any[], //基本属性
			skus: [] as any[]
		}
	};
};

const basicForm = reactive(initForm());

const resetForm = () => {
	Object.assign(basicForm, initForm());
};

const initMemberLevels = async () => {
	const { data } = await memberLevelList();
	basicForm.memberLevels = data;
};
onMounted(() => {
	initMemberLevels();
	resetForm();
});
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
