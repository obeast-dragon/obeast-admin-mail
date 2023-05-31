<template>
	<el-dialog v-model="dialogVisible" title="规格参数维护" width="50%">
		<div>
			<el-tabs tab-position="left" style="height: 200px">
				<el-tab-pane :key="index" v-for="(item, index) in attrGroupDTOsRef" :label="item.attrGroup.attrGroupName">
					<el-form ref="formRef" label-width="150px">
						<el-form-item
							v-for="(domain, domainIndex) in item.attrs"
							:key="domain.attrId"
							:label="domain.attrName"
							:prop="domain.attrName"
						>
							<el-select
								v-model="basicAttrRefs[index][domainIndex].attrValue"
								:multiple="domain.valueType === 1"
								collapse-tags
								filterable
								allow-create
								:max-collapse-tags="1"
								:placeholder="`请输入${domain.attrName}`"
								style="width: 240px"
								v-if="domain.valueSelect !== ''"
							>
								<el-option
									v-for="(value, valueKey) in domain.valueSelect.split(';')"
									:key="valueKey"
									:label="value"
									:value="value"
								/>
							</el-select>
							<div v-else>
								<el-input v-model="basicAttrRefs[index][domainIndex].attrValue" />
							</div>
							<el-checkbox
								style="margin-left: 10px"
								:true-label="1"
								:false-label="0"
								v-model="basicAttrRefs[index][domainIndex].showDesc"
								label="快速展示"
								size="small"
							/>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</div>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="() => {}">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MailAttrGroup } from "@/api/interface/mail/attrGroup";
import { listAttrGroupDTOByCateGory } from "@/api/modules/mail/attrGroup";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { listBySpuId } from "@/api/modules/mail/spuAttrValue";
import { SpuInfo } from "@/api/interface/mail/spuInfo";

const attrGroupDTOsRef = ref<MailAttrGroup.AttrGroupDTO[]>([]);

// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
	dialogProps.value = params;
	initData();
	dialogVisible.value = true;
};
interface DialogProps {
	title: string;
	isView?: boolean;
	rowData: Partial<SpuInfo.Entity>;
	api?: (params: any) => Promise<any>;
	getTableList?: () => void;
}

const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
	isView: false,
	title: "",
	rowData: {}
});

const basicAttrRefs = ref([]);
const initData = async () => {
	const { data } = await listAttrGroupDTOByCateGory(dialogProps.value.rowData.categoryId);
	attrGroupDTOsRef.value = data;
	initBasicAttrRefs(data);
};

/**
 * 初始化 BasicAttrRefs
 * @param data
 */
const initBasicAttrRefs = (data: MailAttrGroup.AttrGroupDTO[]) => {
	data.forEach(item => {
		let attrTemps: any = [];
		item.attrs.forEach(attr => {
			attrTemps.push({
					showDesc: 0,
					attrValue: "",
					attrId: attr.attrId,
					attrSort: 0,
					attrName: ""
				});
		});
		basicAttrRefs.value.push(attrTemps);
	});
};

/**
 * 扁平成一维数组
 * @param attrGroupDTOs
 */
// const flatAttrDTO = (attrGroupDTOs: MailAttrGroup.AttrGroupDTO[]) => {
// 	let arr: MailAttr.Entity[] = [];
// 	attrGroupDTOs.forEach(item => {
// 		arr = [...arr, ...item.attrs];
// 	});
// 	// echoflat(arr);
// 	return arr;
// };

// const echoflat = async (flatArr: MailAttr.Entity[]) => {
// 	const { data } = await listBySpuId({ spuId: dialogProps.value.rowData.id });
// 	data.forEach(item => {
// 		let entity = flatArr.find(flat => item.attrId === flat.attrId);
// 		if (entity !== undefined) {
// 			entity.valueSelect = item.attrValue;
// 		}
// 	});
// };

defineExpose({
	acceptParams
});
</script>

<style lang="scss" scoped></style>
