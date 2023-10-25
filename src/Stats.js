
const Stats = ({ items }) => {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your ToDo list 🚀</em>
      </p>
    );
  }

  const numItems = items.length;
  const numDone = items.filter((item) => item.checked).length;
  const percentageDone = Math.round((numDone / numItems) * 100);

  return (
    <footer>
      <em>
        {percentageDone === 100
          ? "You did everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, and you've already finished ${numDone} items (${percentageDone}%) `}
      </em>
    </footer>
  );
};

export default Stats;
