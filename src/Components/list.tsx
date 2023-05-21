import { FixedSizeList } from "react-window";

const List = ({ data, renderItem, itemSize }: IProps) => {
  return (
    <FixedSizeList
      innerElementType="ul"
      itemCount={data.length}
      itemSize={itemSize || 150}
      height={700}
      width={400}
    >
      {({ index, style }) => {
        return <>{renderItem(data[index], style)}</>;
      }}
    </FixedSizeList>
  );
};

export default List;

interface IProps {
  data: any[];
  renderItem: (item: any, style: any) => JSX.Element;
  itemSize?: number;
}
