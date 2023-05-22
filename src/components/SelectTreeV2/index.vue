<template>
	<el-select ref="selectRef" v-model="selectTreeV2Prop.currentNodeLabel" placeholder="请选择分类">
		<el-option :value="selectTreeV2Prop.currentNodeLabel" style="height: auto; padding: 0">
			<el-tree-v2
				ref="elTreeV2Ref"
				@node-click="nodeClick"
				:current-node-key="selectTreeV2Prop.currentNodeKey"
				:node-key="props.id"
				:data="props.data"
				:props="defaultProps"
			/>
		</el-option>
	</el-select>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { TreeNodeData } from "element-plus/es/components/tree/src/tree.type";
import { ElTreeV2 } from "element-plus";

const selectRef = ref();

const elTreeV2Ref = ref<InstanceType<typeof ElTreeV2>>();

interface SelectV2TreeProp {
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	label?: string; // 显示的label ==> 非必传，默认为 “label”
	modelId: any;
	modelValue?: string;
}
onMounted(() => {
	selectTreeV2Prop.value.currentNodeKey = props.modelId;
});

watchEffect(() => {
	if (elTreeV2Ref.value !== undefined) {
		if(elTreeV2Ref.value.getNode(props.modelId) !== undefined) {
			selectTreeV2Prop.value.currentNodeLabel = elTreeV2Ref.value.getNode(props.modelId).label;
		}
	}
});

const emit = defineEmits(["update:modelId"]);

const selectTreeV2Prop = ref({
	currentNodeKey: "",
	currentNodeLabel: ""
});

const props = withDefaults(defineProps<SelectV2TreeProp>(), {
	id: "id",
	label: "label",
	modelValue: ""
});

const defaultProps = {
	children: "children",
	label: props.label
};

const nodeClick = (data: TreeNodeData) => {
	selectTreeV2Prop.value.currentNodeKey = data.id;
	selectTreeV2Prop.value.currentNodeLabel = data.name;
	emit("update:modelId", data.id);
	selectRef.value.blur();
};
</script>

<style lang="scss" scoped></style>
