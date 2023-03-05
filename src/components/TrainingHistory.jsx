import { useState } from "react";
import nextId from "react-id-generator";
import { formatDate, getCurrentDate, prepareDate } from '../helpers/dateHelpers';
import TrainingHistoryItem from './TrainingHistoryItem';

export default function TrainingHistory(props) {
  const [form, setForm] = useState({
    date: getCurrentDate(),
    distance: ""
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState({
    errorMessage: "Не заполнены обязательные поля: Дата и Пройденное расстояние",
    isVisible: false
  });

  const onSubmitForm = (event) => {
    event.preventDefault();

    if (!isValidForm()) {
      return setError(prevState => ({ ...prevState, isVisible: true }));
    }

    const jsFormDate = prepareDate(new Date(form.date));
    const existingItem = items.find(item => item.date.getTime() === jsFormDate.getTime());

    if (existingItem) {
      existingItem.distance = (+existingItem.distance) + (+form.distance);
    } else {
      items.push({ ...form, id: nextId(), date: jsFormDate });
    }
    setError(prevState => ({ ...prevState, isVisible: false }));
    setItems(items.sort(sortItemsByDate));
    setForm({
      date: getCurrentDate(),
      distance: ""
    });
  };

  const isValidForm = () => {

    if (form.date && form.distance) {
      return true;
    }
    return false;
  };

  const sortItemsByDate = (a, b) => new Date(b.date) - new Date(a.date);

  const onRemoveItem = itemId => setItems(items.filter(item => item.id !== itemId).sort(sortItemsByDate));

  const onEditItem = itemId => {
    const item = items.find(item => item.id === itemId);

    setForm({
      date: formatDate(item.date),
      distance: item.distance
    });
  };

  const onChangeDate = ({ target: { name, value } }) => setForm((prevForm) => ({ ...prevForm, [name]: value }));

  return (
    <div className="training-history">
      <div className="form">
        <div style={{ display: error.isVisible ? 'block' : 'none' }}>{error.errorMessage}</div>
        <form onSubmit={onSubmitForm}>
          <div className="form-row">
            <div className="form-column">
              <label className="form-label" aria-required htmlFor="date">Дата (ДД.ММ.ГГ)</label>
              <input id="date" className="form-field" name="date" type="date" value={form.date} onChange={onChangeDate} />
            </div>
            <div className="form-column">
              <label className="form-label" aria-required htmlFor="distance">Пройдено, км</label>
              <input id="distance" className="form-field" name="distance" type="number" value={form.distance} onChange={onChangeDate} />
            </div>
            <div className="form-column">
              <button className="form-button">OK</button>
            </div>
          </div>
        </form>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>Дата (ДД.ММ.ГГ)</th>
              <th>Пройдено, км</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody className="table-body">{
            items.map((item) => (
              <TrainingHistoryItem key={item.id} item={item} onRemoveItem={() => onRemoveItem(item.id)} onEditItem={() => onEditItem(item.id)} />
            ))
          }</tbody>
        </table>
      </div>
    </div>
  );
}

