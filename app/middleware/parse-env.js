export default function({ store }) {
  if (!process.server) return; // Don't run on browser, resolve server-side.
  const env = process.env;
  return store.commit("setEnv", {
    hostname: env.HOSTNAME || "http://localhost:3000"
  });
}
