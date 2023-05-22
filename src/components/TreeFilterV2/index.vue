<template>
	<div class="card-v2 filter">
		<h4 class="title sle" v-if="title">{{ title }}</h4>
		<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable @input="inputChanged" />
		<div class="tree-parent">
			<el-tree-v2
				ref="treeRefV2"
				:node-key="id"
				:height="700"
				:data="multiple ? treeData : treeAllData"
				:show-checkbox="multiple"
				:check-strictly="false"
				:current-node-key="!multiple ? selected : ''"
				:highlight-current="!multiple"
				:expand-on-click-node="false"
				:check-on-click-node="multiple"
				:props="defaultProps"
				:filter-method="(value, data) => filterMethod(value, data)"
				:default-checked-keys="multiple ? selected : []"
				@node-click="handleNodeClick"
			/>
		</div>
	</div>
</template>

<script setup lang="ts" name="TreeFilter">
import { ref, watch, onBeforeMount, nextTick } from "vue";
import { ElTreeV2 } from "element-plus";

// 接收父组件参数并设置默认值
interface TreeFilterProps {
	requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	title?: string; // treeFilter 标题 ==> 非必传
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	label?: string; // 显示的label ==> 非必传，默认为 “label”
	multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
	defaultValue?: any; // 默认选中的值 ==> 非必传
}
const props = withDefaults(defineProps<TreeFilterProps>(), {
	id: "id",
	label: "label",
	multiple: false
});

const defaultProps = {
	children: "children",
	label: props.label
};

const treeRefV2 = ref<InstanceType<typeof ElTreeV2>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

const selected = ref();
const setSelected = () => {
	if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
	else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(async () => {
	setSelected();
	if (props.requestApi) {
		const { data } = await props.requestApi!();
		treeData.value = data;
		treeAllData.value = [{ id: "", [props.label]: "全部" },  ...data];
	}
});

// 使用 nextTick 防止打包后赋值不生效
watch(
	() => props.defaultValue,
	() => nextTick(() => setSelected()),
	{ deep: true, immediate: true }
);

watch(
	() => props.data,
	() => {
		if (props.data?.length) {
			treeData.value = props.data;
			treeAllData.value = [{ id: "", [props.label]: "全部" }, ...props.data];
		}
	},
	{ deep: true, immediate: true }
);

const filterText = ref("");

const inputChanged = (query: string) => {
	treeRefV2.value!.filter(query);
};
// 过滤
const filterMethod = (value: string, node: any) => {
	return node.name!.includes(value);
};

interface FilterEmits {
	(e: "change", value: any): void;
}
const emit = defineEmits<FilterEmits>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
	if (props.multiple) return;
	emit("change", data[props.id]);
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRefV2 });
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
