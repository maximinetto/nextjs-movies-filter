import { unexpectedMessage } from "./messages/unexpected";

export default class UnexpectedError extends Error {
  constructor(message?: string) {
    super(message ?? unexpectedMessage);
  }
}
