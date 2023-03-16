/**
 * 图形的样式
 */
export type IShapeTypes = 'rect'|'circle'|'line'

/**
 * 定义图形的元信息
 * 图形id-顶点坐标-宽高样式
 */
export interface IShapeProps{
    id:string,
    type:IShapeTypes,
    style:any,
}




