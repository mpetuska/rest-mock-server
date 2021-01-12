/* eslint-disable no-unused-vars */
import load from "application.env";

declare global {
  namespace ApplicationEnv {
    interface Env {
      PORT: string;
    }
  }
}

export default load("application.env", { failSilently: true });
