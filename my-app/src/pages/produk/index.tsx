import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroSection from "@/components/produk/HeroSection";
import MainSection from "@/components/produk/MainSection";

const Produk = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLogin");
      setIsLogin(!!loggedIn);

      if (!loggedIn) {
        push("/auth/login");
      }
    };

    checkLoginStatus();
  }, []);

  if (!isLogin) return null;

  return (
    <>
      <HeroSection />
      <MainSection />
    </>
  );
};

export default Produk;
