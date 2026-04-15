import { useSession } from "next-auth/react";

const HalamanProfile = () => {
  const { data } = useSession();
  return (
    <div>
      <h1 className="text-2xl font-bold pl-4">Halaman Profile</h1><br />
      <h1 className="text-2xl font-bold pl-4">Selamat Datang {data?.user?.fullname}</h1><br />
    </div>
  )
}

export default HalamanProfile;