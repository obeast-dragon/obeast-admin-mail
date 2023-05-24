<template>
	<div class="sales-main">
		<div class="sales-box" :key="item.attrId" v-for="(item, index) in saleAttrsRef">
			<span class="sales-box-title">{{ item.attrName }}</span>
			<div v-if="item.valueSelect">
				<el-checkbox-group v-model="item.valueSelectList" @change="handlecheckboxChange">
					<el-checkbox v-for="(valueSelect, valueIndex) in item.valueSelect.split(';')" :key="valueIndex" :label="valueSelect" />
				</el-checkbox-group>
			</div>
			<div style="display: flex; width: 150px; margin-left: 20px">
				<el-input
					v-if="inputVisibles[index]"
					v-model="inputValue"
					size="small"
					@keyup.enter="handleInputConfirm(index)"
					@blur="handleInputConfirm(index)"
				/>
				<el-button @click="showInput(index)">+自定义</el-button>
			</div>
		</div>
	</div>
	<div>
		<el-button type="primary" @click="rollbackStepClick">上一步</el-button>
		<el-button type="success" @click="nextStepClick">下一步</el-button>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElInput } from "element-plus";
import { attrSaleListCategoryId } from "@/api/modules/mail/attr";
import { MailAttr } from "@/api/interface/mail/attr";

// 接收父组件参数并设置默认值
interface SalesProps {
	basicForm?: any;
}
const props = withDefaults(defineProps<SalesProps>(), {});

const inputValue = ref("");
const inputVisibles = ref<boolean[]>([]);
const showInput = (index: number) => {
	inputVisibles.value[index] = true;
};

const handleInputConfirm = (index: number) => {
	if (inputValue.value) {
		if (saleAttrsRef.value[index].valueSelect  === "") {
			saleAttrsRef.value[index].valueSelect = inputValue.value;
		} else {
			saleAttrsRef.value[index].valueSelect = saleAttrsRef.value[index].valueSelect + ";" + inputValue.value;
		}
	}
	inputVisibles.value[index] = false;
	inputValue.value = "";
};

const saleAttrsRef = ref<MailAttr.Entity[]>([]);
const initSaleAttrData = async () => {
	const { data } = await attrSaleListCategoryId(props.basicForm.spu.categoryId);
	saleAttrsRef.value = data;
	data.forEach(() => {
		inputVisibles.value.push(false);
	});
};

const nextStepClick = () => {
	props.basicForm.activeStep = 3;
};

const rollbackStepClick = () => {
	props.basicForm.activeStep = props.basicForm.activeStep - 1;
};

const handlecheckboxChange = (value: string[]) => {
	console.log(value);
};

onMounted(() => {
	initSaleAttrData();
});
</script>
<style lang="scss">
.sales-box {
	display: flex;
	margin-bottom: 20px;
}
.sales-box-title {
	margin-top: 4px;
	margin-right: 26px;
}
</style>
