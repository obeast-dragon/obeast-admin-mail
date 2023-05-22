<template>
	<el-select ref="selectRef" v-model="selectTreeV2Prop.currentNodeLabel" placeholder="请选择分类">
		<el-option :value="selectTreeV2Prop.currentNodeLabel" style="height: auto; padding: 0">
			<el-tree-v2
				@node-click="nodeClick"
				:current-node-key="selectTreeV2Prop.currentNodeKey"
				:data="props.data"
				:props="defaultProps"
			/>
		</el-option>
	</el-select>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { TreeNodeData } from "element-plus/es/components/tree/src/tree.type";

interface SelectV2TreeProp {
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	label?: string; // 显示的label ==> 非必传，默认为 “label”
	catelogId: number;
}

const selectRef = ref();

const emit = defineEmits(["update:catelogId"]);

const selectTreeV2Prop = reactive({
	currentNodeKey: null,
	currentNodeLabel: ""
});

const props = withDefaults(defineProps<SelectV2TreeProp>(), {
	id: "id",
	label: "label",
	catelogId: null
});

const defaultProps = {
	children: "children",
	label: props.label
};

const nodeClick = (data: TreeNodeData) => {
	selectTreeV2Prop.currentNodeKey = data.id;
	selectTreeV2Prop.currentNodeLabel = data.name;
	emit("update:catelogId", data.id);
	selectRef.value.blur();
};
</script>

<style lang="scss" scoped></style>
