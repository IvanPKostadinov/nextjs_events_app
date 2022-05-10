function EventItem(props) {
  const { item } = props;

  return (
    <li>
      <h2>{item.title}</h2>
    </li>
  );
}

export default EventItem;
