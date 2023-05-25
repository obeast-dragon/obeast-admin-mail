<template>
	<div class="sales-main">
		<el-form ref="formRef" :model="dynamicForm" label-width="120px" class="demo-dynamic">
			<el-form-item v-for="(item, index) in saleAttrsRef" :key="item.attrId" :label="item.attrName" :prop="item.attrName">
				<div v-if="item.valueSelect">
					<el-checkbox-group v-model="dynamicForm.salesAttrs[index].attrValue">
						<el-checkbox
							v-for="(valueSelect, valueIndex) in item.valueSelect.split(';')"
							:key="valueIndex"
							:label="valueSelect"
						/>
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
			</el-form-item>
		</el-form>
	</div>
	<div>
		<el-button type="primary" @click="rollbackStepClick">上一步</el-button>
		<el-button type="success" @click="nextStepClick">下一步</el-button>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
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
		if (saleAttrsRef.value[index].valueSelect === "") {
			saleAttrsRef.value[index].valueSelect = inputValue.value;
		} else {
			saleAttrsRef.value[index].valueSelect = saleAttrsRef.value[index].valueSelect + ";" + inputValue.value;
		}
	}
	inputVisibles.value[index] = false;
	inputValue.value = "";
};

const nextStepClick = () => {
	let res: any = [];
	dynamicForm.salesAttrs.forEach(item => {
		if (item.attrValue !== null) {
			if (item.attrValue.length > 0) {
				res.push(item);
			}
		}
	});
	console.log(res);
	props.basicForm.saleAttrs = res;
	props.basicForm.activeStep = 3;
};

const rollbackStepClick = () => {
	props.basicForm.activeStep = props.basicForm.activeStep - 1;
};

interface SalesAttrItem {
	attrId?: number;
	attrName?: string;
	attrValue: string | string[];
	attrSort?: number;
}
const dynamicForm = reactive<{
	salesAttrs: SalesAttrItem[];
}>({
	salesAttrs: []
});

const saleAttrsRef = ref<MailAttr.Entity[]>([]);
const initSaleAttrData = async () => {
	const { data } = await attrSaleListCategoryId(props.basicForm.spu.categoryId);
	saleAttrsRef.value = data;
	data.forEach(item => {
		inputVisibles.value.push(false);
		dynamicForm.salesAttrs.push({
			attrId: item.attrId,
			attrName: item.attrName,
			attrValue: [],
			attrSort: item.sort
		});
	});
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
