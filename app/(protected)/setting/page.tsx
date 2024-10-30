import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const seasson = await auth();

  return (
    <div>
      {JSON.stringify(seasson)}

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">SignOut</button>
      </form>
    </div>
  );
};

export default SettingsPage;
