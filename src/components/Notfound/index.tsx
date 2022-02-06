import sadness from "../../util/image/notfound.png";
import "../../css/notFound.css";
interface Props {
  message: string;
}
const NotFound = ({ message }: Props) => {
  return (
    <div className="container-not-found">
      <div className="container-sadness">
        <img src={sadness} alt="sadness" className="sadness" />
      </div>
      <div className="container-text">
        <h1 className="title">#404</h1>
        <h2>{message}</h2>
      </div>
    </div>
  );
};
export default NotFound;
