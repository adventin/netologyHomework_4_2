export default function TrainingHistoryItem(props) {
  const { item, onRemoveItem, onEditItem } = props;

  return (
    <tr>
      <td>{item.date.toLocaleDateString()}</td>
      <td>{item.distance}</td>
      <td>
        <i style={{ marginRight: '8px' }} onClick={onRemoveItem}>✘</i>
        <i onClick={onEditItem}>✎</i>
      </td>
    </tr>
  );
}
