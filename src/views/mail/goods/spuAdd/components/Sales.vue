<template>
	<div class="sales-main">
		<el-form ref="salesFormRef" :model="dynamicForm" label-width="120px" class="demo-dynamic">
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
		<el-button type="primary" @click="rollbackStepClick(salesFormRef)">上一步</el-button>
		<el-button type="success" @click="nextStepClick">下一步</el-button>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { ElInput } from "element-plus";
import { attrSaleListCategoryId } from "@/api/modules/mail/attr";
import { MailAttr } from "@/api/interface/mail/attr";
import { descartes } from "@/utils/util";
import type { FormInstance } from "element-plus";

const salesFormRef = ref<FormInstance>();

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
	props.basicForm.saleAttrs = res;
	console.log(props.basicForm.saleAttrs);
	generateSkus();
	props.basicForm.activeStep = 3;
};

const rollbackStepClick = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	props.basicForm.activeStep = props.basicForm.activeStep - 1;
};

/**
 * 根据笛卡尔积运算进行生成sku
 */
const generateSkus = () => {
	//根据笛卡尔积运算进行生成sku
	let attrTemp: any = [];
	props.basicForm.saleAttrs.forEach((item: any) => {
		attrTemp.push(item.attrValue);
	});
	
	let descartesList = descartes(attrTemp);
	console.log("descartesList", descartesList);

	props.basicForm.saleAttrs.forEach((item: any) => {
		props.basicForm.tableAttrColumn.push({
			attrId: item.attrId,
			attrName: item.attrName,
			attrValue: item.attrValue,
			attrSort: item.sort,
			attr: descartesList
		});
	});

	// sku
	descartesList.forEach((item: any) => {
		let attrArray: any = []; //sku属性组
        item.forEach((value: any, index: any) => {
          //构造saleAttr信息
          let saleAttrItem = {
            attrId: props.basicForm.tableAttrColumn[index].attrId,
            attrName: props.basicForm.tableAttrColumn[index].attrName,
            attrValue: value
          };
          attrArray.push(saleAttrItem);
        });
		
		//图片
		let imgs: any = [];
		props.basicForm.spu.goodsImgs.forEach(() => {
			imgs.push({ url: "", defaultImg: 0 });
		});
		
		// 会员价
		let memberPrices: any = [];
		if (props.basicForm.memberLevels.length > 0) {
			for (let i = 0; i < props.basicForm.memberLevels.length; i++) {
				if (props.basicForm.memberLevels[i].priviledgeMemberPrice == 1) {
					memberPrices.push({
						id: props.basicForm.memberLevels[i].id,
						name: props.basicForm.memberLevels[i].name,
						price: 0
					});
				}
			}
		}
		props.basicForm.spu.skus.push({
			attr: attrArray,
			skuName: props.basicForm.spu.spuName + " " + item.join(" "),
			price: 0,
			skuTitle: props.basicForm.spu.spuName + " " + item.join(" "),
			skuSubtitle: "",
			images: imgs,
			descar: item,
			skuDesc: "",
			fullCount: 0,
			discount: 0,
			countStatus: 0,
			fullPrice: 0.0,
			reducePrice: 0.0,
			priceStatus: 0,
			memberPrice: [].concat(memberPrices)
		});
	});
	console.log("sku", props.basicForm.spu.skus);
	console.log("props.basicForm", props.basicForm);
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
