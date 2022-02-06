import { useSelector, shallowEqual } from "react-redux";

export function useShallowEqualSelector<type>(selector: any): type {
  return useSelector(selector, shallowEqual);
}
