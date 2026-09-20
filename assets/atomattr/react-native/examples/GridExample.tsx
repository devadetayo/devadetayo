import React from 'react';
import { View, Text } from 'react-native';
import useAtom from '../useAtom';
import { gridizeChildren, gridContainerStyle } from '../gridUtils';

export default function GridExample() {
  const parentAttrs = { 'grid-cols': 3, gap: '4', p: '4' };
  const containerStyle = { ...gridContainerStyle(parentAttrs), ...useAtom(parentAttrs).style };

  const children = [1,2,3,4,5,6].map(i => {
    const span = i === 1 ? 2 : 1; // demo: first item spans 2 columns
    const rowSpan = i === 4 ? 2 : 1; // demo: fourth item spans 2 rows if row-height provided
    const atom = useAtom({ 'col-span': span });
    return (
      <View key={i} {...atom.pressableProps} style={atom.style} col-span={span} row-span={rowSpan}>
        <Text>Item {i}</Text>
      </View>
    );
  });

  // Provide row-height so row-span has effect
  const parentWithRow = { ...parentAttrs, 'row-height': '40' };
  const gridChildren = gridizeChildren(children, parentWithRow);

  return <View style={containerStyle}>{gridChildren}</View>;
}
