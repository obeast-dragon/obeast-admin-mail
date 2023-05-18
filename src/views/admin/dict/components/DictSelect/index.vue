<template>
	<div class="card select">
		<h4 class="title sle" v-if="title">{{ title }}</h4>
		<el-input v-model="selectText" placeholder="输入关键字进行过滤" clearable />
		<el-table
			highlight-current-row
			ref="dictRef"
			:data="dictSelectData"
			:show-header="false"
			@current-change="handleCurrentChange"
		>
			<el-table-column label="dict">
				<template #default="scope">
					<div class="dict-span">
						<div class="dict-select-item">
							<div>{{ scope.row.description }}</div>
							<div>
								<el-tag>{{ scope.row.dictKey }}</el-tag>
							</div>
						</div>
					</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup lang="ts" name="DictSelect">
import { ref, watch, onBeforeMount, nextTick } from "vue";

const selectText = ref("");
const selected = ref();
const dictSelectData = ref<any[]>([]);
const dictRef = ref();

// 接收父组件参数并设置默认值
interface DictSelectProps {
	requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
	data?: any[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	title?: string; // dictSelect 标题 ==> 非必传
	multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
	defaultValue?: any; // 默认选中的值 ==> 非必传
}
const props = withDefaults(defineProps<DictSelectProps>(), {
	multiple: false
});
interface SelectEmits {
	(e: "change", value: any): void;
}
const emit = defineEmits<SelectEmits>();

const handleCurrentChange = (data: { [key: string]: any }) => {
	emit("change", data.id);
};

const setSelected = () => {
	if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue];
	else selected.value = typeof props.defaultValue === "string" ? props.defaultValue : "";
};

onBeforeMount(async () => {
	setSelected();
	if (props.requestApi) {
		const { data } = await props.requestApi!();
		dictSelectData.value = data;
	}
});

watch(
	() => props.data,
	() => {
		if (props.data?.length) {
			dictSelectData.value = props.data;
		}
	},
	{ deep: true, immediate: true }
);
watch(
	() => props.defaultValue,
	() => nextTick(() => setSelected()),
	{ deep: true, immediate: true }
);
watch(selectText, val => {
	dictRef.value!.filter(val);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
