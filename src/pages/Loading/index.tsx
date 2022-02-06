import imgLoading from "../../util/image/claquete_animado.gif";
import "../../css/loading.css";
const Loading = () => {
  return (
    <div className="container-loading">
      <img alt="Loading" src={imgLoading} />
      <label>LOADING ...</label>
    </div>
  );
};
export default Loading;
