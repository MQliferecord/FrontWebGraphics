import { onMounted,onUnmounted } from "vue";

export function useEventListener(
    target:HTMLElement|Window|string,
    event:keyof HTMLElementEventMap,
    callback:(this:HTMLElement,ev:any)=>any
){
    onMounted(()=>{
        (typeof target === 'string'?document.querySelector(target) as HTMLElement:target).addEventListener(event,callback)
    })
    onUnmounted(()=>{
        (typeof target === 'string'?document.querySelector(target) as HTMLElement:target).addEventListener(event,callback)
    })
}