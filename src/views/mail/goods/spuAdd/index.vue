<template>
	<div class="card content-box">
		<el-steps style="width: 100%" :active="activeStep" finish-status="success">
			<el-step :title="stepTitle[0]" />
			<el-step :title="stepTitle[1]" />
			<el-step :title="stepTitle[2]" />
			<el-step :title="stepTitle[3]" />
			<el-step :title="stepTitle[4]" />
		</el-steps>
		<div class="form-box-parent">
			<div class="form-box">
				<div class="form-title">
					<span>{{ stepTitle[activeStep] }}</span>
				</div>
				<BasicInfo :basic-form="basicForm" ref="basicRef" v-if="activeStep === 0" />
				<Sales :category="basicForm.categroyTree" ref="salesRef" v-else-if="activeStep === 1" />
				<SkuInfo ref="" v-else-if="activeStep === 2" />
				<Specification ref="" v-else-if="activeStep === 3" />
				<div>
					<el-button @click="rollbackStepClick">上一步</el-button>
					<el-button @click="nextStepClick">下一步</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="dynamicForm">
import BasicInfo from "@/views/mail/goods/spuAdd/components/Basic.vue";
import Sales from "@/views/mail/goods/spuAdd/components/Sales.vue";
import SkuInfo from "@/views/mail/goods/spuAdd/components/SkuInfo.vue";
import Specification from "@/views/mail/goods/spuAdd/components/Specification.vue";
import { ref, reactive } from "vue";

const activeStep = ref<number>(0);

const basicForm = reactive({
	name: "",
	desc: "",
	categroyTree: {
		categroyId: null,
		categroyName: "",
		categroyText: ""
	},
	brand: "",
	weight: 0,
	species: 0,
	growthValue: 0,
	descImgs: [],
	goodsImgs: []
});

const stepTitle = ["基本信息", "规格参数", "销售属性", "SKU信息", "保存完成"];

const nextStepClick = () => {
	if (activeStep.value < 5) {
		activeStep.value = activeStep.value + 1;
	}
};

const rollbackStepClick = () => {
	if (activeStep.value > 0) {
		activeStep.value = activeStep.value - 1;
	}
};

const basicRef = ref();

const salesRef = ref();
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
