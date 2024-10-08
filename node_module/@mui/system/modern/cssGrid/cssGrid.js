import style from "../style/index.js";
import compose from "../compose/index.js";
import { createUnaryUnit, getValue } from "../spacing/index.js";
import { handleBreakpoints } from "../breakpoints/index.js";
import responsivePropType from "../responsivePropType/index.js";

// false positive
// eslint-disable-next-line react/function-component-definition
export const gap = props => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');
    const styleFromPropValue = propValue => ({
      gap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = process.env.NODE_ENV !== 'production' ? {
  gap: responsivePropType
} : {};
gap.filterProps = ['gap'];

// false positive
// eslint-disable-next-line react/function-component-definition
export const columnGap = props => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'columnGap');
    const styleFromPropValue = propValue => ({
      columnGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  columnGap: responsivePropType
} : {};
columnGap.filterProps = ['columnGap'];

// false positive
// eslint-disable-next-line react/function-component-definition
export const rowGap = props => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'rowGap');
    const styleFromPropValue = propValue => ({
      rowGap: getValue(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  rowGap: responsivePropType
} : {};
rowGap.filterProps = ['rowGap'];
export const gridColumn = style({
  prop: 'gridColumn'
});
export const gridRow = style({
  prop: 'gridRow'
});
export const gridAutoFlow = style({
  prop: 'gridAutoFlow'
});
export const gridAutoColumns = style({
  prop: 'gridAutoColumns'
});
export const gridAutoRows = style({
  prop: 'gridAutoRows'
});
export const gridTemplateColumns = style({
  prop: 'gridTemplateColumns'
});
export const gridTemplateRows = style({
  prop: 'gridTemplateRows'
});
export const gridTemplateAreas = style({
  prop: 'gridTemplateAreas'
});
export const gridArea = style({
  prop: 'gridArea'
});
const grid = compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
export default grid;