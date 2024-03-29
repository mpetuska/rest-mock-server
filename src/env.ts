/* eslint-disable no-unused-vars */
import load from "application.env";

declare global {
  namespace ApplicationEnv {
    interface Env {
      PORT: number;
      DISABLE_CORS: boolean;
    }
  }
}

export default load({
  failSilently: true,
  validator: {
    PORT: {
      converter(value) {
        return Number(value);
      },
    },
    DISABLE_CORS: {
      converter(value) {
        return value.toLowerCase() === "true";
      },
    },
  },
});
