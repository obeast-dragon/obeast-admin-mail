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
						v-model="dynamicForm.basicAttr[domainIndex].attrValue"
						:multiple="domain.valueType === 1"
						collapse-tags
						:max-collapse-tags="1"
						:placeholder="`请输入${domain.attrName}`"
						style="width: 240px"
						v-if="domain.valueSelect !== ''"
						@change="selectChange(dynamicForm.basicAttr[domainIndex], domain)"
					>
						<el-option v-for="(value, valueKey) in domain.valueSelect.split(';')" :key="valueKey" :label="value" :value="value" />
					</el-select>
					<div v-else>
						<el-input v-model="dynamicForm.basicAttr[domainIndex].attrValue" />
					</div>
					<el-checkbox
						style="margin-left: 10px"
						:true-label="1"
						:false-label="0"
						v-model="dynamicForm.basicAttr[domainIndex].showDesc"
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
	basicAttr: BasicAttrItem[];
}>({
	basicAttr: []
});

const nextStepClick = () => {
	let attrs: any = [];
	dynamicForm.basicAttr.forEach(item => {
		if (item.attrValue !== "") {
			if (Array.isArray(item.attrValue)) {
				if (item.attrValue.length > 0) {
					let reduceValue = item.attrValue.reduce((total: string, currentValue: string) => {
						return total + ";" + currentValue;
					});
					item.attrValue = reduceValue;
					attrs.push(item);
				}
			} else {
				attrs.push(item);
			}
		}
	});
	props.basicForm.spu.baseAttrs = attrs;
	console.log("props.basicForm.spu.baseAttrs", attrs);
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
	let attrTemps: any = [];
	data.forEach(item => {
		let attrs: any = [];
		item.attrs.forEach(() => {
			attrs.push({
				showDesc: 0,
				attrValue: "",
				attrId: null,
				attrSort: 0,
				attrName: ""
			});
			dynamicForm.basicAttr.push({
				showDesc: 0,
				attrValue: "",
				attrId: null,
				attrSort: 0,
				attrName: ""
			});
		});
		attrTemps.push(attrs);
	});
	console.log(attrTemps);

};
onMounted(() => {
	initSpecification();
});
</script>
<style></style>
