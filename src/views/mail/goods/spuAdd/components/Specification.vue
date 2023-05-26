<template>
	<el-tabs tab-position="left" style="height: 200px">
		<el-tab-pane :key="index" v-for="(item, index) in attrGroupDTOsRef" :label="item.attrGroup.attrGroupName">
			<el-form ref="formRef" :model="dynamicForm" label-width="150px">
				<el-form-item
					v-for="(domain, domainIndex) in item.attrs"
					:key="domain.attrId"
					:label="domain.attrName"
					:prop="domain.attrName"
				>
					<el-select
						v-model="dynamicForm.basicAttr[index][domainIndex].attrValue"
						:multiple="domain.valueType === 1"
						collapse-tags
						filterable
						allow-create
						:max-collapse-tags="1"
						:placeholder="`请输入${domain.attrName}`"
						style="width: 240px"
						v-if="domain.valueSelect !== ''"
						@change="selectChange(dynamicForm.basicAttr[index][domainIndex], domain)"
					>
						<el-option v-for="(value, valueKey) in domain.valueSelect.split(';')" :key="valueKey" :label="value" :value="value" />
					</el-select>
					<div v-else>
						<el-input v-model="dynamicForm.basicAttr[index][domainIndex].attrValue" />
					</div>
					<el-checkbox
						style="margin-left: 10px"
						:true-label="1"
						:false-label="0"
						v-model="dynamicForm.basicAttr[index][domainIndex].showDesc"
						label="快速展示"
						size="small"
					/>
				</el-form-item>
			</el-form>
		</el-tab-pane>
	</el-tabs>
	<div>
		<el-button type="primary" @click="rollbackStepClick">上一步</el-button>
		<el-button type="success" @click="nextStepClick">下一步</el-button>
	</div>
</template>
<script lang="ts" setup>
import { MailAttrGroup } from "@/api/interface/mail/attrGroup";
import { listAttrGroupDTOByCateGory } from "@/api/modules/mail/attrGroup";
import { onMounted, ref, reactive } from "vue";
import type { FormInstance } from "element-plus";

// 接收父组件参数并设置默认值
interface SpecificationProps {
	basicForm?: any;
}
const props = withDefaults(defineProps<SpecificationProps>(), {});

const attrGroupDTOsRef = ref<MailAttrGroup.AttrGroupDTO[]>([]);

interface BasicAttrItem {
	showDesc: number;
	attrValue: string[] | string;
	attrId?: number;
	attrSort: number;
	attrName: string;
}
const formRef = ref<FormInstance>();
const dynamicForm = reactive<{
	basicAttr: any[];
}>({
	basicAttr: []
});

const nextStepClick = () => {
	let attrs: any = [];
	dynamicForm.basicAttr.forEach((item: BasicAttrItem[]) => {
		item.forEach(basicAttr => {
			if (basicAttr.attrValue !== "") {
				if (Array.isArray(basicAttr.attrValue)) {
					if (basicAttr.attrValue.length > 0) {
						let reduceValue = basicAttr.attrValue.reduce((total: string, currentValue: string) => {
							return total + ";" + currentValue;
						});
						basicAttr.attrValue = reduceValue;
						attrs.push(basicAttr);
					}
				} else {
					attrs.push(basicAttr);
				}
			}
		});
	});

	props.basicForm.spu.baseAttrs = attrs;
	console.log("baseAttrs", props.basicForm.spu.baseAttrs);
	props.basicForm.activeStep = 2;
};

const rollbackStepClick = () => {
	props.basicForm.activeStep = props.basicForm.activeStep - 1;
	props.basicForm.spu.brandId = "";
	props.basicForm.spu.categoryId = "";
};

const selectChange = (attrItem: BasicAttrItem, attrDomain: any) => {
	attrItem.attrId = attrDomain.attrId;
	attrItem.attrSort = attrDomain.sort;
	attrItem.attrName = attrDomain.attrName;
};

const initSpecification = async () => {
	const { data } = await listAttrGroupDTOByCateGory(props.basicForm.spu.categoryId);
	attrGroupDTOsRef.value = data;
	data.forEach(item => {
		let attrTemps: any = [];
		item.attrs.forEach(() => {
			attrTemps.push({
				showDesc: 0,
				attrValue: "",
				attrId: null,
				attrSort: 0,
				attrName: ""
			});
		});
		dynamicForm.basicAttr.push(attrTemps);
	});
};
onMounted(() => {
	initSpecification();
});
</script>
<style></style>
