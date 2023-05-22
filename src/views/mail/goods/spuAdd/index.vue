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
				<BasicInfo />
				<div>
					<el-button @click="rollbackStepClick">上一步</el-button>
					<el-button @click="nextStepClick">下一步</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="dynamicForm">
import type { FormInstance } from "element-plus";
import BasicInfo from "@/views/mail/goods/spuAdd/components/Basic.vue";
import { ref } from "vue";

const activeStep = ref<number>(1);

const stepTitle = ["基本信息", "规格参数", "销售属性", "SKU信息", "保存完成"];

const nextStepClick = () => {
	if(activeStep.value < 5)activeStep.value = activeStep.value + 1;
};

const rollbackStepClick = () => {
	if(activeStep.value > 0)activeStep.value = activeStep.value - 1;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const submitForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	await formEl.validate((valid, fields) => {
		// if (valid) {
		// 	ElMessage.success("提交的数据为 : " + JSON.stringify(ruleForm));
		// } else {
		// 	console.log("error submit!", fields);
		// }
	});
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
