import { notFoundMessage } from "./messages/notFound";
import NotFoundError from "./NotFoundError";

const map = {
  [notFoundMessage]: NotFoundError,
};
export default map;
