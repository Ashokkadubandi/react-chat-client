import "./index.css";

const Chat = (props) => {
  const { each } = props;
  const { name, message, time } = each;
  let letter = name[0].toUpperCase();
  return (
    <li className="msg-box">
      <div className="cir">
        <h1>{letter}</h1>
      </div>
      <div className="text-con">
        <div className="text-style-con">
          <p className="name">{name}</p>
          <p className="time">{time}</p>
        </div>
        <div className="clean-text">{message}</div>
      </div>
    </li>
  );
};
export default Chat;
