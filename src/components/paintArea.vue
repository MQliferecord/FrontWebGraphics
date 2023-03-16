<template>
  <section>
    <h3>{{ msg }}</h3>
    <div class="card" ref="boardDom">
      <slot></slot>
      <div style="user-select: none">
        x:{{ x - cardOffset.x }},y:{{ y - cardOffset.y }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  onUnmounted,
  PropType,
} from "vue";
import useMouse from "@/hooks/mouse";
import mathMethods from "@/utils/math";
import { IShapeTypes, IShapeProps } from "../store/schema";
export default defineComponent({
  name: "paintArea",
  props: {
    msg: String,
    onMouseChange: Function as PropType<(x: number, y: number) => void>,
  },
  setup(props, ctx) {
    //----------------------------------------------------------------------
    const { onMouseChange } = toRefs(props);
    //获得画布相对于page左上角的初始位置
    const cardOffset = ref({ x: 0, y: 0 });
    //当前鼠标相对于page左上角的位置
    const mouseAbsPos = ref({x:0,y:0})
    //获取当前画布的DOM元素
    const boardDom = ref<HTMLElement | null>(null);
    //当前选中的绘制类型
    const curShape = ref<IShapeTypes|''>('')
    //当前选中的元素
    const curSelect = ref("");
    const miniImg = ref("")
    //画布已经绘制的对象的存储数组
    const canvasBox = ref<{ [key in IShapeTypes]: IShapeProps[] }>({
      rect: [],
      circle: [],
      line: [],
    });
    const recordManager = ref<any>({
      snapshots:[
        {
          rect:[],
          circle:[],
          line:[]
        }
      ],
      curIndex:0,
      maxLimit:50
    })

    //----------------------------------------------------------------------
    const handleShapeClick = (type:'click'|'rect'|'line')=>{
      curShape.value = type === curShape.value? '':type;
    }
    //实时监控鼠标位置相对于画布的dotX和dotY
    const { x, y } = useMouse(window, (x, y) => {
      onMouseChange &&
        onMouseChange.value!(x - cardOffset.value.x, y - cardOffset.value.y);
    });

    onMounted(() => {
      const { x, y } = mathMethods.getElPagePos(boardDom.value!);
      cardOffset.value.x = x;
      cardOffset.value.y = y;
    });
    onUnmounted(() => {});
    return {
      boardDom,
      cardOffset,
    };
  },
});
</script>

<style lang="scss">
section {
  position: relative;
  height: 480px;
  box-shadow: 0 0 4px rgb(0, 0, 0, 0.1);
  background-image: radial-gradient(rgba(9, 89, 194, 0.3) 6%, transparent 0),
    radial-gradient(#faf9f8 6%, transparent 0);
  background-size: 10px 10px;
  background-position: 0 0, 2px 2px;
}
</style>