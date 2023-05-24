<template>
	<el-tabs tab-position="left" style="height: 200px">
		<el-tab-pane :key="index" v-for="(item, index) in attrGroupDTOsRef" :label="item.attrGroup.attrGroupName">
			<el-form ref="formRef" :model="dynamicValidateForm" label-width="150px">
				<el-form-item
					v-for="domain in item.attrs"
					:key="domain.attrId"
					:label="domain.attrName"
					:prop="domain.attrName"
					:rules="{
						required: true,
						message: `${domain.attrName}不能为空`,
						trigger: 'blur'
					}"
				>
					<div v-if="domain.valueSelect !== ''">
						<el-select
							v-model="domain.valueSelectList"
							filterable
							allow-create
							multiple
							collapse-tags
							:max-collapse-tags="2"
							:placeholder="`请输入${domain.attrName}`"
							style="width: 240px"
						>
							<el-option
								v-for="(value, valueKey) in domain.valueSelect.split(';')"
								:key="valueKey"
								:label="value"
								:value="value"
							/>
						</el-select>
					</div>
					<el-input v-else v-model="domain.valueSelect" />
				</el-form-item>
			</el-form>
		</el-tab-pane>
	</el-tabs>
</template>
<script lang="ts" setup>
import { MailAttrGroup } from "@/api/interface/mail/attrGroup";
import { listAttrGroupDTOByCateGory } from "@/api/modules/mail/attrGroup";
import { onMounted, ref, reactive } from "vue";
import type { FormInstance } from "element-plus";

// 接收父组件参数并设置默认值
interface SalesProps {
	category?: { categroyId: number; categroyName: string; categroyText: string };
}
const props = withDefaults(defineProps<SalesProps>(), {});

const attrGroupDTOsRef = ref<MailAttrGroup.AttrGroupDTO[]>([]);

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
	domains: DomainItem[];
}>({
	domains: []
});

interface DomainItem {
	key: number;
	value: string;
}

const initSales = async () => {
	const { data } = await listAttrGroupDTOByCateGory(props.category.categroyId);
	attrGroupDTOsRef.value = data;
};

onMounted(() => {
	initSales();
});
</script>
<style></style>
