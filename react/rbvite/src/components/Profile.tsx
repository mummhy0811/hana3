import { useSession } from "../contexts/session-context";

export const Profile = () => {
  const { session, logout } = useSession();
  return (
    <>
      <h3>이름: {session.loginUser?.name}</h3>
      <button onClick={logout}>Sign-out</button>
    </>
  );
};
