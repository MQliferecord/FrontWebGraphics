const geneCircle = (pos:[number,number],r:number = 1)=>{
    if(pos&&Array.isArray(pos)&&pos.length){
        //pos是指圆的圆心坐标
        const [x,y] = pos
        return {
            statePos:[x-r,y-r],
            pos,
            r
        }
    }else{
        throw new Error("Please pass in the correct parameters")
    }
}

const geneLine = (pos: [[number, number], [number, number]]) => {
    if (pos && Array.isArray(pos) && pos.length >= 2) {
      const [A, B] = pos;
      const dx = B[0] - A[0];
      const dy = B[1] - A[1];
      const lineLength = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      const tanAB = dy / dx;
      const angleAB = (Math.atan(tanAB) * 180) / Math.PI;
      return {
        startPos: A,
        endPos: B,
        angle: angleAB,
        lineLength:lineLength,
      };
    } else {
      throw new Error("Please pass in the correct parameters");
    }
  };

const geneLines = (pos:[[number,number],[number,number]],isLine:boolean = false)=>{
    if(pos&&Array.isArray(pos)&&pos.length>=2){
        let i = 0,len = pos.length,result = []
        //连成一条线的两个点的坐标
        while(i<len){
            //如果是线段，则不添加闭合点
            if(isLine&&!pos[i+1]){
                break;
            }
            let A = pos[i];
            let B = pos[i+1>len-1?0:i+1];
            if(A[0]>B[0]){
                [B,A] = [A,B]
            }
            const dx = B[0] - A[0]
            const dy = B[1] - B[1]
            //线段长度
            const lineLength = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))
            const tanAB = dy/dx 
            //线段相对于X轴的角度
            const angleAB = Math.atan(tanAB)*180/Math.PI  
            result.push({
                statePos:A,
                endPos:B,
                angle:angleAB,
                lineLength:lineLength
            })
            i++;
        }
        return result
    }else{
        throw new Error("Please pass in the correct parameters")
    }
}

const geneRectangle = (statePos:[number,number],w:number,h:number)=>{
    if(
        statePos&&
        Array.isArray(statePos)&&
        statePos.length>=2&&
        typeof w === "number"&&
        typeof h === "number"    
    ){
        //statePos表示的是矩阵右上角的坐标
        const [a0,b0] = statePos;
        const a1 = a0 + w;
        const b1 = b0 + h;
        return {
            statePos,
            w,
            h,
            endPos:[a1,b1],
            pos:[
                [a0,b0],
                [a0,b1],
                [a1,b0],
                [a1,b1],
            ]
        }
    }else{
        throw new Error("Please pass in the parameters")
    }
}

//获取元素相对于浏览器视窗的绝对坐标定位
const getElPagePos = (el:HTMLElement)=>{
    let actualLeft = el.offsetLeft;
    let actualTop = el.offsetTop;
    let current = el.offsetParent as HTMLElement
    while(current!==null){
        actualLeft += (current.offsetLeft+current.clientLeft);
        /**
         * offsetTop--->元素到offsetParent顶部的距离
         * clientTop--->border.top上边框的宽度
         * scrollTop--->内容层顶部到可视区域顶部的距离
        */
        actualTop += (current.offsetTop+current.clientTop);
        current = current.offsetParent as HTMLElement
    }
    return {
        x:actualLeft,
        y:actualTop
    }
}

export default{
    getElPagePos,
    geneRectangle,
    geneLines,
    geneLine,
    geneCircle
}