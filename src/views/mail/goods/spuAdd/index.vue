<template>
	<div class="card content-box">
		<el-steps style="width: 100%" :active="activeStep" finish-status="success">
			<el-step title="基本信息" />
			<el-step title="规格参数" />
			<el-step title="销售属性" />
			<el-step title="SKU信息" />
			<el-step title="保存完成" />
		</el-steps>
		<div class="form-box">
			<div class="form-title"></div>
			<BasicInfo />
			<el-button >下一步</el-button>
		</div>
	</div>
</template>

<script setup lang="ts" name="dynamicForm">
import type { FormInstance } from "element-plus";
// import { ElMessage } from "element-plus";
import BasicInfo from "@/views/mail/goods/spuAdd/components/Basic.vue";
import { ref } from "vue";

const activeStep = ref<number>(1);

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
