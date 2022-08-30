export default function useSetting({ setToken }) {
  const logout = () => setToken(null);
  return { logout };
}
